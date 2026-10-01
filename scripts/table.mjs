// Generates the /photo table: a repeating tile of aged oak planks, nailed down at the butt joints.
// Seeded, so re-running produces the same table. Tweak and re-run with `npm run table`.
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public/textures/table.svg');
const H = 1800;
const PLANK_WIDTHS = [236, 198, 262, 214, 248, 190];
// Dark oak, each board pulled from a different part of the tree.
const TONES = ['#5e3c22', '#4a2e1a', '#6e4a2b', '#523520', '#664222', '#45301f'];

let seed = 1421;
const rand = () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const between = (lo, hi) => lo + rand() * (hi - lo);
const r1 = (n) => Math.round(n * 10) / 10;

const W = PLANK_WIDTHS.reduce((a, b) => a + b, 0);

function grainFilter(id, s) {
  // Long fibers (high x / near-zero y frequency), wavered sideways by a slow noise so they flow
  // instead of running ruler-straight, then pinched into thin dark lines.
  return `
  <filter id="${id}" filterUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.006 0.0016" numOctaves="2" seed="${s + 40}" stitchTiles="stitch" result="warp"/>
    <feColorMatrix in="warp" values="1 0 0 0 0  0 0 0 0 0.5  0 0 0 0 0  0 0 0 0 1" result="warpX"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.11 0.0026" numOctaves="4" seed="${s}" stitchTiles="stitch" result="fiber"/>
    <feDisplacementMap in="fiber" in2="warpX" scale="70" xChannelSelector="R" yChannelSelector="G" result="flow"/>
    <feComponentTransfer in="flow" result="lines">
      <feFuncR type="table" tableValues="0 0 0 0.15 0.75 0.2 0 0"/>
    </feComponentTransfer>
    <feColorMatrix in="lines" values="0 0 0 0 0.1  0 0 0 0 0.05  0 0 0 0 0.02  0.7 0 0 0 0" result="dark"/>
    <feComponentTransfer in="flow" result="bands">
      <feFuncR type="table" tableValues="0.7 0.35 0 0 0 0 0.2 0.5"/>
    </feComponentTransfer>
    <feColorMatrix in="bands" values="0 0 0 0 0.86  0 0 0 0 0.62  0 0 0 0 0.38  0.14 0 0 0 0" result="light"/>
    <feMerge><feMergeNode in="light"/><feMergeNode in="dark"/></feMerge>
  </filter>`;
}

const defs = [
  grainFilter('grain-a', 3),
  grainFilter('grain-b', 11),
  grainFilter('grain-c', 23),
  // Fine pores and sheen variation over the whole tile.
  `<filter id="pores" filterUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.7 0.02" numOctaves="2" seed="5" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 0.08  0 0 0 0 0.045  0 0 0 0 0.02  -2.2 0 0 0 1.05"/>
  </filter>`,
  `<filter id="soak" x="-50%" y="-50%" width="200%" height="200%"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2"/><feDisplacementMap in="SourceGraphic" scale="40"/><feGaussianBlur stdDeviation="10"/></filter>`,
  `<filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>`,
  // Edges worn darker where hands and grime collect, with a lighter bevel catching the light.
  `<linearGradient id="bevel">
    <stop offset="0" stop-color="#1a0e06" stop-opacity="0.55"/>
    <stop offset="0.025" stop-color="#ffe2b8" stop-opacity="0.1"/>
    <stop offset="0.09" stop-color="#1a0e06" stop-opacity="0"/>
    <stop offset="0.88" stop-color="#1a0e06" stop-opacity="0"/>
    <stop offset="1" stop-color="#1a0e06" stop-opacity="0.5"/>
  </linearGradient>`,
  `<linearGradient id="endgrain" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1a0e06" stop-opacity="0"/>
    <stop offset="1" stop-color="#1a0e06" stop-opacity="0.35"/>
  </linearGradient>`,
  `<radialGradient id="knot">
    <stop offset="0" stop-color="#140904" stop-opacity="0.95"/>
    <stop offset="0.45" stop-color="#2a160a" stop-opacity="0.8"/>
    <stop offset="1" stop-color="#2a160a" stop-opacity="0"/>
  </radialGradient>`,
  `<radialGradient id="rust">
    <stop offset="0.3" stop-color="#7a3410" stop-opacity="0.5"/>
    <stop offset="1" stop-color="#7a3410" stop-opacity="0"/>
  </radialGradient>`,
  `<linearGradient id="iron" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#9a8f84"/>
    <stop offset="0.4" stop-color="#3b342f"/>
    <stop offset="1" stop-color="#1b1714"/>
  </linearGradient>`,
];

// A hand-cut nail: square head, slightly askew, a rust bloom where water got into the hole.
function nail(x, y) {
  const a = r1(between(-18, 18));
  return `<g transform="translate(${r1(x)} ${r1(y)}) rotate(${a}) scale(1.25)">
    <circle r="13" fill="url(#rust)"/>
    <rect x="-6" y="-5" width="12" height="11" rx="1.5" fill="#0e0805" opacity="0.6" transform="translate(1 1.5)"/>
    <rect x="-5.5" y="-5.5" width="11" height="11" rx="1.6" fill="url(#iron)"/>
    <rect x="-3.5" y="-3.5" width="7" height="7" rx="1" fill="none" stroke="#a89c8f" stroke-opacity="0.25" stroke-width="0.8"/>
  </g>`;
}

