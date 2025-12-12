'use client';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface AsciiArtViewerProps {
  filePath?: string;
  colorFilePath?: string;
  colorMode?: boolean;
  className?: string;
  preloadedData?: ColorData | null;
}

export interface ColorPixel {
  c: string;
  h: string;
}

export interface ColorData {
  width: number;
  height: number;
  data: ColorPixel[];
}

interface AsciiArtViewerProps {
  filePath?: string;
  colorFilePath?: string;
  colorMode?: boolean;
  className?: string;
  preloadedData?: ColorData | null;
}

const AsciiArtViewer: React.FC<AsciiArtViewerProps> = ({
  filePath,
  colorFilePath,
  colorMode = false,
  className,
  preloadedData
}) => {
  const [asciiArt, setAsciiArt] = useState<string>('');
  const [colorData, setColorData] = useState<ColorData | null>(preloadedData || null);
  const [loading, setLoading] = useState<boolean>(!preloadedData);
  const [error, setError] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refs for animation and interaction
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>();
  const mouseRef = useRef<{x: number, y: number} | null>(null);
  const trailRef = useRef<{x: number, y: number, age: number}[]>([]);
  
  // Progressive loading refs
  const currentRowRef = useRef(0);
  const charWidthRef = useRef(0);
  const frameRef = useRef(0);

  // Update state if preloadedData changes
  useEffect(() => {
    if (preloadedData) {
      setColorData(preloadedData);
      setLoading(false);
    }
  }, [preloadedData]);

  // Fetch Monochrome Data
  useEffect(() => {
    if (colorMode || !filePath) return;
    
    setLoading(true);
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load ASCII art');
        return response.text();
      })
      .then(text => {
        setAsciiArt(text);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading ASCII art:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [filePath, colorMode]);

  // Fetch Color Data
  useEffect(() => {
    if (!colorMode || !colorFilePath || preloadedData) return;

    setLoading(true);
    fetch(colorFilePath)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load colored ASCII art');
        return response.json();
      })
      .then((data: ColorData) => {
        setColorData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading colored ASCII art:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [colorFilePath, colorMode]);

  // Prepare Offscreen Canvas (Static Render Setup)
  useEffect(() => {
    if (!colorMode || !colorData) return;

    const offCanvas = document.createElement('canvas');
    const ctx = offCanvas.getContext('2d');
    if (!ctx) return;

    // Responsive settings
    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? 5 : 3;
    const lineHeight = isMobile ? 5 : 3;
    const fontFamily = '"Courier New", Courier, monospace';
    
    const dpr = window.devicePixelRatio || 1;
    const width = colorData.width * (fontSize * 0.6);
    const height = colorData.height * lineHeight;
    
    offCanvas.width = width * dpr;
    offCanvas.height = height * dpr;
    
    ctx.scale(dpr, dpr);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = 'top';
    
    // Draw background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    charWidthRef.current = ctx.measureText('M').width;
    currentRowRef.current = 0; // Reset loading progress

    offscreenCanvasRef.current = offCanvas;
  }, [colorData, colorMode]);

  // Animation Loop
  useEffect(() => {
    if (!colorMode || !colorData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive settings
    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? 5 : 3;
    const lineHeight = isMobile ? 5 : 3;
    const brightnessBoost = isMobile ? 40 : 0;

    // Set canvas size (needs to match offscreen)
    const dpr = window.devicePixelRatio || 1;
    const width = colorData.width * (fontSize * 0.6);
    const height = colorData.height * lineHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    ctx.scale(dpr, dpr);

    // Helper to boost brightness
    const getBoostedColor = (hex: string, boost: number) => {
        if (boost <= 0) return hex;
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        const newR = Math.min(255, r + boost);
        const newG = Math.min(255, g + boost);
        const newB = Math.min(255, b + boost);
        return `rgb(${newR}, ${newG}, ${newB})`;
    };

    const animate = () => {
      if (!offscreenCanvasRef.current) return;

      frameRef.current++;

      // Progressive Loading Logic
      if (colorData && currentRowRef.current < colorData.height) {
         // Control speed: render 1 row every 2 frames
         if (frameRef.current % 2 === 0) {
             const offCtx = offscreenCanvasRef.current.getContext('2d');
             if (offCtx) {
                 const rowsToRender = 1; // Render one row at a time
                 const startRow = currentRowRef.current;
                 const endRow = Math.min(startRow + rowsToRender, colorData.height);
                 const charWidth = charWidthRef.current;
    
                 for (let r = startRow; r < endRow; r++) {
                     const rowOffset = r * colorData.width;
                     for (let c = 0; c < colorData.width; c++) {
                         const pixel = colorData.data[rowOffset + c];
                         if (pixel) {
                             const x = c * charWidth;
                             const y = r * lineHeight;
                             offCtx.fillStyle = getBoostedColor(pixel.h, brightnessBoost);
                             offCtx.fillText(pixel.c, x, y);
                         }
                     }
                 }
                 currentRowRef.current = endRow;
             }
         }
      }

      // 1. Clear and Draw Static Image
      ctx.clearRect(0, 0, width, height);
      
      // Draw the static image (which is being progressively updated)
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(offscreenCanvasRef.current, 0, 0, width, height);

      // 2. Update Trail
      if (mouseRef.current) {
        trailRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          age: 1.0
        });
      }

      // Remove old points
      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        trailRef.current[i].age -= 0.04; // Faster fade for snappier feel
        if (trailRef.current[i].age <= 0) {
          trailRef.current.splice(i, 1);
        }
      }

      // 3. Draw Trail (Pixelated/Voxelized Effect)
      // We want to highlight specific characters based on the trail, not draw a smooth circle.
      if (trailRef.current.length > 0) {
        const charWidth = charWidthRef.current;
        const baseRadius = 20; // Base radius for the trail
        
        // Map to store max brightness for each affected character index
        // Key: pixelIndex, Value: maxAge (brightness factor)
        const affectedPixels = new Map<number, number>();

        trailRef.current.forEach(point => {
            // Dynamic radius: Main hover circle (age ~1) is 20% larger than the fading trail
            const currentRadius = baseRadius * (1 + 0.2 * point.age);

            // Calculate grid bounds for this point
            const centerCol = Math.floor(point.x / charWidth);
            const centerRow = Math.floor(point.y / lineHeight);
            
            const radiusInCols = Math.ceil(currentRadius / charWidth);
            const radiusInRows = Math.ceil(currentRadius / lineHeight);

            const minCol = Math.max(0, centerCol - radiusInCols);
            const maxCol = Math.min(colorData.width - 1, centerCol + radiusInCols);
            const minRow = Math.max(0, centerRow - radiusInRows);
            const maxRow = Math.min(colorData.height - 1, centerRow + radiusInRows);

            for (let r = minRow; r <= maxRow; r++) {
                for (let c = minCol; c <= maxCol; c++) {
                    // Check distance in pixels for "circle" shape
                    const pixelX = c * charWidth + charWidth/2;
                    const pixelY = r * lineHeight + lineHeight/2;
                    const dx = pixelX - point.x;
                    const dy = pixelY - point.y;
                    
                    if (dx*dx + dy*dy <= currentRadius*currentRadius) {
                        const pixelIndex = r * colorData.width + c;
                        const currentMax = affectedPixels.get(pixelIndex) || 0;
                        affectedPixels.set(pixelIndex, Math.max(currentMax, point.age));
                    }
                }
            }
        });

        // Render highlighted characters
        ctx.textBaseline = 'top';
        affectedPixels.forEach((age, pixelIndex) => {
            const pixel = colorData.data[pixelIndex];
            if (pixel) {
                const r = Math.floor(pixelIndex / colorData.width);
                const c = pixelIndex % colorData.width;
                const x = c * charWidth;
                const y = r * lineHeight;

                // Brightness logic: Boost the color towards white based on age
                // Parse hex
                const hex = pixel.h.replace('#', '');
                const rVal = parseInt(hex.substring(0, 2), 16);
                const gVal = parseInt(hex.substring(2, 4), 16);
                const bVal = parseInt(hex.substring(4, 6), 16);

                // Boost amount (reduced brightness as requested)
                // Apply base brightness boost first if on mobile
                const baseR = Math.min(255, rVal + brightnessBoost);
                const baseG = Math.min(255, gVal + brightnessBoost);
                const baseB = Math.min(255, bVal + brightnessBoost);

                const boost = Math.floor(60 * age); 
                
                const newR = Math.min(255, baseR + boost);
                const newG = Math.min(255, baseG + boost);
                const newB = Math.min(255, baseB + boost);
                
                ctx.fillStyle = `rgb(${newR}, ${newG}, ${newB})`;
                ctx.fillText(pixel.c, x, y);
            }
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [colorData, colorMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] w-full text-muted-foreground animate-pulse">
        Loading Art...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] w-full text-destructive">
        Error: {error}
      </div>
    );
  }

  return (
    <div className={cn("w-full flex justify-center bg-stone-900 p-8 rounded-lg shadow-inner border border-stone-800", className)}>
      {colorMode ? (
        <canvas 
          ref={canvasRef} 
          className="select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <pre
          className="font-mono text-[3px] leading-[3px] text-stone-300 whitespace-pre select-none"
          style={{ fontFamily: '"Courier New", Courier, monospace' }}
        >
          {asciiArt}
        </pre>
      )}
    </div>
  );
};

export default AsciiArtViewer;
