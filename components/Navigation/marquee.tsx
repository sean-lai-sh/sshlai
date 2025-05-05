'use client';

import { Sparkles } from 'lucide-react';

const MarqueeBanner = () => {
  const content = Array(20).fill('Looking for Internships');

  return (
    <div className="top-[90vh] absolute w-screen bg-charcoal-light text-beige overflow-hidden z-[5] border-t border-accent/40 shadow-inner">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] gap-6 py-2 px-4">
        {content.map((text, index) => (
        <div key={index} className='flex justify-between items-center gap-4'>
            <Sparkles className="w-4 h-4 text-beige text-accent mx-4" />
            <div className="flex items-center gap-2 text-lg font-medium">
                <span>{text}</span>
            </div>
          
        </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
