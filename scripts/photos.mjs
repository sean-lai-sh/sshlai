// Turns originals in /photos into board thumbnails, full-res prints,
// and lib/photos/manifest.json (EXIF + dimensions). Captions live in lib/photos/notes.ts.
// `npm run photos -- --force` rebuilds everything regardless of the cache.
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import exifr from 'exifr';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'photos');
const OUT = path.join(ROOT, 'public/photos');
const MANIFEST = path.join(ROOT, 'lib/photos/manifest.json');
// Lives with the gitignored originals it describes.
const CACHE = path.join(SRC, '.cache.json');
const FORCE = process.argv.includes('--force');

const SIZES = {
  thumb: { edge: 640, quality: 72 },
  full: { edge: 2400, quality: 84 },
};

// Fujifilm MakerNote tag 0x1401 (FilmMode) and 0x1003 (Saturation, which carries B&W sims).
const FUJI_FILM_MODE = {
  0x000: 'Provia', 0x100: 'Studio Portrait', 0x200: 'Velvia', 0x300: 'Studio Portrait Ex',
  0x400: 'Velvia', 0x500: 'Pro Neg. Std', 0x501: 'Pro Neg. Hi', 0x600: 'Classic Chrome',
  0x700: 'Eterna', 0x800: 'Classic Neg.', 0x900: 'Eterna Bleach Bypass', 0xa00: 'Nostalgic Neg.',
  0xb00: 'Reala Ace',
};
const FUJI_MONO = {
  0x300: 'Monochrome', 0x301: 'Monochrome + R', 0x302: 'Monochrome + Ye', 0x303: 'Monochrome + G',
  0x310: 'Sepia', 0x500: 'Acros', 0x501: 'Acros + R', 0x502: 'Acros + Ye', 0x503: 'Acros + G',
};

function fujiFilmSimulation(makerNote) {
  if (!makerNote) return undefined;
  const b = Buffer.from(makerNote);
  if (b.subarray(0, 8).toString('latin1') !== 'FUJIFILM') return undefined;
  const ifd = b.readUInt32LE(8);
  const tags = new Map();
  for (let i = 0; i < b.readUInt16LE(ifd); i++) {
    const at = ifd + 2 + i * 12;
    tags.set(b.readUInt16LE(at), b.readUInt16LE(at + 8));
  }
  return FUJI_MONO[tags.get(0x1003)] ?? FUJI_FILM_MODE[tags.get(0x1401)];
}

const titleCase = (s) => s.charAt(0) + s.slice(1).toLowerCase();

function formatShutter(seconds) {
  if (seconds >= 1) return `${seconds}s`;
  return `1/${Math.round(1 / seconds)}`;
}

async function readExif(file) {
  const e = await exifr.parse(file, { makerNote: true, exif: true, tiff: true });
  if (!e) return {};
  const make = e.Make ? titleCase(e.Make.trim()) : undefined;
  return {
    camera: [make, e.Model?.trim()].filter(Boolean).join(' ') || undefined,
    lens: e.LensModel?.trim() || undefined,
    focalLength: e.FocalLength,
    aperture: e.FNumber,
    shutter: e.ExposureTime ? formatShutter(e.ExposureTime) : undefined,
    iso: e.ISO,
    film: make === 'Fujifilm' ? fujiFilmSimulation(e.makerNote) : undefined,
    // EXIF stores wall-clock time without a zone; exifr parses it as UTC, so keep the UTC fields.
    takenAt: e.DateTimeOriginal?.toISOString().slice(0, 16),
  };
}

const sha = (data) => createHash('sha256').update(data).digest('hex').slice(0, 16);

// A photo is reused only when both its original and the pipeline that rendered it are unchanged.
// The pipeline is this script plus the image libraries, so editing sizes, quality or processing
// code, or upgrading sharp, rebuilds everything.
const PIPELINE = sha(
  JSON.stringify([await fs.readFile(fileURLToPath(import.meta.url)), sharp.versions]),
);

const exists = (file) => fs.access(file).then(() => true, () => false);
const readJson = (file, fallback) => fs.readFile(file, 'utf8').then(JSON.parse).catch(() => fallback);

const previous = new Map((await readJson(MANIFEST, [])).map((p) => [p.id, p]));
const cache = await readJson(CACHE, {});
const nextCache = {};

function photoId(name) {
  return path.parse(name).name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Checked before anything is written: two originals that normalize to the same id would
// overwrite each other's output files.
function assignIds(names) {
  const byId = new Map();
  const problems = [];
  for (const name of names) {
    const id = photoId(name);
    if (!id) problems.push(`  "${name}" has no letters or digits to make an id from`);
    else byId.set(id, [...(byId.get(id) ?? []), name]);
  }
  for (const [id, group] of byId) {
    if (group.length > 1) problems.push(`  ${group.join(', ')} all become "${id}"`);
  }
  if (problems.length) {
    console.error(`photos: rename these originals, nothing was written:\n${problems.join('\n')}`);
    process.exit(1);
  }
  return [...byId].map(([id, [name]]) => ({ id, name }));
}

async function renderBlur(thumb) {
  const buf = await sharp(thumb).resize(16, 16, { fit: 'inside' }).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

async function processPhoto({ id, name }) {
  const file = path.join(SRC, name);
  const source = sha(await fs.readFile(file));
  const outputs = Object.keys(SIZES).map((kind) => path.join(OUT, kind, `${id}.webp`));
  const prev = previous.get(id);
  const fresh =
    !FORCE &&
    prev !== undefined &&
    cache[id]?.source === source &&
    cache[id]?.pipeline === PIPELINE &&
    (await Promise.all(outputs.map(exists))).every(Boolean);
  nextCache[id] = { source, pipeline: PIPELINE };

  if (!fresh) {
    const upright = await sharp(file).rotate().toBuffer();
    for (const [kind, { edge, quality }] of Object.entries(SIZES)) {
      await sharp(upright)
        .resize(edge, edge, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toFile(path.join(OUT, kind, `${id}.webp`));
    }
  }

  const { width, height } = await sharp(path.join(OUT, 'full', `${id}.webp`)).metadata();

  return {
    id,
    thumb: `/photos/thumb/${id}.webp`,
    full: `/photos/full/${id}.webp`,
    blur: fresh ? prev.blur : await renderBlur(path.join(OUT, 'thumb', `${id}.webp`)),
    width,
    height,
    exif: await readExif(file),
    fresh,
  };
}

const names = (await fs.readdir(SRC)).filter((n) => /\.(jpe?g|png|webp|tiff?|heic)$/i.test(n));
const entries = assignIds(names);
await Promise.all(Object.keys(SIZES).map((k) => fs.mkdir(path.join(OUT, k), { recursive: true })));

const results = await Promise.all(entries.map(processPhoto));
const rebuilt = results.filter((p) => !p.fresh).map((p) => p.id);
const photos = results.map(({ fresh: _, ...p }) => p);

const keep = new Set(photos.map((p) => `${p.id}.webp`));
for (const kind of Object.keys(SIZES)) {
  for (const file of await fs.readdir(path.join(OUT, kind))) {
    if (!keep.has(file)) await fs.rm(path.join(OUT, kind, file));
  }
}
photos.sort((a, b) => (a.exif.takenAt ?? '').localeCompare(b.exif.takenAt ?? ''));

await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
await fs.writeFile(MANIFEST, JSON.stringify(photos, null, 2) + '\n');
await fs.writeFile(CACHE, JSON.stringify(nextCache, null, 2) + '\n');
console.log(`photos: ${photos.length} total, rebuilt ${rebuilt.length ? rebuilt.join(', ') : 'none'}`);