function knot(cx, cy) {
  const rx = between(9, 18);
  const ry = rx * between(1.8, 3);
  const rings = Array.from({ length: 5 }, (_, i) => {
    const k = 1 + i * 0.55;
    return `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx * k)}" ry="${r1(ry * k * 1.25)}" fill="none" stroke="#22120a" stroke-opacity="${r1(0.45 - i * 0.07)}" stroke-width="${r1(1.6 - i * 0.2)}"/>`;
  }).join('');
  return `<g filter="url(#wobble)">
    <ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx * 2.4)}" ry="${r1(ry * 2.2)}" fill="#2a160a" opacity="0.18"/>
    ${rings}
    <ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="url(#knot)"/>
    <ellipse cx="${r1(cx + rx * 0.2)}" cy="${r1(cy - ry * 0.1)}" rx="${r1(rx * 0.25)}" ry="${r1(ry * 0.3)}" fill="#0a0402" opacity="0.7"/>
  </g>`;
}

// Decades of use: dings, worm holes, and the odd spill that soaked in.
function wear(x0, w) {
  const dings = Array.from({ length: Math.floor(between(18, 40)) }, () => {
    const r = between(0.6, 1.8);
    return `<ellipse cx="${r1(between(x0 + 6, x0 + w - 6))}" cy="${r1(between(0, H))}" rx="${r1(r)}" ry="${r1(r * between(0.6, 1.6))}" fill="#120904" opacity="${r1(between(0.35, 0.7))}"/>`;
  });
  const stains = Array.from({ length: Math.floor(between(0, 2.6)) }, () =>
    `<ellipse cx="${r1(between(x0, x0 + w))}" cy="${r1(between(100, H - 100))}" rx="${r1(between(40, 90))}" ry="${r1(between(30, 120))}" fill="#1a0c04" opacity="${r1(between(0.25, 0.45))}" filter="url(#soak)"/>`,
  );
  return [...stains, ...dings].join('');
}

function scratches(x0, w) {
  return Array.from({ length: Math.floor(between(3, 7)) }, () => {
    const x = between(x0 + 10, x0 + w - 10);
    const y = between(0, H - 120);
    const len = between(30, 140);
    const dx = between(-40, 40);
    return `<path d="M${r1(x)} ${r1(y)} q${r1(dx * 0.4)} ${r1(len / 2)} ${r1(dx)} ${r1(len)}" fill="none" stroke="#f3d6ad" stroke-opacity="${r1(between(0.05, 0.14))}" stroke-width="${r1(between(0.6, 1.3))}" stroke-linecap="round"/>`;
  }).join('');
}

const planks = [];
let x = 0;
PLANK_WIDTHS.forEach((w, i) => {
  const tone = TONES[i % TONES.length];
  const grain = ['grain-a', 'grain-b', 'grain-c'][i % 3];
  const parts = [];

  parts.push(`<rect x="${x}" y="0" width="${w}" height="${H}" fill="${tone}"/>`);
  parts.push(`<rect x="${x}" y="0" width="${w}" height="${H}" filter="url(#${grain})"/>`);

  for (let k = 0; k < Math.floor(between(1, 3.4)); k++) {
    parts.push(knot(between(x + 30, x + w - 30), between(80, H - 80)));
  }
  parts.push(wear(x, w));
  parts.push(scratches(x, w));

  // One butt joint per board, staggered so no two neighbours line up.
  const jy = r1(H * ((0.18 + i * 0.37) % 1) * 0.8 + H * 0.1);
  parts.push(`<rect x="${x}" y="${jy - 26}" width="${w}" height="26" fill="url(#endgrain)"/>`);
  parts.push(`<rect x="${x}" y="${jy - 1}" width="${w}" height="3" fill="#120904" opacity="0.85"/>`);
  parts.push(`<rect x="${x}" y="${jy + 2}" width="${w}" height="1" fill="#ffe2b8" opacity="0.08"/>`);
  for (const nx of [x + w * 0.22, x + w * 0.78]) {
    parts.push(nail(nx + between(-4, 4), jy - between(16, 20)));
    parts.push(nail(nx + between(-4, 4), jy + between(17, 21)));
  }

  parts.push(`<rect x="${x}" y="0" width="${w}" height="${H}" fill="url(#bevel)"/>`);
  // The gap between boards.
  parts.push(`<rect x="${x}" y="0" width="4" height="${H}" fill="#0a0402"/>
  <rect x="${x + 4}" y="0" width="1" height="${H}" fill="#ffe2b8" opacity="0.12"/>`);

  // Turbulence fills its whole filter region, so each board has to be clipped to itself.
  defs.push(`<clipPath id="board-${i}"><rect x="${x}" y="0" width="${w}" height="${H}"/></clipPath>`);
  planks.push(`<g clip-path="url(#board-${i})">\n  ${parts.join('\n  ')}\n</g>`);
  x += w;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>${defs.join('\n')}</defs>
${planks.join('\n')}
<rect width="${W}" height="${H}" filter="url(#pores)"/>
</svg>
`;

await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, svg);
console.log(`wrote ${path.relative(process.cwd(), OUT)} (${W}x${H}, ${(svg.length / 1024).toFixed(1)} KB)`);
