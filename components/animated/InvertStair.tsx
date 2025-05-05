import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Share_Tech_Mono } from 'next/font/google';
const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-loader',
});
const InvertStair = ({ panelCount}: {
    panelCount: number
}) => {
  return (
    <motion.div
        className={`fixed w-screen h-screen scroll-hidden top-0 ${shareTechMono}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
    >
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
        </div> 

        {/* Panel swipe up reveal */}
        <AnimatePresence>
        <motion.div
            key="loader-panels"
            className="absolute inset-0 flex pointer-events-none z-45"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
        >
            {[...Array(panelCount)].map((_, i) => (
            <motion.div
                key={i}
                className="flex-1 bg-black h-full"
                initial={{ y: '100%' }}
                animate={{ y:  '-100%' }}
                transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: 'easeInOut',
                }}
            />
            ))}
        </motion.div>
        </AnimatePresence>
    </motion.div>
  )
}

export default InvertStair
