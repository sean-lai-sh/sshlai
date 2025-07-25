'use client'
import React from 'react'
import BgLister from '../animated/bglister'
import { Separator } from '@radix-ui/react-separator';
import {  projectList } from '@/lib/consts';
import ContactPage from './Contact';
const Experience = () => {
  
  return (
    <section className='w-full flex lg:justify-center flex-col backdrop-blur-sm'>
        {/* <div className='pt-[40vh] md:pt-[20vh] min-h-[30vh] w-full flex items-center justify-start text-start pb-40 px-[10vw] md:px-[3vw]'>
            <div className='md:ml-10 lg:ml-20'>
                <h1 className='text-5xl text-offwhite leading-relaxed tracking-wide mb-20'>Experience</h1>
                <h2 className='font-sans text-lg w-full '>I have been dabbling in robotics, real-time systems, and soon data infrastructure work. <br/> You&apos;ll also find me hosting some cool events to support Engineers @ NYU. <br/> I&apos;ve done hackathons, startup festivals, and networking panels to name a few. </h2>
                <div className='mt-16'>
                    
                    <Anim_Button content="Resume" href="/Sean%20Lai%20Resume.pdf" funcAct={() => {}}/>
                </div>
            </div>
        </div> */}
        <div className='w-full lg:w-screen flex lg:flex-row items-start justify-center md:justify-start md:pl-10 pb-20 md:pb-20 py-10 ' >
            <ul id='exp-container' className='w-[95%] lg:w-1/2 min-w-[40vw] justify-center flex flex-col'>
                <div className='flex w-full justify-between items-end md:mb-4'><h1 className='text-center md:text-end text-4xl md:text-5xl leading-relaxed'>Projects</h1></div>
                <Separator className='w-full bg-beige sm:h-[0.1rem] rounded-xl h-1'/>
                {projectList &&
                    projectList.map((exp, index) => {
                        return (
                            <BgLister key={index} title={exp.company_name} role={exp.job_title} index={index} link={exp.company_link} isLarge={false} setModal={() => {}}/>
                        )
                    })}

                
            </ul>
            {/* <div id='modal-container' className='hidden h-[60vh] lg:block w-1/2 min-w-[40vw] sticky top-0 overflow-hidden mt-20'>
                <AnimatePresence mode='sync'>
                    <ModalPanel modal={currModal} experiences={projectList}/>
                </AnimatePresence>
            </div> */}
        </div>
        <ContactPage/>
    </section>
  )
}

export default Experience