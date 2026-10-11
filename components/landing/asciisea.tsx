"use client";

import * as React from "react";

const BOAT = [
    "       |\\",
    "       | \\",
    "       |  \\",
    "      /|   \\",
    "     / |    \\",
    "    /  |     \\",
    "   /___|______\\",
    "_______|________",
    "\\              /",
    " \\____________/",
];
const BOAT_WIDTH = Math.max(...BOAT.map((row) => row.length));
// Each boat row hides the water between its first and last glyph, so the sails and hull read as solid.
const BOAT_SPANS = BOAT.map((row) => [row.search(/\S/), row.trimEnd().length] as const);

const TARGET_COLS = 56;
const LINE_HEIGHT = 1.15;

type Grid = { cols: number; rows: number; cw: number; ch: number; ox: number; oy: number };

function waveSurface(x: number, t: number, seaLevel: number): number {
    return (
        seaLevel +
        1.3 * Math.sin(0.22 * x + 1.4 * t) +
        0.6 * Math.sin(0.51 * x + 0.9 * t + 1.7) +
        0.25 * Math.sin(1.13 * x + 2.6 * t)
    );
}

function starAt(i: number, j: number): number {
    const h = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
    return h - Math.floor(h);
}

function drawScene(ctx: CanvasRenderingContext2D, grid: Grid, t: number) {
    const { cols, rows, cw, ch, ox, oy } = grid;
    const seaLevel = rows * 0.64;
    const surface = (x: number) => waveSurface(x, t, seaLevel);

    const boatLeft = Math.round(cols * 0.42 - BOAT_WIDTH / 2 + Math.sin(t * 0.25) * 1.5);
    const boatMid = boatLeft + BOAT_WIDTH / 2;
    const boatTop = surface(boatMid) - (BOAT.length - 1.5);
    const tilt = Math.atan(((surface(boatLeft + BOAT_WIDTH) - surface(boatLeft)) * ch) / (BOAT_WIDTH * cw)) * 0.7;

    const hiddenByBoat = (i: number, j: number) => {
        const r = Math.floor(j + 0.5 - boatTop);
        if (r < 0 || r >= BOAT.length) return false;
        const [start, end] = BOAT_SPANS[r];
        return i >= boatLeft + start && i < boatLeft + end;
    };

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#ffffff";

    for (let i = 0; i < cols; i++) {
        const s = surface(i);
        const slope = surface(i + 1) - surface(i - 1);
        for (let j = 0; j < rows; j++) {
            if (hiddenByBoat(i, j)) continue;
            const depth = j - s;
            let char = " ";
            let alpha = 1;
            if (depth < 0) {
                if (j > seaLevel * 0.7) continue;
                const h = starAt(i, j);
                if (h < 0.982) continue;
                char = h > 0.996 ? "*" : ".";
                alpha = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.5 + h * 90));
            } else if (depth < 1) {
                char = slope < -0.6 ? "/" : slope > 0.6 ? "\\" : "~";
            } else {
                const shimmer = 0.5 + 0.25 * Math.sin(i * 0.9 + j * 1.7 + t * 1.8 + 3 * Math.sin(j * 0.31 + t * 0.4)) + 0.25 * Math.sin(i * 0.37 - j * 0.83 + t * 1.1);
                char = shimmer > 0.82 ? "~" : shimmer > 0.6 ? "-" : shimmer > 0.42 ? "." : " ";
                alpha = Math.max(0.12, 0.85 - depth / (rows - seaLevel));
            }
            if (char === " ") continue;
            ctx.globalAlpha = alpha;
            ctx.fillText(char, ox + i * cw + cw / 2, oy + j * ch + ch / 2);
        }
    }

    ctx.globalAlpha = 1;
    ctx.save();
    ctx.translate(ox + boatMid * cw, oy + (boatTop + BOAT.length) * ch);
    ctx.rotate(tilt);
    BOAT.forEach((row, r) => {
        for (let c = 0; c < row.length; c++) {
            if (row[c] === " ") continue;
            ctx.fillText(row[c], (c - BOAT_WIDTH / 2) * cw + cw / 2, (r - BOAT.length) * ch + ch / 2);
        }
    });
    ctx.restore();
}

export const AsciiSea = ({ className = "" }: { className?: string }) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        let grid: Grid | null = null;
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const { width, height } = canvas.getBoundingClientRect();
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            const fontSize = width / (TARGET_COLS * 0.6);
            ctx.font = `${fontSize}px ui-monospace, Menlo, monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const cw = ctx.measureText("@").width;
            const ch = fontSize * LINE_HEIGHT;
            const cols = Math.floor(width / cw);
            const rows = Math.floor(height / ch);
            grid = { cols, rows, cw, ch, ox: (width - cols * cw) / 2, oy: (height - rows * ch) / 2 };
        };

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const start = performance.now();
        let rafId = 0;
        const frame = (now: number) => {
            if (grid) drawScene(ctx, grid, (now - start) / 1000);
            if (!reducedMotion) rafId = requestAnimationFrame(frame);
        };

        const observer = new ResizeObserver(() => {
            resize();
            if (reducedMotion) frame(start);
        });
        observer.observe(canvas);
        rafId = requestAnimationFrame(frame);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className={`overflow-hidden pointer-events-none select-none ${className}`} aria-label="ASCII sailboat on the sea">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};
