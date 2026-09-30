import type { PhotoExif } from './index';

// Hand-written side of the table, keyed by photo id (the filename, lowercased and slugged).
// Board order follows this object. Photos without an entry go at the end.
// Everything under `exif` overrides what the camera recorded.
export type PhotoNote = {
  caption?: string;
  // Fractions of the original frame, applied by `npm run photos` before resizing.
  crop?: { x: number; y: number; width: number; height: number };
  place?: string;
  exif?: Partial<PhotoExif>;
  hidden?: boolean;
};

export const notes: Record<string, PhotoNote> = {
  dscf1715: { caption: 'WSQ at night', place: 'Washington Square Park' },
  dscf0490: { caption: 'wisteria spilling over Bleecker', place: '157 Bleecker St' },
  dscf0454: { caption: 'afternoon sun across the dial' },
  dscf0702: { caption: 'out through the revolving door' },
  'iso12800-3': { caption: 'lights down at Ashe', place: 'Arthur Ashe, Queens' },
  dscf1421: {
    caption: 'two ways down the block',
    place: 'Greenwich Village',
    crop: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
  },
  dscf1428: { caption: 'crossing, under the pines' },
  dscf0714: { caption: 'umbrellas at the plaza, golden hour', place: 'Rockefeller Center' },
};
