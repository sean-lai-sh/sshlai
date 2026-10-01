// Full-res prints load behind the board so opening one is instant. Thumbs go first: the background
// queue waits for page load and idle, then fetches prints that have been on screen, a couple at a
// time. Hovering, focusing or touching a print jumps it to the front at high priority, and the
// queue holds off until that print lands so it isn't sharing the connection. Prints are
// decoded as they arrive so the zoom doesn't stall on a large decode.
import type { Photo } from '@/lib/photos';

type Status = 'queued' | 'loading' | 'loaded';

const BACKGROUND_SLOTS = 2;
const status = new Map<string, Status>();
const queue: string[] = [];
let active = 0;
let urgent = 0;
let started = false;

function fetchPrint(src: string, priority: 'high' | 'low') {
  status.set(src, 'loading');
  const img = new Image();
  img.decoding = 'async';
  img.fetchPriority = priority;
  img.src = src;
  return img.decode().then(
    () => void status.set(src, 'loaded'),
    () => void status.delete(src),
  );
}

function pump() {
  while (started && urgent === 0 && active < BACKGROUND_SLOTS && queue.length) {
    const src = queue.shift()!;
    if (status.get(src) !== 'queued') continue;
    active++;
    fetchPrint(src, 'low').finally(() => {
      active--;
      pump();
    });
  }
}

// Data saver or a 2G link: only load what someone asks for.
function backgroundAllowed() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  return !connection?.saveData && !/2g/.test(connection?.effectiveType ?? '');
}

if (typeof window !== 'undefined' && backgroundAllowed()) {
  const start = () => {
    started = true;
    pump();
  };
  // Older Safari has no requestIdleCallback.
  const whenIdle = () =>
    'requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 500);
  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });
}

// Only XL screens fetch the 2400px print. Laptops top out near 1728px wide, so they stay on 1200px.
const XL_SCREEN = '(min-width: 1800px)';

export function printSrc(photo: Pick<Photo, 'large' | 'full'>) {
  return window.matchMedia(XL_SCREEN).matches ? photo.full : photo.large;
}

// A print came on screen: fetch it in the background, in the order prints were seen.
export function queuePrint(src: string) {
  if (status.has(src)) return;
  status.set(src, 'queued');
  queue.push(src);
  pump();
}

// Someone is reaching for this print: fetch it now, ahead of the queue.
export function needPrint(src: string) {
  if (status.get(src) === 'loading' || status.get(src) === 'loaded') return;
  urgent++;
  fetchPrint(src, 'high').finally(() => {
    urgent--;
    pump();
  });
}

export function markPrintLoaded(src: string) {
  status.set(src, 'loaded');
}

export function isPrintLoaded(src: string) {
  return status.get(src) === 'loaded';
}
