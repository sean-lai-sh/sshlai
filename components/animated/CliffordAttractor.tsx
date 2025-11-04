"use client";

import * as React from "react";

interface CliffordAttractorProps {
    width?: number;
    height?: number;
    a?: number;
    b?: number;
    c?: number;
    d?: number;
    pointsPerFrame?: number;
    maxPoints?: number;
    fontSize?: number;
    className?: string;
}

export const CliffordAttractor: React.FC<CliffordAttractorProps> = ({
    width = 600,
    height = 600,
    a = -1.4,
    b = 1.6,
    c = 1.0,
    d = 0.7,
    pointsPerFrame = 200,
    maxPoints = 150000,
    fontSize = 8,
    className = "",
}) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const pointsRef = React.useRef<{ x: number; y: number; age: number }[]>([]);
    const animationFrameId = React.useRef<number | null>(null);
    const currentPointRef = React.useRef({ x: 0, y: 0 });

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        // ASCII character ramp - from light to heavy
        const charRamp = [".", "·", ":", ";", "o", "*", "O", "@", "█"];

        // Set canvas size
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        // Initialize starting point
        currentPointRef.current = { x: 0, y: 0 };
        pointsRef.current = [];

        // Initial clear with dark background
        ctx.fillStyle = "#0f0f0f";
        ctx.fillRect(0, 0, width, height);

        // Set font for ASCII rendering
        ctx.font = `${fontSize}px var(--font-mono, monospace)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const animate = () => {
            if (!ctx) return;

            // Generate new points
            for (let i = 0; i < pointsPerFrame; i++) {
                const { x, y } = currentPointRef.current;

                // Clifford Attractor equations
                const xNew = Math.sin(a * y) + c * Math.cos(a * x);
                const yNew = Math.sin(b * x) + d * Math.cos(b * y);

                pointsRef.current.push({ x: xNew, y: yNew, age: 0 });
                currentPointRef.current = { x: xNew, y: yNew };

                // Limit total points
                if (pointsRef.current.length > maxPoints) {
                    pointsRef.current.shift();
                }
            }

            // Age all points
            pointsRef.current.forEach(p => p.age++);

            // Find bounds for scaling
            let minX = Infinity, maxX = -Infinity;
            let minY = Infinity, maxY = -Infinity;
            pointsRef.current.forEach(p => {
                minX = Math.min(minX, p.x);
                maxX = Math.max(maxX, p.x);
                minY = Math.min(minY, p.y);
                maxY = Math.max(maxY, p.y);
            });

            const rangeX = maxX - minX;
            const rangeY = maxY - minY;
            const scale = Math.min(width / rangeX, height / rangeY) * 0.85;
            const offsetX = width / 2 - ((minX + maxX) / 2) * scale;
            const offsetY = height / 2 - ((minY + maxY) / 2) * scale;

            // Clear canvas with very subtle fade for trail effect
            ctx.fillStyle = "rgba(15, 15, 15, 0.03)";
            ctx.fillRect(0, 0, width, height);

            // Draw each point as an ASCII character
            pointsRef.current.forEach((point, index) => {
                const screenX = point.x * scale + offsetX;
                const screenY = point.y * scale + offsetY;

                if (screenX < 0 || screenX > width || screenY < 0 || screenY > height) return;

                // Age-based character selection and opacity
                const ageProgress = index / pointsRef.current.length;
                
                // Pick character based on age - newer points get denser characters
                const charIndex = Math.min(
                    Math.floor(ageProgress * charRamp.length),
                    charRamp.length - 1
                );
                const char = charRamp[charIndex];

                // Color based on position and age
                const hue = (ageProgress * 60 + 180) % 360; // Blue to cyan range
                const lightness = 50 + ageProgress * 30;
                const alpha = 0.4 + ageProgress * 0.6;

                ctx.fillStyle = `hsla(${hue}, 70%, ${lightness}%, ${alpha})`;
                ctx.fillText(char, screenX, screenY);
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [width, height, a, b, c, d, pointsPerFrame, maxPoints, fontSize]);

    return (
        <div className={`relative ${className}`}>
            <canvas
                ref={canvasRef}
                className="rounded-lg shadow-2xl font-mono bg-[#0f0f0f]"
                style={{ width: `${width}px`, height: `${height}px` }}
            />
        </div>
    );
};
