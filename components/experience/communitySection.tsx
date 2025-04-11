'use client'
import Lenis from 'lenis'
import React, { useEffect, useRef } from 'react'
import {motion, useScroll, useTransform } from 'motion/react'
import Contact from '../landing/Contact'
import { communities } from '@/lib/consts'
import SlidingBox from './slidingTallBox'
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
    <div className='w-full min-h-screen bg-offwhite  '>
      <div className='w-full text-black'>
          <div className='pt-20 px-20'>
          <h1 className='text-7xl font-sans font-semibold text-charcoall leading-relaxed'>
            Community Outreach/Experience:
          </h1>
          <h3>
            Here&apos;s a few of my times reaching out to benefit the student builder community at NYU and in NYC.
          </h3>
        </div>
      </div>
      {/* <div className='w-full flex items-center justify-center'> */}
        <div ref={container} className={`'w-full h-[200vh] relative bg-offwhite`}>
          <div className='h-screen w-full flex justify-center items-center overflow-hidden sticky top-0  px-10' >
            <motion.div className='flex gap-4 lg:gap-8' style={{x:x}}>
                {communities.map((comm, idx) => { 
                  return (<SlidingBox key={idx} comm={comm} />) 
              })}
            </motion.div>
          </div>
        {/* </div> */}
      </div>
      <Contact/>
    </div>
  )
}

export default CommunitySection