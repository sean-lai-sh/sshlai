'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HorizontalExpand from './horizontalExpand';

const HorizontalExpansion = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'] // Changed to start when component fully enters viewport
  });

  // Calculate the total width of all components with overlap
  // For 4 components with 20vw overlap, we need 4*100vw - 3*20vw = 340vw
  const totalWidth = 380;
  
  // Transform scrollYProgress to move horizontally
  // We want to start at 0% (no movement) and end at -(totalWidth - 100)% to show the last component fully
  const x = useTransform(scrollYProgress, [0, 4], ['0%', `-${totalWidth - 100}%`]);

  return (
    <section className='w-screen min-h-screen'>
      <div 
        className='w-screen h-[300vh] relative' 
        ref={scrollRef}
      >
        <div 
          className='w-screen h-screen overflow-hidden snap-mandatory snap-x sticky top-0 flex bg-black' 
          ref={containerRef}
        >
          <motion.div 
            style={{ x }} 
            className='flex items-start justify-start relative'
          >
            {/* Each component has width 100vw, but we position them with 80vw gaps (20vw overlap) */}
            <div className='w-[100vw] flex-shrink-0 snap-start'>
              <HorizontalExpand index={0} img_src={''} style={'bg-red-500'} content={undefined} />
            </div>
            <div className='w-[100vw] flex-shrink-0 ml-[-20vw] shadow-xl snap-start'>
              <HorizontalExpand index={1} img_src={''} style={'bg-yellow-500'} content={undefined} />
            </div>
            <div className='w-[100vw] flex-shrink-0 ml-[-20vw]'>
              <HorizontalExpand index={2} img_src={''} style={'bg-blue-500'} content={undefined} />
            </div>
            <div className='w-[100vw] flex-shrink-0 ml-[-20vw]'>
              <HorizontalExpand index={3} img_src={''} style={'bg-green-500'} content={undefined} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HorizontalExpansion