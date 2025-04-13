import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Share_Tech_Mono } from 'next/font/google';
const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-loader',
});
const Stair = ({ showText, panelCount}: {
    showText: boolean,
    panelCount: number
}) => {
  return (
    <motion.div
        className={`fixed w-screen h-screen z-50 scroll-hidden top-0 ${shareTechMono}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
    >
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <AnimatePresence>
            {showText && (
            <>
                <motion.div className="hidden xl:block" key="text-xl">
                <XLVar />
                </motion.div>
                <motion.div className='hidden lg:block xl:hidden' key="text-lg">
                <LgVar/>
                </motion.div>
                <motion.div className="hidden md:block lg:hidden" key="text-md">
                <MedTextVariant />
                </motion.div>
                <motion.div className="md:hidden" key="text-sm">
                <SmallTextVariant />
                </motion.div>
            </>
            )}
        </AnimatePresence>
        </div> 

        {/* Panel swipe up reveal */}
        <AnimatePresence>
        <motion.div
            key="loader-panels"
            className="absolute inset-0 flex pointer-events-none z-45"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
        >
            {[...Array(panelCount)].map((_, i) => (
            <motion.div
                key={i}
                className="flex-1 bg-black h-full"
                initial={{ y: 0 }}
                animate={{ y: '-100%' }}
                transition={{
                duration: 0.7,
                delay: 1.3 + i * 0.1,
                ease: 'easeInOut',
                }}
            />
            ))}
        </motion.div>
        </AnimatePresence>
    </motion.div>
  )
}

export default Stair

const XLVar = () => {
    return (
      <div className="md:flex flex-col items-center text-beige font-loader w-full relative z-50">
      <div className="w-full relative">
        <motion.h1
          className="text-[30vw] leading-tight font-bold tracking-widest text-left italic top-0"
          initial={{ opacity: 0, x:"-10vw", y:"-20vh",  color: '#f5f5dc' }}
          animate={{ opacity: 1, x:"-10vw", y:"-20vh", color: '#f5f5dc' }}
          exit={{ opacity: 0, x:"-10vw", y:"-20vh", color: '#f5f5dc00' }} // transparent beige
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        >
          SEAN
        </motion.h1>
        <motion.h1
          className="text-[30vw] leading-tight font-bold tracking-widest text-right -mt-6 italic bottom-0"
          initial={{ opacity: 0, x:"10vw", y:"-25vh",  color: '#f5f5dc' }}
          animate={{ opacity: 1, x:"10vw", y:"-25vh", color: '#f5f5dc' }}
          exit={{ opacity: 0, x:"10vw", y:"-25vh",color: '#f5f5dc00' }} // transparent beige
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        >
          LAI
        </motion.h1>
        <div className='absolute xl:top-[35%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] items-center justify-center pointer-events-none py-8'>
          <motion.p
          className="text-lg md:text-7xl font-bold text-muted text-center"
          initial={{y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, color: '#f5f5dc00' }}
          transition={{ delay: 0.2, duration: 1.1, ease: 'easeOut' }}
          >
          SWE & Researcher
          </motion.p>
      </div>
        
      </div>
      
    </div>)
  };
  
  const LgVar = () => {
    return (
      <div className="md:flex flex-col items-center text-beige font-loader w-full relative z-50">
      <div className="w-full relative">
        <motion.h1
          className="text-[35vw] leading-tight font-bold tracking-widest text-left italic top-0"
          initial={{ opacity: 0, x:"-10vw", y:-150,  color: '#f5f5dc' }}
          animate={{ opacity: 1, x:"-10vw", y:-150, color: '#f5f5dc' }}
          exit={{ opacity: 0, x:"-10vw", y:-150, color: '#f5f5dc00' }} // transparent beige
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        >
          SEAN
        </motion.h1>
        <motion.h1
          className="text-[35vw] leading-tight font-bold tracking-widest text-right -mt-6 italic bottom-0"
          initial={{ opacity: 0, x:"10vw", y:100,  color: '#f5f5dc' }}
          animate={{ opacity: 1, x:"10vw", y:100, color: '#f5f5dc' }}
          exit={{ opacity: 0, x:"10vw", y:100,color: '#f5f5dc00' }} // transparent beige
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        >
          LAI
        </motion.h1>
        <div className='absolute xl:top-[35%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] items-center justify-center pointer-events-none py-8'>
          <motion.p
          className="text-lg md:text-7xl font-bold text-muted text-center"
          initial={{y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, color: '#f5f5dc00' }}
          transition={{ delay: 0.2, duration: 1.1, ease: 'easeOut' }}
          >
          SWE & Researcher
          </motion.p>
      </div>
        
      </div>
      
    </div>)
  };

// Same as Large TextVariant but for smaller screens
const MedTextVariant = () => {
    return (
    <div className="md:flex flex-col items-center text-beige font-loader w-full relative z-50">
        <div className="w-full">
          <motion.h1
            className="text-[30vw] leading-tight font-bold tracking-widest text-left italic top-0"
            initial={{ opacity: 0, x:-100, y:-100,  color: '#f5f5dc' }}
            animate={{ opacity: 1, x:-100, y:-100, color: '#f5f5dc' }}
            exit={{ opacity: 0, x:-100, color: '#f5f5dc00' }} // transparent beige
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          >
            SEAN
          </motion.h1>
          <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] items-center justify-center pointer-events-none py-8'>
            <motion.p
            className="text-lg md:text-7xl font-bold text-muted w-full text-center"
            initial={{y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, color: '#f5f5dc00' }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            >
            SWE & Researcher
            </motion.p>
        </div>
          <motion.h1
            className="text-[30vw] leading-tight font-bold tracking-widest text-right -mt-6 italic bottom-0"
            initial={{ opacity: 0, x:100, y:150,  color: '#f5f5dc' }}
            animate={{ opacity: 1, x:100, y:150, color: '#f5f5dc' }}
            exit={{ opacity: 0, x:100,color: '#f5f5dc00' }} // transparent beige
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
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
  