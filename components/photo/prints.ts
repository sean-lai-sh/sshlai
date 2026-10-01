// Full-res prints are fetched on intent (hover, focus, touch) so they're usually ready by the
// time the print view opens, instead of showing the upscaled thumb while they download.
const requested = new Set<string>();
const loaded = new Set<string>();

export function preloadPrint(src: string) {
  if (requested.has(src)) return;
  requested.add(src);
  const img = new Image();
  img.decoding = 'async';
  img.onload = () => loaded.add(src);
  img.src = src;
}

export function markPrintLoaded(src: string) {
  loaded.add(src);
}

export function isPrintLoaded(src: string) {
  return loaded.has(src);
}
