'use client';
import { motion } from 'framer-motion';
import React, { forwardRef, useRef, useImperativeHandle } from 'react';

const Transition = forwardRef<
  HTMLDivElement,
  {
    children?: React.ReactNode;
    transition: boolean;
    frontImg?: string;
    backImg?: string;
  }
>(({ children, transition, frontImg, backImg }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => containerRef.current!);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Front image reveals with a horizontal clip animation */}
      <motion.img
        src={frontImg || 'fallback.jpg'}
        alt="Project preview"
        className="absolute inset-0 w-full h-full object-cover z-[5]"
        initial={false} // Disable initial animation to prevent flicker
        style={{
            maskImage: 'linear-gradient(135deg, black 40%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(135deg, black 40%, transparent 60%)',
            maskSize: '200% 200%',
            WebkitMaskSize: '200% 200%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
        }}
        animate={{
            maskPosition: transition ? ['0% 0%', '100% 100%'] : ['100% 100%', '0% 0%'],
            WebkitMaskPosition: transition ? ['0% 0%', '100% 100%'] : ['100% 100%', '0% 0%'],
            opacity: transition ? 0 : 1, // Fade in the front image when transitioning
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Back image stays behind */}
      <motion.img
        src={backImg || 'fallback.jpg'}
        alt="Project hover state"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Foreground children */}
      <div className="relative z-10">{children}</div>
    </div>
  );
});

Transition.displayName = 'Transition';
export default Transition;
