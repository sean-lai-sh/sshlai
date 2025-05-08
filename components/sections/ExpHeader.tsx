'use client'
import React from 'react'
import styles from './style.module.scss'
import { Separator } from '@radix-ui/react-separator'
import { motion } from 'motion/react'
import { MaskText } from '../ui/inlinemask/inlineMask'
const Event = () => {
    const borderVariants = {
        initial: { clipPath: 'circle(0% at 50% 50%)' },
        enter: { clipPath: 'circle(150% at 50% 50%)'},
    }
    return (
        <section className='w-screen bg-charcoal-darker pb-20'>
            <div className='w-full h-full flex flex-col gap-[5.25rem] px-10'>
                <div className='w-full flex flex-col overflow-hidden backdrop-blur-xl bg-charcoal-darker/50 tracking-wide'>
                    <div className='flex w-full justify-between items-end mt-[10vh]'>
                        <h1 className={`w-fit h-fit bg-transparent  font-semibold text-shadow-white ${styles.textShadow}`}>
                            <MaskText phrases={["Knowledge"]} style={`lg:text-[7vw] text-6xl leading-relaxed `} customDelay={0.7} duration={0.9}/>
                        </h1>
                        <h1 className='w-full text-end text-lg py-10 '>
                            
                        </h1>
                    </div>
                    <motion.div  
                    variants={borderVariants}
                    initial="initial"
                    animate="enter"
                    transition= {{duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.65}} className='relative'>
                        <Separator className='w-full h-[2px] bg-offwhite rounded-full mb-5'/>
                    </motion.div>
                    
                    <h1 className={`w-full text-end h-fit bg-transparent text-[8vw] font-semibold italic text-shadow-white leading-none ${styles.textShadow}`}>
                        <MaskText phrases={["is power"]} style={`lg:text-[7vw] text-6xl`} customDelay={0.7} duration={0.9}/>
                    </h1>
                </div>
                <div 
                className='text-[4vw] font-light'>
                    <MaskText phrases={
                        [
                            "Never stop learning,",
                            "There's always something for you out there",
                            "You just have to show up",
                            "Prepared and ready to seize it"
                        ]
                    } customDelay={0.75} style='leading-tight -tracking-wide' />
                </div>
            </div>
        </section>
  )
}

export default Event