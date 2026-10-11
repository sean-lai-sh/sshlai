import { cellCenter, type Scene } from "./asciicanvas";

const RAMP = [".", ",", ":", ";", "+", "*", "#"];
const SCALE = 2.5;
const SPEED = 0.1;

export const fieldScene: Scene = (ctx, grid, t, perlin) => {
    const { cols, rows, cw, ch } = grid;
    const size = Math.max(cols * cw, rows * ch);
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const n = perlin.noise(((i * cw) / size) * SCALE, ((j * ch) / size) * SCALE, t * SPEED);
            // Raw Perlin output clusters near zero; stretching it keeps the field from reading as uniform grain.
            const v = Math.min(1, Math.max(0, n * 1.25 + 0.45));
            const density = v * v * (3 - 2 * v);
            if (density < 0.15) continue;
            ctx.globalAlpha = 0.06 + 0.8 * density * density;
            ctx.fillText(RAMP[Math.min(RAMP.length - 1, Math.floor(density * RAMP.length))], ...cellCenter(grid, i, j));
        }
    }
    ctx.globalAlpha = 1;
};
