import manifest from './manifest.json';
import { notes, type PhotoNote } from './notes';

export type PhotoExif = {
  camera?: string;
  lens?: string;
  focalLength?: number;
  aperture?: number;
  shutter?: string;
  iso?: number;
  film?: string;
  takenAt?: string;
};

export type Photo = {
  id: string;
  thumb: string;
  full: string;
  blur: string;
  width: number;
  height: number;
  exif: PhotoExif;
  note: PhotoNote;
};

const order = Object.keys(notes);
const rank = (id: string) => (order.includes(id) ? order.indexOf(id) : order.length);

export const photos: Photo[] = (manifest as Omit<Photo, 'note'>[])
  .map((p) => {
    const note = notes[p.id] ?? {};
    return { ...p, exif: { ...p.exif, ...note.exif }, note };
  })
  .filter((p) => !p.note.hidden)
  .sort((a, b) => rank(a.id) - rank(b.id));

export const isPortrait = (p: Photo) => p.height > p.width;

export function settings({ focalLength, aperture, shutter, iso }: PhotoExif): string[] {
  return [
    focalLength && `${focalLength}mm`,
    aperture && `f/${aperture}`,
    shutter && `${shutter}s`,
    iso && `ISO ${iso}`,
  ].filter((s): s is string => Boolean(s));
}

// The orange date imprint film cameras burn into the corner: '26 9 12
export function dateStamp(takenAt?: string) {
  if (!takenAt) return undefined;
  const [y, m, d] = takenAt.slice(0, 10).split('-');
  return `'${y.slice(2)} ${Number(m)} ${Number(d)}`;
}

// Stable per-photo scatter so prints look tossed on the table but never reshuffle.
export function scatter(id: string) {
  let h = 2166136261;
  for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const rand = (salt: number) => (((h ^ Math.imul(salt, 2654435761)) >>> 0) % 10000) / 10000;
  return {
    rotate: (rand(1) - 0.5) * 12,
    x: (rand(2) - 0.5) * 48,
    y: (rand(3) - 0.5) * 70,
  };
}
