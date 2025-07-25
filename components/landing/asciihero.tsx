"use client";

import * as React from "react";


// --- Perlin Noise Implementation (self-contained) ---
class PerlinNoise {
    private p: number[] = [];
    constructor() {
        // Pre-shuffled permutation table
        const pTable = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,254,34,51,156,72,162,31,121,141,162,141,93,114,84,181,222,184,14,205,24,195,243,214,31,12,29,157,192,193,61,45,50,215,115,66,128,199,241,191,106,78,49,81,251,179,204,138,67,242,210,145,235,249,144,236,127,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255];
        this.p = new Array(512).fill(0).map((_, i) => pTable[i & 255]);
    }
    private fade(t: number): number { return t * t * t * (t * (t * 6 - 15) + 10); }
    private lerp(t: number, a: number, b: number): number { return a + t * (b - a); }
    private grad(hash: number, x: number, y: number, z: number): number {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    public noise(x: number, y: number, z: number): number {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);
        const A = this.p[X] + Y, AA = this.p[A] + Z, AB = this.p[A + 1] + Z;
        const B = this.p[X + 1] + Y, BA = this.p[B] + Z, BB = this.p[B + 1] + Z;
        return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA], x, y, z), this.grad(this.p[BA], x - 1, y, z)), this.lerp(u, this.grad(this.p[AB], x, y - 1, z), this.grad(this.p[BB], x - 1, y - 1, z))), this.lerp(v, this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1), this.grad(this.p[BA + 1], x - 1, y, z - 1)), this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1), this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))));
    }
}

// --- ASCII Renderer Class ---
interface AsciiRendererOptions {
    charRamp?: string[];
    fontFamily?: string;
    fontSize?: number;
    lowResFontSize?: number;
    noiseScale?: number;
    speed?: number;
    isLowRes?: boolean;
}

class AsciiRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private options: Required<AsciiRendererOptions>;
    private noiseGen: PerlinNoise;
    private charWidth = 0;
    private charHeight = 0;
    private cols = 0;
    private rows = 0;
    private lastRenderTime = 0;
    private accumulatedTime = 0;
    private frameInterval = 1000 / 60; // Target 60 FPS

    constructor(canvas: HTMLCanvasElement, options: AsciiRendererOptions) {
        if (!canvas) throw new Error("Canvas element not provided");
        this.canvas = canvas;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) throw new Error("Could not get 2D context");
        this.ctx = context;
        this.noiseGen = new PerlinNoise();
        this.options = {
            // Sparser, visually balanced ASCII chars: less noisy, more readable
            charRamp: [" ", ".", ",", ":", ";", "+", "*", "#", "@"].reverse(),
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            lowResFontSize: 20,
            noiseScale: 4.5,
            speed: 0.1,
            isLowRes: false,
            ...options
        };
    }

    private async measureCharSize(): Promise<void> {
        const currentFontSize = this.options.isLowRes ? this.options.lowResFontSize : this.options.fontSize;
        this.ctx.font = `${currentFontSize}px ${this.options.fontFamily}`;
        const metrics = this.ctx.measureText("@");
        this.charWidth = metrics.width;
        this.charHeight = currentFontSize;
    }

    public async init(): Promise<void> {
        await this.measureCharSize();
        this.resize();
        this.drawFrame(0); // Draw initial static frame
    }

    public resize(): void {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.scale(dpr, dpr);
        this.cols = Math.floor(window.innerWidth / this.charWidth);
        this.rows = Math.floor(window.innerHeight / this.charHeight);
        this.drawFrame(this.accumulatedTime);
    }

    public updateOptions(newOptions: Partial<AsciiRendererOptions>): void {
        const needsResize = newOptions.isLowRes !== this.options.isLowRes;
        this.options = { ...this.options, ...newOptions };
        if (needsResize) {
            this.init();
        }
    }

    public render(timestamp: number): void {
        if (!this.lastRenderTime) this.lastRenderTime = timestamp;
        const deltaTime = timestamp - this.lastRenderTime;

        if (deltaTime >= this.frameInterval) {
            this.lastRenderTime = timestamp;
            const timeDeltaSeconds = deltaTime / 1000;
            this.accumulatedTime += timeDeltaSeconds * this.options.speed;
            this.drawFrame(this.accumulatedTime);
        }
    }
    
    private drawFrame(time: number): void {
        // Blackout bg for clear visibility
        this.ctx.fillStyle = "#0f0f0f";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Pure white ASCII text
        this.ctx.fillStyle = "#ffffff";
        const currentFontSize = this.options.isLowRes ? this.options.lowResFontSize : this.options.fontSize;
        this.ctx.font = `${currentFontSize}px ${this.options.fontFamily}`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                const u = this.cols > 1 ? i / (this.cols - 1) : 0.5;
                const v = this.rows > 1 ? j / (this.rows - 1) : 0.5;
                const noiseValue = this.noiseGen.noise(
                    u * this.options.noiseScale,
                    v * this.options.noiseScale,
                    time
                );
                const normalizedNoise = (noiseValue + 1) / 2;
                // Ensure we never go out-of-bounds
                const charIndex = Math.min(
                    Math.floor(normalizedNoise * (this.options.charRamp.length - 1)),
                    this.options.charRamp.length - 1
                );
                const char = this.options.charRamp[charIndex] || " ";
                this.ctx.fillText(
                    char,
                    i * this.charWidth + this.charWidth / 2,
                    j * this.charHeight + this.charHeight / 2
                );
            }
        }
    }
}

// --- Modular Export: Named, No Controls ---
// Refactor: Remove UI, controls, export as AsciiNoiseBackground (named export)
export const AsciiNoiseBackground = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const rendererRef = React.useRef<AsciiRenderer | null>(null);
    const animationFrameId = React.useRef<number | null>(null);
    const [isInitialized, setIsInitialized] = React.useState(false);

    // Animation frame callback
    React.useEffect(() => {
        const init = async () => {
            if (!canvasRef.current) return;
            await document.fonts.ready;
            rendererRef.current = new AsciiRenderer(canvasRef.current, {});
            await rendererRef.current.init();
            setIsInitialized(true);
        };
        init();
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    // Animation loop
    React.useEffect(() => {
        if (!isInitialized) return;
        let rafId: number;
        const animate = (timestamp: number) => {
            if (rendererRef.current) rendererRef.current.render(timestamp);
            rafId = requestAnimationFrame(animate);
            animationFrameId.current = rafId;
        };
        rafId = requestAnimationFrame(animate);
        animationFrameId.current = rafId;
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isInitialized]);

    // Resize on window resize
    React.useEffect(() => {
        const onResize = () => {
            if (rendererRef.current) rendererRef.current.resize();
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] bg-background overflow-hidden font-mono pointer-events-none select-none" aria-label="Animated ASCII art background">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};