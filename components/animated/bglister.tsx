'use client'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import {motion} from 'framer-motion'
import { MaskText } from '../ui/inlinemask/inlineMask'
import { PopIcon } from '../ui/inlinemask/poppingicon'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer';

const BgLister = ({title, role, index, link, isLarge, setModal} : {title:string, role:string, index:number, link:string, isLarge:boolean, setModal:(index: number) => void}) => {
    const bgVariants = {
    initial: { y: '110%' },
    hover: { y: '0%' },
    exit: { y: '110%' }

    };
    const borderVariants = {
        initial: { x: "-100%"},
        enter: { x: "0%"},
    }
    const condition = isLarge && index <= 1
    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: true
      });
    return (
        <Link href={link} passHref className="w-full h-full" ref={ref}>
            <motion.li 
            className="relative w-full sm:h-fit h-44 hover:text-black flex justify-between  items-center font-semibold text-white overflow-hidden"
            initial="initial"
            whileHover="hover"
            whileFocus="hover"
            onHoverStart={() => setModal(index)}>
                {/* Background layer */}
                <motion.div
                    variants={bgVariants}
                    transition={{ duration: 1.05, ease: [0.22, 1, 0.28, 1] }}
                    className="absolute inset-0 w-full h-full bg-offwhite z-0"
                />
                <motion.div  
                variants={borderVariants}
                initial="initial"
                animate={inView ? "enter" : ""}
                transition= {{duration: 1.25, ease: [0.22, 1, 0.36, 1], delay: 0.4}} className='absolute inset-0 w-full h-full border-b-2 z-5 bg-transparent border-white'/>
                {/* Foreground content */}
                <div className="relative flex w-full z-5 items-center p-[1.7rem] h-full">
                    <MaskText style='md:w-[27rem] w-[20rem]' phrases={[title]}  duration={0.92} customDelay={condition ? 0.95 : 0}/>
                    <MaskText style='w-full' phrases={[role]} customDelay={condition ? 0.85 : 0.4} duration={0.92}/>
                    <PopIcon Icon={<ArrowUpRight className='' />} style='absolute right-4' customDelay={condition ? 0.85 : 0.4}/>
                </div>
            </motion.li>
        </Link>
  )
}

export default BgLister