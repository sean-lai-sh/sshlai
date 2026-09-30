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

export const photos: Photo[] = (manifest as Omit<Photo, 'note'>[])
  .map((p) => ({ ...p, note: notes[p.id] ?? {} }))
  .filter((p) => !p.note.hidden);

export function settingsLine({ focalLength, aperture, shutter, iso }: PhotoExif) {
  return [
    focalLength && `${focalLength}mm`,
    aperture && `f/${aperture}`,
    shutter && `${shutter}s`,
    iso && `ISO ${iso}`,
  ]
    .filter(Boolean)
    .join(' · ');
}

// The orange date imprint film cameras burn into the corner: '26 9 12
export function dateStamp(takenAt?: string) {
  if (!takenAt) return undefined;
  const [y, m, d] = takenAt.slice(0, 10).split('-');
  return `'${y.slice(2)} ${Number(m)} ${Number(d)}`;
}

// Stable per-photo scatter so the board looks hand-pinned but never reshuffles.
export function scatter(id: string) {
  let h = 2166136261;
  for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const rand = (salt: number) => (((h ^ Math.imul(salt, 2654435761)) >>> 0) % 10000) / 10000;
  return {
    rotate: (rand(1) - 0.5) * 12,
    x: (rand(2) - 0.5) * 48,
    y: (rand(3) - 0.5) * 70,
    fastener: (['pin', 'tape', 'pin', 'pin-blue', 'tape'] as const)[Math.floor(rand(4) * 5)],
  };
}
