// Hand-written side of the board, keyed by photo id (lowercased filename).
// Everything technical comes from EXIF via `npm run photos`; `film` here overrides
// what the camera recorded, e.g. for film bodies with no metadata.
export type PhotoNote = {
  caption?: string;
  place?: string;
  film?: string;
  hidden?: boolean;
};

export const notes: Record<string, PhotoNote> = {
  dscf0511: { caption: 'lights out before the walk-on', place: 'Arthur Ashe, Queens' },
  dscf0515: { caption: 'smoke + blue, the whole stadium humming', place: 'Arthur Ashe, Queens' },
  dscf0527: { caption: 'nosebleeds, best seats in the house', place: 'Arthur Ashe, Queens' },
  dscf0536: { caption: 'the court glows like a phone screen', place: 'Arthur Ashe, Queens' },
  dscf0544: { caption: 'twenty-three thousand people holding their breath', place: 'Arthur Ashe, Queens' },
  dscf0549: { caption: 'rally', place: 'Arthur Ashe, Queens' },
  dscf0550: { caption: 'rally, still going', place: 'Arthur Ashe, Queens' },
  dscf0551: { caption: 'ok this rally is insane', place: 'Arthur Ashe, Queens' },
  dscf0553: { caption: 'break point', place: 'Arthur Ashe, Queens' },
  dscf0714: { caption: 'umbrellas at the plaza, golden hour', place: 'Rockefeller Center' },
};
