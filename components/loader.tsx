'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share_Tech_Mono } from 'next/font/google';

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-loader',
});

export default function Loader({ children }: { children: React.ReactNode }) {
    const [showLoader, setShowLoader] = useState(true);
    const [showText, setShowText] = useState(true);
    
  const [panelCount, setPanelCount] = useState(5);

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
        if (reducedMotion) {
        setShowLoader(false);
        setShowText(false);
        return;
        }
    
        const width = window.innerWidth;
        const panelCount = width < 640 ? 1 : width < 1024 ? 2 : 5;
        setPanelCount(panelCount);
    
        // Fade out text FIRST
        const textOutTime = 1.5;
        const totalAnimationTime = textOutTime + (panelCount * 0.1) + 0.6;
    
        const textTimer = setTimeout(() => setShowText(false), textOutTime * 1000);
        const loaderTimer = setTimeout(() => setShowLoader(false), totalAnimationTime * 1000);
    
        return () => {
        clearTimeout(textTimer);
        clearTimeout(loaderTimer);
        };
    }, []);
  

  return (
    <div className={`relative w-full h-screen overflow-hidden ${shareTechMono.variable}`}>
      <AnimatePresence>
  {showLoader && (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-center text-beige z-50 object-cover"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Fade out the text first */}
      <AnimatePresence>
        {showText && (
            <>
                <motion.div
                    key="loader-text"
                    className='hidden lg:block'
                    initial={{ opacity: 0,  }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0,}}
                    transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }} // Delay to ensure text fades out before panels
                >
                    <LargeTextVariant />
                </motion.div>
                <motion.div
                    key="loader-text-med"
                    className='hidden md:block lg:hidden'
                    initial={{ opacity: 0,  }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0,}}
                    transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }} // Delay to ensure text fades out before panels
                >
                    <MedTextVariant />
                </motion.div>
                <motion.div
                    key="loader-text-small"
                    className="md:hidden"
                    initial={{ opacity: 0,  }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0,}}
                    transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }} // Delay to ensure text fades out before panels
                >

                    <SmallTextVariant />
                </motion.div>
            </>
        )}
        </AnimatePresence>


      {/* Panel reveal AFTER text fades out */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="loader-panels"
            className="absolute inset-0 flex pointer-events-none z-45"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }} // delayed until text fades
          >
            {[...Array(panelCount)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-black h-full"
                initial={{ y: 0 }}
                animate={{ y: '-100%' }}
                transition={{
                  duration: 0.7,
                  delay: 1.3 + i * 0.1, // delay should start after text fade
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )}
</AnimatePresence>


      {/* <AnimatePresence>
        {showLoader && (
          <motion.div
            className="absolute inset-0 flex pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {[...Array(panelCount)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-black h-full z-50"
                initial={{ y: 0 }}
                animate={{ y: '-100%' }}
                transition={{
                  duration: 0.6,
                  delay: 0.9 + i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence> */}

      <div
      >
        {children}
      </div>
    </div>
  );
}

const LargeTextVariant = () => {
    return (
    <div className="md:flex flex-col items-center text-beige font-loader w-full relative z-50">
        <div className="w-full">
          <motion.h1
            className="text-[30vw] leading-tight font-bold tracking-widest text-left left-0 italic"
            initial={{ opacity: 0, x: -120, y:-20, color: '#f5f5dc' }}
            animate={{ opacity: 1, x: -140, y:-20, color: '#f5f5dc' }}
            exit={{ opacity: 0, x: -140, y:0, color: '#f5f5dc00' }} // transparent beige
            transition={{ delay: 0.3, duration: 1.4, ease: 'easeOut' }}
          >
            SEAN
          </motion.h1>
          <motion.h1
            className="text-[30vw] leading-tight font-bold tracking-widest text-right -mt-6 right-0 italic"
            initial={{ opacity: 0, x: 80, y:30, color: '#f5f5dc' }}
            animate={{ opacity: 1, x: 80, y:30, color: '#f5f5dc' }}
            exit={{ opacity: 0, x: 80, y:0, color: '#f5f5dc00' }} // transparent beige
            transition={{ delay: 0.3, duration: 1.3, ease: 'easeOut' }}
          >
            LAI
          </motion.h1>
        </div>
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] items-center justify-center pointer-events-none'>
            <motion.p
            className="text-lg md:text-7xl font-bold text-muted w-full text-center"
            initial={{y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, color: '#f5f5dc00' }}
            transition={{ delay: 0.4, duration: 1.1, ease: 'easeOut' }}
            >
            SWE & Researcher
            </motion.p>
        </div>
      </div>)
}

// Same as Large TextVariant but for smaller screens
const MedTextVariant = () => {
    return (
    <div className="md:flex flex-col items-center text-beige font-loader w-full relative z-50">
        <div className="w-full">
          <motion.h1
            className="text-[30vw] leading-tight font-bold tracking-widest text-left italic top-0"
            initial={{ opacity: 0, x:-100, y:-100,  color: '#f5f5dc' }}
            animate={{ opacity: 1, x:-100, y:-100, color: '#f5f5dc' }}
            exit={{ opacity: 0, x:-400, color: '#f5f5dc00' }} // transparent beige
            transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
          >
            SEAN
          </motion.h1>
          <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] items-center justify-center pointer-events-none py-8'>
            <motion.p
            className="text-lg md:text-7xl font-bold text-muted w-full text-center"
            initial={{y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, color: '#f5f5dc00' }}
            transition={{ delay: 0.2, duration: 1.1, ease: 'easeOut' }}
            >
            SWE & Researcher
            </motion.p>
        </div>
          <motion.h1
            className="text-[30vw] leading-tight font-bold tracking-widest text-right -mt-6 italic bottom-0"
            initial={{ opacity: 0, x:100, y:150,  color: '#f5f5dc' }}
            animate={{ opacity: 1, x:100, y:150, color: '#f5f5dc' }}
            exit={{ opacity: 0, x:400,color: '#f5f5dc00' }} // transparent beige
            transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
          >
            LAI
          </motion.h1>
        </div>
        
      </div>)
}

const SmallTextVariant = () => {
    return (
      <div className="flex flex-col items-center text-beige font-loader w-full relative z-50 md:hidden">
        <motion.h1
          className="text-7xl font-bold text-center italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
        >
          Sean Lai
        </motion.h1>
  
        <motion.p
          className="text-4xl font-bold text-muted text-center italic mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
        >
          SWE & Researcher
        </motion.p>
      </div>
    );
  };
  