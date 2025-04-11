'use client';
import { motion } from 'framer-motion';
import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Image from 'next/image';
const Transition3D = forwardRef<
  HTMLDivElement,
  {
    children?: React.ReactNode;
    transition: boolean;
    frontImg?: string;
  }
>(({ children, transition, frontImg }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => containerRef.current!);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden perspective-[1500px]"
    >
      {/* BACK STATIC CONTENT */}
      <div className="absolute inset-0 z-0">
        {children}
      </div>

      {/* FRONT IMAGE: FULLY PEELS OFF */}
      <motion.div
        className="absolute inset-0 z-10 w-full h-full"
        initial={false}
        animate={
          transition
            ? {
                rotateX: 55,
                //rotateZ: -15,
                translateY: -80,
                translateZ: 150,
                opacity: 0,
                y: "20%",
              }
            : {
                rotateX: 0,
                rotateZ: 0,
                translateY: 0,
                translateZ: 0,
                opacity: 1,
              }
        }
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
        style={{
          transformOrigin: 'bottom left',
          transformStyle: 'preserve-3d',
        }}
      >
        <Image
          src={frontImg || 'fallback.jpg'}
          alt="Front Reveal"
            fill
          className="w-full h-full object-cover rounded-xl shadow-2xl"
        />
      </motion.div>
    </div>
  );
});

Transition3D.displayName = 'Transition3D';
export default Transition3D;
