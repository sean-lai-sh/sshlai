'use client'
import Lenis from 'lenis'
import React, { useEffect, useRef } from 'react'
import {motion, useScroll, useTransform } from 'motion/react'
import Contact from '../landing/Contact'
import { communities } from '@/lib/consts'
import SlidingBox from './slidingTallBox'
import VertBox from './smallBox'
const CommunitySection = () => {
  useEffect( () => {

    const lenis = new Lenis()  
    function raf(time: number) {   
      lenis.raf(time)   
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

  })
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })
  const x = useTransform(scrollYProgress, [0, 1], ["35%" , "-95%"]);

  return (
    <div className='w-screen min-h-screen bg-offwhite'>
      <div className='w-full text-black'>
          <div className='pt-20 md:px-20 px-10'>
          <h1 className='text-4xl lg:text-7xl font-sans font-semibold text-charcoall leading-relaxed mb-2'>
            Community:
          </h1>
          <h3>
            Here&apos;s a few of my times reaching out to benefit the student builder community at NYU and in NYC.
          </h3>
        </div>
      </div>
        <div ref={container} className={`'w-full h-[200vh] relative bg-offwhite hidden md:block`}>
          <div className='h-screen w-full flex justify-center items-center overflow-hidden sticky top-0  px-10' >
            <motion.div className='md:flex hidden gap-4 lg:gap-12' style={{x:x}}>
                {communities.map((comm, idx) => { 
                  return (<SlidingBox key={idx} comm={comm} />) 
              })}
            </motion.div>
          </div>
        </div>
        <div>
          <div className='w-full min-h-[200vh] flex justify-center items-center md:hidden mb-20'>
            <div className='flex flex-col gap-4 lg:gap-12'>
              {communities.map((comm, idx) => { 
                return (<VertBox key={idx} comm={comm} />) 
              })}
            </div>
          </div>
        </div>
      <Contact/>
    </div>
  )
}

export default CommunitySection