import { cellCenter, type Scene } from "./asciicanvas";

const RAMP = [".", ",", ":", ";", "+", "*", "#"];
// Octaves layered from the original 4.5 scale upward; each drifts at its own speed so shapes keep breaking apart.
const OCTAVES = [
    { scale: 4, weight: 1, speed: 0.12, offset: 0 },
    { scale: 8.5, weight: 0.35, speed: 0.22, offset: 17 },
    { scale: 17, weight: 0.12, speed: 0.4, offset: 31 },
];
const TOTAL_WEIGHT = OCTAVES.reduce((sum, o) => sum + o.weight, 0);

export const fieldScene: Scene = (ctx, grid, t, perlin) => {
    const { cols, rows } = grid;
    const layers = OCTAVES.map((o) => perlin.field(cols, rows, t * o.speed + o.offset, o.scale));
    ctx.fillStyle = "#ffffff";
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            const k = j * cols + i;
            let n = 0;
            for (let o = 0; o < OCTAVES.length; o++) n += OCTAVES[o].weight * (layers[o][k] - 0.5);
            // Summed Perlin clusters near the middle; stretching it keeps the field from reading as uniform grain.
            const v = Math.min(1, Math.max(0, (n / TOTAL_WEIGHT) * 2.2 + 0.45));
            const density = v * v * (3 - 2 * v);
            if (density < 0.15) continue;
            ctx.globalAlpha = 0.06 + 0.8 * density * density;
            ctx.fillText(RAMP[Math.min(RAMP.length - 1, Math.floor(density * RAMP.length))], ...cellCenter(grid, i, j));
        }
    }
    ctx.globalAlpha = 1;
};
