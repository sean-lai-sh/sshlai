'use client';
import { motion } from 'framer-motion';
import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
const Transition3D = forwardRef<
  HTMLDivElement,
  {
    children?: React.ReactNode;
    tag?: string;
    transition: boolean;
    frontImg?: string;
  }
>(({ children, transition, frontImg, tag }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => containerRef.current!);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden perspective-[1500px]"
    >
      {/* BACK STATIC CONTENT */}
      <div className="absolute inset-5 z-0 text-offwhite">
        {children ? children :
        <>
            <h1 className='text-4xl font-serif leading-relaxed'>HOF Hacks</h1>
            <h2 className='text-2xl italic'>Building Tomorrow</h2>
            <p>To be honest, this was pulled off in under a month. From a warm intro to Tahseen and HOF thanks to Baylor at ZFelllows, it was non-stop fun. While there were many late night calling  and meetings, it was only possible by the graceful words that came out when negotiating the terms, 
            <br/>
            <br/>
                | <span className='italic font-medium'>"We'll help with intros and the venue, you do the rest". - Tahseen</span> 
            <br/>
            <br/>
            Those very warm introductions reinforced why I love the builder community. What started as persuading Vercel head of startups to give NYU builders a shot, resulted in expanding reach to include V1 @ UMich and cracked builders from Penn, Columbia, Cornell and more. It's allowed me to grow in so many ways, and appreciate for all the people who I can trust, call, and hope to build on in the coming years.
            <br/>
            Finally, I also learned one extra lesson. <strong>If someone drinks from Saratoga bottles daily, they know some people or made it</strong>, usually its both.
            </p>
            <div className='w-full'>
                <AspectRatio ratio={16 / 9} className="w-full h-full">
                    <Image
                    src={"/hoffice.jpg"}
                    alt={"Back Image"}
                    fill
                    className='object-cover  rounded-2xl'
                    />
                </AspectRatio>
            </div>
        </>}
      </div>

      {/* FRONT IMAGE: FULLY PEELS OFF */}
      
      <motion.div
        className={`absolute inset-0 w-[99%] left-1 h-[95%] overflow-y-hidden`}
        initial={false}
        animate={
          transition
            ? {
                rotateX: 90,
                //rotateZ: -15,
                translateY: 200,
                translateZ: 150,
                opacity: 1,
                y: "20%",
                z: -10,
              }
            : {
                rotateX: 0,
                rotateZ: 0,
                translateY: 0,
                translateZ: 0,
                opacity: 1,
                z: 10,
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
          className="w-full h-full object-cover rounded-xl"
        />
        
      </motion.div>
      <motion.h2 className='absolute bottom-[-1px] w-full z-20 bg-charcoal-darker hover:bg-white text-white font-sans font-medium text-xl text-center p-4'
      
      initial={false}
        animate={
          transition
            ? {
                opacity: 0,
              }
            : {
                opacity: 1,
              }
        }
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
          delay: 0.7,
        }}
        >   
            {tag}
        </motion.h2>
    </div>
  );
});

Transition3D.displayName = 'Transition3D';
export default Transition3D;
