"use client";

import * as React from "react";
import { loadWasmPerlin } from "@/lib/wasm-loader";
import { PerlinNoise } from "./asciihero";

export type Noise = { noise(x: number, y: number, z: number): number };
export type Grid = { cols: number; rows: number; cw: number; ch: number; ox: number; oy: number };
export type Scene = (ctx: CanvasRenderingContext2D, grid: Grid, t: number, noise: Noise) => void;

const LINE_HEIGHT = 1.15;

export const cellCenter = (grid: Grid, i: number, j: number) =>
    [grid.ox + i * grid.cw + grid.cw / 2, grid.oy + j * grid.ch + grid.ch / 2] as const;

export const AsciiCanvas = ({ scene, targetCols = 56, className = "", label }: { scene: Scene; targetCols?: number; className?: string; label: string }) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        let noise: Noise = new PerlinNoise();
        loadWasmPerlin().then((wasm) => {
            if (wasm) noise = wasm;
        });

        let grid: Grid | null = null;
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const { width, height } = canvas.getBoundingClientRect();
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            const fontSize = width / (targetCols * 0.6);
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
            if (grid) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                scene(ctx, grid, (now - start) / 1000, noise);
            }
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
    }, [scene, targetCols]);

    return (
        <div className={`overflow-hidden pointer-events-none select-none ${className}`} aria-label={label}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};
