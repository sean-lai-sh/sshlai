'use client'
import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'

const Anim_Button = ({content, style="px-20 py-5 rounded-2xl border-[2px] border-offwhite", href = "/", funcAct} : {content:string, style?:string, href:string, funcAct:() => void}) => {
    const bgVariants = {
    initial: { y: '110%' },
    hover: { y: '0%' },
    exit: { y: '-110%' }
    };
  return (
    <Link href={href} passHref className="w-fit">
        <motion.div 
        className={`relative hover:text-black flex justify-between  items-center font-semibold text-white overflow-hidden w-fit  ${style}`}
        initial="initial"
        whileHover="hover"
        whileFocus="hover"
        onHoverStart={() => funcAct()}>
            {/* Background layer */}
            <motion.div
                variants={bgVariants}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.28, 1] }}
                className="absolute inset-0 w-full h-full bg-offwhite z-0"
            />
            {/* Foreground content */}
            <div className="relative flex w-fit z-5 items-center h-full">
                {content}
            </div>
        </motion.div>
    </Link>
  )
}

export default Anim_Button