'use client';
import React, { useEffect, useState } from 'react';

interface AsciiLine {
  row: number;
  col: number;
  text: string;
}

interface AngelWingsData {
  content: AsciiLine[];
}

const AngelWingsBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [asciiLines, setAsciiLines] = useState<AsciiLine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/test.json')
      .then(res => res.json())
      .then((data: AngelWingsData) => {
        setAsciiLines(data.content);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load angel wings:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  // Find max row and col to determine canvas size
  const maxRow = Math.max(...asciiLines.map(l => l.row));
  const maxCol = Math.max(...asciiLines.map(l => l.col + l.text.length));

  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      <pre className="font-mono text-[4px] leading-[4px] whitespace-pre text-beige">
        {Array.from({ length: maxRow + 1 }, (_, rowIndex) => {
          const line = asciiLines.find(l => l.row === rowIndex);
          if (!line) return '\n';

          // Create padding before the text
          const padding = ' '.repeat(line.col);
          return padding + line.text + '\n';
        }).join('')}
      </pre>
    </div>
  );
};

export default AngelWingsBackground;
