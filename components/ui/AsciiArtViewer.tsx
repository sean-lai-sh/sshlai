import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface AsciiArtViewerProps {
  filePath: string;
  colorFilePath?: string;
  colorMode?: boolean;
  className?: string;
}

interface ColorPixel {
  c: string;
  h: string;
}

interface ColorData {
  width: number;
  height: number;
  data: ColorPixel[];
}

const AsciiArtViewer: React.FC<AsciiArtViewerProps> = ({ 
  filePath, 
  colorFilePath, 
  colorMode = false, 
  className 
}) => {
  const [asciiArt, setAsciiArt] = useState<string>('');
  const [colorData, setColorData] = useState<ColorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch Monochrome Data
  useEffect(() => {
    if (colorMode) return;
    
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
    if (!colorMode || !colorFilePath) return;

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

  // Render Color Mode to Canvas
  useEffect(() => {
    if (!colorMode || !colorData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Font settings - must match the monochrome look
    const fontSize = 3;
    const lineHeight = 3;
    const fontFamily = '"Courier New", Courier, monospace';
    
    // Set canvas size
    // We need high resolution for crisp text
    const dpr = window.devicePixelRatio || 1;
    const width = colorData.width * (fontSize * 0.6); // Approx char width
    const height = colorData.height * lineHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    ctx.scale(dpr, dpr);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = 'top';
    
    // Clear canvas
    ctx.fillStyle = '#000000'; // Black background for color mode usually looks best
    ctx.fillRect(0, 0, width, height);

    // Render characters
    // Char width is tricky in canvas. We'll assume a fixed advance for monospace.
    // Measuring 'M' usually gives a good approximation for monospace width.
    const charWidth = ctx.measureText('M').width;

    colorData.data.forEach((pixel, index) => {
      const x = (index % colorData.width) * charWidth;
      const y = Math.floor(index / colorData.width) * lineHeight;
      
      ctx.fillStyle = pixel.h;
      ctx.fillText(pixel.c, x, y);
    });

  }, [colorData, colorMode]);

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
        <canvas ref={canvasRef} className="select-none" />
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
