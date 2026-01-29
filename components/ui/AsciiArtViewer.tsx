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
  const lastInteractionRef = useRef<number>(0);
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
      const timeSinceInteraction = Date.now() - lastInteractionRef.current;
      const isInteracting = timeSinceInteraction < 1500; // Stop adding trail after 1.5s of no movement

      if (!isMobile && mouseRef.current && isInteracting) {
         // Grid settings
         const gridCols = 8;
         const gridRows = 4;
         const gridW = charWidthRef.current * gridCols;
         const gridH = lineHeight * gridRows;

         const gridX = Math.floor(mouseRef.current.x / gridW);
         const gridY = Math.floor(mouseRef.current.y / gridH);
         
         const centerX = gridX * gridW + gridW / 2;
         const centerY = gridY * gridH + gridH / 2;

         // Check if we already have a recent point for this grid
         const existingPointIndex = trailRef.current.findIndex(p => 
             Math.abs(p.x - centerX) < 1 && Math.abs(p.y - centerY) < 1
         );

         if (existingPointIndex !== -1) {
             trailRef.current[existingPointIndex].age = 1.0;
         } else {
             trailRef.current.push({
                 x: centerX,
                 y: centerY,
                 age: 1.0
             });
         }
      }

      // Remove old points
      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        trailRef.current[i].age -= 0.02; // Slower fade (approx 0.8s)
        if (trailRef.current[i].age <= 0) {
          trailRef.current.splice(i, 1);
        }
      }

      // 3. Draw Trail (Grid Effect)
      if (!isMobile && trailRef.current.length > 0) {
        const charWidth = charWidthRef.current;
        // Grid settings (must match update)
        const gridCols = 5;
        const gridRows = 3;
        const gridW = charWidth * gridCols;
        const gridH = lineHeight * gridRows;
        
        const affectedPixels = new Map<number, number>();
        const radiusInCells = 4.5; // Blocky circle radius (in grid cells)

        trailRef.current.forEach(point => {
            // Determine grid coordinates of the point
            const centerGridCol = Math.floor(point.x / gridW);
            const centerGridRow = Math.floor(point.y / gridH);

            // Iterate over potential neighbor grid cells
            const startGCol = Math.floor(centerGridCol - radiusInCells);
            const endGCol = Math.ceil(centerGridCol + radiusInCells);
            const startGRow = Math.floor(centerGridRow - radiusInCells);
            const endGRow = Math.ceil(centerGridRow + radiusInCells);

            for (let gRow = startGRow; gRow <= endGRow; gRow++) {
                for (let gCol = startGCol; gCol <= endGCol; gCol++) {
                     // Check if this grid cell is within radius (Blocky Circle Logic)
                     const dx = gCol - centerGridCol;
                     const dy = gRow - centerGridRow;
                     
                     // Use a slightly permissive circle check for "blocky circle"
                     if (dx*dx + dy*dy <= radiusInCells * radiusInCells) {
                          // This grid cell is active.
                          // Calculate pixel bounds for this grid cell (gRow, gCol)
                          const cellMinX = gCol * gridW;
                          const cellMaxX = (gCol + 1) * gridW;
                          const cellMinY = gRow * gridH;
                          const cellMaxY = (gRow + 1) * gridH;

                          const startCol = Math.floor(cellMinX / charWidth);
                          const endCol = Math.ceil(cellMaxX / charWidth);
                          const startRow = Math.floor(cellMinY / lineHeight);
                          const endRow = Math.ceil(cellMaxY / lineHeight);

                          // Clamp to image bounds
                          const cMin = Math.max(0, startCol);
                          const cMax = Math.min(colorData.width, endCol);
                          const rMin = Math.max(0, startRow);
                          const rMax = Math.min(colorData.height, endRow);

                          for (let r = rMin; r < rMax; r++) {
                              for (let c = cMin; c < cMax; c++) {
                                  const pixelIndex = r * colorData.width + c;
                                  const currentMax = affectedPixels.get(pixelIndex) || 0;
                                  affectedPixels.set(pixelIndex, Math.max(currentMax, point.age));
                              }
                          }
                     }
                }
            }
        });

        // Render highlighted characters
        ctx.textBaseline = 'top';
        const glitchChars = '█▓▒░@#%&?!<>/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        affectedPixels.forEach((age, pixelIndex) => {
            const pixel = colorData.data[pixelIndex];
            if (pixel) {
                const r = Math.floor(pixelIndex / colorData.width);
                const c = pixelIndex % colorData.width;
                const x = c * charWidth;
                const y = r * lineHeight;

                // Glitch Effect: Randomly corrupt character and color based on proximity (age)
                // Reduced probability (strength) and frequency
                if (Math.random() < age * 0.05) {
                    // 1. Color Corruption
                    const glitchType = Math.random();
                    let fillStyle;
                    
                    // Retro Static Palette (CMYK + Phosphor + Noise)
                    if (glitchType < 0.15) fillStyle = '#FFFFFF'; // White (Bright pop)
                    else if (glitchType < 0.30) fillStyle = '#00FFFF'; // Cyan
                    else if (glitchType < 0.45) fillStyle = '#FF00FF'; // Magenta
                    else if (glitchType < 0.60) fillStyle = '#FFFF00'; // Yellow
                    else if (glitchType < 0.75) fillStyle = '#00FF00'; // Green (Phosphor)
                    else if (glitchType < 0.85) fillStyle = '#FF0000'; // Red
                    else {
                        // Grayscale static noise
                        const gray = Math.floor(Math.random() * 200 + 55);
                        fillStyle = `rgb(${gray},${gray},${gray})`;
                    }

                    // Apply easing to opacity
                    ctx.save();
                    ctx.globalAlpha = age; // Fade out based on age
                    ctx.fillStyle = fillStyle;

                    // 2. Character Replacement
                    // Reduced replacement chance significantly
                    const charToDraw = Math.random() < 0.1 
                        ? glitchChars.charAt(Math.floor(Math.random() * glitchChars.length)) 
                        : pixel.c;
                    
                    // 3. Position Jitter
                    // Reduced jitter amplitude
                    const jitterX = (Math.random() - 0.5) * 1.5;
                    const jitterY = (Math.random() - 0.5) * 1.5;

                    ctx.fillText(charToDraw, x + jitterX, y + jitterY);
                    ctx.restore();
                }
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
    lastInteractionRef.current = Date.now();
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

  const handleContextMenu = () => {
    // Clear trail immediately for clean copy
    trailRef.current = [];
    mouseRef.current = null;
    
    // Force immediate redraw of static content
    if (canvasRef.current && offscreenCanvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            // Use style width/height which matches the logical coordinate system (since context is scaled)
            const width = parseFloat(canvasRef.current.style.width);
            const height = parseFloat(canvasRef.current.style.height);
            
            if (!isNaN(width) && !isNaN(height)) {
                ctx.globalCompositeOperation = 'source-over';
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(offscreenCanvasRef.current, 0, 0, width, height);
            }
        }
    }
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
          onContextMenu={handleContextMenu}
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
