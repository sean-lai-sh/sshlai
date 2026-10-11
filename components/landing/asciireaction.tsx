import { cellCenter, type Grid, type Noise, type Scene } from "./asciicanvas";

const RAMP = [".", ":", "-", "=", "+", "*", "#"];
// Gray-Scott "coral" regime.
const FEED = 0.0545;
const KILL = 0.062;
const DIFFUSE_A = 1.0;
const DIFFUSE_B = 0.5;
const STEPS_PER_FRAME = 12;
const SEED_EVERY = 6;

type State = { cols: number; rows: number; a: Float32Array; b: Float32Array; na: Float32Array; nb: Float32Array; wx: number; wy: number; lastSeed: number };

let state: State | null = null;

function seedBlob(s: State, ci: number, cj: number, radius: number) {
    const ry = radius * s.wy / s.wx;
    for (let j = Math.floor(cj - ry); j <= cj + ry; j++) {
        for (let i = Math.floor(ci - radius); i <= ci + radius; i++) {
            if (i < 0 || j < 0 || i >= s.cols || j >= s.rows) continue;
            if (((i - ci) / radius) ** 2 + ((j - cj) / ry) ** 2 > 1) continue;
            s.b[j * s.cols + i] = 1;
        }
    }
}

function init(grid: Grid, perlin: Noise, t: number): State {
    const { cols, rows, cw, ch } = grid;
    const n = cols * rows;
    // Cells are taller than wide, so vertical diffusion is scaled down to keep spots round on screen.
    const s: State = { cols, rows, a: new Float32Array(n).fill(1), b: new Float32Array(n), na: new Float32Array(n), nb: new Float32Array(n), wx: 0.2, wy: 0.2 * (cw / ch) ** 2, lastSeed: t };
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            if (perlin.noise(i * 0.12, j * 0.12 * (ch / cw), t + 11.3) > 0.5) s.b[j * cols + i] = 1;
        }
    }
    seedBlob(s, cols / 2, rows / 2, 3);
    return s;
}

function step(s: State) {
    const { cols, rows, a, b, na, nb, wx, wy } = s;
    const center = 2 * wx + 2 * wy;
    for (let j = 0; j < rows; j++) {
        const up = ((j - 1 + rows) % rows) * cols;
        const down = ((j + 1) % rows) * cols;
        const row = j * cols;
        for (let i = 0; i < cols; i++) {
            const left = (i - 1 + cols) % cols;
            const right = (i + 1) % cols;
            const k = row + i;
            const lapA = wx * (a[row + left] + a[row + right]) + wy * (a[up + i] + a[down + i]) - center * a[k];
            const lapB = wx * (b[row + left] + b[row + right]) + wy * (b[up + i] + b[down + i]) - center * b[k];
            const abb = a[k] * b[k] * b[k];
            na[k] = a[k] + DIFFUSE_A * lapA - abb + FEED * (1 - a[k]);
            nb[k] = b[k] + DIFFUSE_B * lapB + abb - (KILL + FEED) * b[k];
        }
    }
    s.a = na;
    s.na = a;
    s.b = nb;
    s.nb = b;
}

export const reactionScene: Scene = (ctx, grid, t, perlin) => {
    if (!state || state.cols !== grid.cols || state.rows !== grid.rows) state = init(grid, perlin, t);
    const s = state;
    for (let n = 0; n < STEPS_PER_FRAME; n++) step(s);
    // Fresh seeds keep the pattern growing instead of freezing once it fills the square.
    if (t - s.lastSeed > SEED_EVERY) {
        s.lastSeed = t;
        seedBlob(s, ((perlin.noise(t, 1.7, 0) + 1) / 2) * s.cols, ((perlin.noise(t, 5.3, 0) + 1) / 2) * s.rows, 2.5);
    }

    ctx.fillStyle = "#ffffff";
    for (let j = 0; j < s.rows; j++) {
        for (let i = 0; i < s.cols; i++) {
            const v = Math.min(1, s.b[j * s.cols + i] * 2.5);
            if (v < 0.12) continue;
            ctx.globalAlpha = 0.15 + 0.85 * v;
            ctx.fillText(RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))], ...cellCenter(grid, i, j));
        }
    }
    ctx.globalAlpha = 1;
};
