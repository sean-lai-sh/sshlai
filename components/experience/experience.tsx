'use client'
import React, { useState } from 'react'
import BgLister from '../animated/bglister'
import { AnimatePresence} from 'framer-motion';
import { Separator } from '@radix-ui/react-separator';
import {  workExp } from '@/lib/consts';
import ModalPanel from '../ui/ModalPanel';
import Anim_Button from '../ui/animated_a';
const Experience = () => {
  const [currModal, setCurrModal] = useState(0)
  
  
  return (
    <section className='w-full p-2 lg:p-5 md:p-5 bg-charcoal-darker '>
        <div className='pt-[40vh] md:pt-0 md:mt-[20vh] min-h-[30vh] flex items-center justify-start text-start pb-40 md:pb-20'>
            <div className='ml-10 md:ml-20'>
                <h1 className='text-5xl text-offwhite leading-relaxed tracking-wide mb-20'>Experience</h1>
                <h2 className='font-sans text-lg w-full lg:w-[90%] '>I have been dabbling in robotics, real-time systems, and soon data infra. <br/> You&apos;ll also find me hosting some cool events to support Engineers @ NYU. <br/> I&apos;ve done hackathons, startup festivals, and networking panels to name a few. </h2>
                <div className='mt-16'>
                    {/* <a className='px-20 py-5 rounded-2xl border-[2px] border-offwhite'>
                        Resume
                    </a> */}
                    <Anim_Button content="Resume" href="/Sean%20Lai%20Resume.pdf" funcAct={() => {}}/>
                </div>
            </div>
        </div>
        <div className='w-full flex flex-row min-h-[100vh] pb-40 md:pb-0 gap-[2rem] xl:gap-[4rem]'>
            <div id='modal-container' className='hidden h-[60vh] lg:block w-[50vw] sticky top-10 overflow-hidden mt-20 py-20'>
                <AnimatePresence mode='sync'>
                    <ModalPanel modal={currModal} experiences={workExp}/>
                </AnimatePresence>
            </div>
            <ul id='exp-container' className='w-full lg:w-[50vw]'>
                <div className='flex w-full justify-between items-end md:mb-4'><h1 className='text-center md:text-end text-4xl md:text-5xl leading-relaxed'>Work Experience</h1></div>
                <Separator className='w-full bg-beige sm:h-[0.1rem] rounded-xl h-1'/>
                {
                    workExp.map((exp, index) => {
                        return (
                            <BgLister key={index} title={exp.company_name} role={exp.job_title} index={index} link={exp.company_link} isLarge={false} setModal={setCurrModal}/>
                        )
                    })}

                
            </ul>
        </div>
    </section>
  )
}

export default Experience