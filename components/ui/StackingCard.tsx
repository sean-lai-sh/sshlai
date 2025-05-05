'use client'
import Image from 'next/image'
import React, {} from 'react'
import {motion, MotionValue, useTransform } from 'motion/react'
import { CardStackDetails } from '@/lib/types'
import { Separator } from '../ui/separator'

const StackingCard = ({cardDetail, targetScale, progress, range, insetColor} : {
    cardDetail: CardStackDetails
    targetScale: number
    progress: MotionValue<number>
    range: number[]
    insetColor?: string
}) => {
    const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div className='h-screen w-screen flex justify-center items-center sticky top-0 '>
       <motion.div className={`md:w-[80vw] lg:w-[70vw] w-[90vw] md:h-[80vh] h-[70vh] min-h-fit ${cardDetail.boxColor || 'bg-charcoal'} text-charcoal rounded-xl border-charcoal-light border-4 flex flex-col p-5 shadow-xl shadow-charcoal-darker `}
        style={{scale}}       
       >
            <h2 className={`lg:text-5xl md:text-3xl text-2xl font-bold my-3 text-center ${cardDetail.titleCSS}`}>{cardDetail.title}</h2>
            <Separator className={`w-full bg-beige/75 sm:h-[0.1rem] rounded-xl sm:mb-4 h-1`}/>
            <div className='flex flex-col h-full justify-center relative mx-auto w-full mb-auto'>
                <div className={`relative block lg:hidden w-full h-full rounded-xl  mt-2 bg-offwhite`}>
                    <motion.div className='w-full min-h-[10vh] aspect-[16/9] ${insetColor}'>
                        <Image
                        src={cardDetail.src === "/ai4ce_new_block_trans.png" ? "/ai4cewide.png" : cardDetail.src === "/test2.png" ? "/nyulong.png" : cardDetail.src}
                        alt={cardDetail.title}
                        className={`object-contain inset-10 ${insetColor}`}
                        fill
                        />
                    </motion.div>
                </div>
                <div className="relative h-full w-full text-offwhite text-start">
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