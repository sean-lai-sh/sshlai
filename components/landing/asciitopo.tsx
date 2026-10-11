import { cellCenter, type Scene } from "./asciicanvas";

const LEVELS = 8;
const INDEX_EVERY = 3;
const SCALE = 2.4;

// Contour lines run perpendicular to the elevation gradient; pick the glyph closest to that direction.
function lineGlyph(gx: number, gy: number): string {
    const a = (Math.atan2(gx, -gy) + Math.PI) % Math.PI;
    const eighth = Math.PI / 8;
    if (a < eighth || a > 7 * eighth) return "-";
    if (a < 3 * eighth) return "\\";
    if (a < 5 * eighth) return "|";
    return "/";
}

export const topoScene: Scene = (ctx, grid, t, perlin) => {
    const { cols, rows, cw, ch } = grid;
    const size = Math.max(cols * cw, rows * ch);
    const W = cols + 2;
    const heights = new Float32Array(W * (rows + 2));
    for (let j = -1; j <= rows; j++) {
        for (let i = -1; i <= cols; i++) {
            const u = ((i * cw) / size) * SCALE + t * 0.02;
            const v = ((j * ch) / size) * SCALE;
            const h = perlin.noise(u, v, t * 0.05) + 0.35 * perlin.noise(u * 2.3, v * 2.3, t * 0.08 + 7);
            heights[(j + 1) * W + (i + 1)] = h;
        }
    }
    const at = (i: number, j: number) => heights[(j + 1) * W + (i + 1)];
    const band = (h: number) => Math.floor(((h + 1) / 2) * LEVELS);

    ctx.fillStyle = "#ffffff";
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            const b = band(at(i, j));
            const right = band(at(i + 1, j));
            const down = band(at(i, j + 1));
            if (b === right && b === down) continue;
            const crossed = Math.max(b, right, down);
            const gx = (at(i + 1, j) - at(i - 1, j)) / cw;
            const gy = (at(i, j + 1) - at(i, j - 1)) / ch;
            ctx.globalAlpha = crossed % INDEX_EVERY === 0 ? 0.95 : 0.4;
            ctx.fillText(lineGlyph(gx, gy), ...cellCenter(grid, i, j));
        }
    }
    ctx.globalAlpha = 1;
};
