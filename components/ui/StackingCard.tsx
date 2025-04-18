'use client'
import Image from 'next/image'
import React, {} from 'react'
import {motion, MotionValue, useTransform } from 'motion/react'
import { CardStackDetails } from '@/lib/types'
import { Separator } from '@radix-ui/react-separator'

const StackingCard = ({cardDetail, targetScale, progress, range} : {
    cardDetail: CardStackDetails
    targetScale: number
    progress: MotionValue<number>
    range: number[]
}) => {
    // const container = useRef<HTMLDivElement>(null);
    // const {scrollYProgress} = useScroll({
    //     target: container, // The target element to track scroll progress
    //     offset: ["start end", "start start"] // Adjust the offset to control when the animation triggers
    // });
    const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div className='h-screen flex justify-center items-center sticky lg:top-[-5%] top-[0%]'>
       <motion.div className={`md:w-[80vw] lg:[70vw] w-[90vw] sm:max-h-[60vh] md:max-h-[80vh] max-h-[50vh] min-h-fit ${cardDetail.boxColor || 'bg-charcoal'} text-charcoal rounded-xl border-charcoal-light border-4 flex flex-col relative p-5 shadow-xl shadow-charcoal-darker`}
        style={{scale}}       
       >
            <h2 className={`lg:text-5xl md:text-3xl text-2xl font-bold my-3 text-center ${cardDetail.titleCSS}`}>{cardDetail.title}</h2>
            <Separator className={`w-full bg-beige/75 sm:h-[0.1rem] rounded-xl sm:mb-4 h-1`}/>
            <div className='flex flex-col lg:flex-row h-full justify-center relative mx-auto w-full mb-auto'>
                <div className={`relative block lg:hidden w-full h-full rounded-xl  mt-2 bg-offwhite`}>
                    <motion.div className='w-full h-full min-h-[40vw] aspect-[2/1]'>
                        <Image
                        src={cardDetail.src === "/ai4ce_new_block_trans.png" ? "/ai4cewide.png" : cardDetail.src === "/test2.png" ? "/nyulong.png" : cardDetail.src}
                        alt={cardDetail.title}
                        className='object-cover'
                        fill
                        />
                    </motion.div>
                </div>
                <div className="relative h-full lg:w-[35%] w-full text-offwhite text-start">
                    <div className='h-fit'>
                        <div className='w-full flex flex-col sm:flex-row justify-between mr-5 mt-2 sm:mt-0 text-xl font-normal text-muted'>
                            <h2>{cardDetail.jobTitle ? cardDetail.jobTitle : ""}</h2>
                            <h3 className=''>{cardDetail.duration ? cardDetail.duration : ""}</h3>
                        </div>
                        
                        <div className="text-muted lg:text-md text-sm h-fit font-extralight m-0 mt-3">
                            <p className='text-normal lg:text-lg font-light m-0 leading-tight'>{cardDetail.description}</p>
                            {cardDetail.achievements.split("- ").map((liner, idx) => {
                                if (liner.trim() === "") return null; // Skip empty lines
                                return <p key={idx} className='m-0 leading-tight'>
                                    {liner.trim()}
                                        <br/>
                                    </p>
                            })}
                        </div>
                       
                    </div>
                    <a
                        href={cardDetail.link}
                        className="mt-2 text-sm text-accent underline underline-offset-4 hover:text-white transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View More ↗
                    </a>
                    
                </div>
                <Separator className='h-full w-[0.1rem] bg-beige/75 opacity-55 lg:block hidden rounded-xl mx-2'/>
                <div className='relative lg:inline lg:w-[70%] hidden aspect-[16/9] rounded-xl overflow-hidden'>
                    <motion.div className='w-full h-full overflow-hidden text-white'>
                        <Image
                        src={cardDetail.src}
                        alt={cardDetail.title}
                        className='object-cover'
                        style={{ imageRendering: "auto" }}
                        fill
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default StackingCard