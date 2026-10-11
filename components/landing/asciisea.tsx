import { cellCenter, type Scene } from "./asciicanvas";

function starAt(i: number, j: number): number {
    const h = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
    return h - Math.floor(h);
}

export const seaScene: Scene = (ctx, grid, t, perlin) => {
    const { cols, rows } = grid;
    const seaLevel = rows * 0.55;
    // Sampling x + t scrolls the swell leftward, so the view reads as moving across open water.
    const surface = (x: number) =>
        seaLevel + 3.2 * perlin.noise(x * 0.07 + t * 0.35, 0.5, t * 0.08) + 1.1 * perlin.noise(x * 0.21 + t * 0.9, 3.3, t * 0.25);

    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < cols; i++) {
        const s = surface(i);
        const slope = surface(i + 1) - surface(i - 1);
        // Extend the crest halfway toward each neighbour so steep swells stay one connected line.
        const crestTop = Math.floor(Math.min(s, (s + surface(i - 1)) / 2, (s + surface(i + 1)) / 2));
        const crestBottom = Math.floor(Math.max(s, (s + surface(i - 1)) / 2, (s + surface(i + 1)) / 2));
        for (let j = 0; j < rows; j++) {
            const depth = j < crestTop ? -1 : j <= crestBottom ? 0 : j - s;
            let char: string;
            let alpha: number;
            if (depth < 0) {
                if (j > seaLevel * 0.75) continue;
                const h = starAt(i, j);
                if (h < 0.982) continue;
                char = h > 0.996 ? "*" : ".";
                alpha = 0.2 + 0.3 * (0.5 + 0.5 * Math.sin(t * 1.5 + h * 90));
            } else if (j <= crestBottom) {
                char = slope < -0.7 ? "/" : slope > 0.7 ? "\\" : "~";
                alpha = 0.95;
            } else {
                const n = perlin.noise(i * 0.16 + t * 0.6, j * 0.42, t * 0.2);
                char = n > 0.28 ? "~" : n > 0.1 ? "-" : n > -0.05 ? "." : " ";
                if (char === " ") continue;
                alpha = Math.max(0.1, 0.8 - (depth / (rows - seaLevel)) * 0.9);
            }
            ctx.globalAlpha = alpha;
            ctx.fillText(char, ...cellCenter(grid, i, j));
        }
    }
    ctx.globalAlpha = 1;
};
