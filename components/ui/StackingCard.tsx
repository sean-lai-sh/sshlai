'use client'
import Image from 'next/image'
import React, {useRef} from 'react'
import { useScroll, useTransform, motion } from 'motion/react'

const StackingCard = ({ title, src, description, link, color} : {
    title: string,
    src: string,
    description: string, 
    link: string,
    color?: string
}) => {
    const container = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target: container, // The target element to track scroll progress
        offset: ["start end", "start start"] // Adjust the offset to control when the animation triggers
    });
  return (
    <div className='h-screen flex justify-center items-center sticky lg:top-[-5%] top-[0%]'>
       <div className={`w-[70vw] h-[60vh] ${color || 'bg-charcoal'} text-charcoal rounded-xl border-charcoal-darker border-4 flex flex-col relative p-5`}>
            <h2 className="text-3xl font-bold my-3 text-center">{title}</h2>
            <div className='flex flex-row h-full justify-center relative mx-auto min-w-[90%] mb-auto'>
                <div className="relative justify-between h-full w-[60%] text-beige">
                    <div>
                        
                        <p className="text-muted text-sm line-clamp-5">{description}</p>
                    </div>
                    <a
                        href={link}
                        className="mt-2 text-sm text-accent underline underline-offset-4 hover:text-white transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View More ↗
                    </a>
                    
                </div>
                <div className='relative w-[40%] h-full rounded-xl overflow-hidden'>
                    <motion.div className='w-full h-full'>
                        <Image
                        src={src}
                        alt={title}
                        className='object-cover'
                        fill
                        />
                    </motion.div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default StackingCard