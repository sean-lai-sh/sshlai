'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { workExpDetails } from '@/lib/types'
import { workExp } from '@/lib/consts'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import Link from 'next/link'
gsap.registerPlugin(ScrollTrigger)

const VertSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const panelsRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    // Clean up function to kill any ScrollTriggers when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  useEffect(() => {
    const container = panelsRef.current
    if (!container) return
    
    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${(workExp.length - 1) * 1000}`, 
            scrub: 1,
            pin: ".panels-container",
            anticipatePin: 1,
            // markers: true, // For debugging
          }
        })
        animatePanels({
          panelPrefix: 'panel',
          contentPrefix: 'content',
          panelCount: workExp.length,
          timeline: tl,
          duration: 1
        })
        return () => {
          // Cleanup this specific instance
          tl.kill()
        }
      }
    })
  }, [])
  
  return (
    <section ref={containerRef} className="w-full relative ">      
      {/* Panels container is pinned */}
      <div ref={panelsRef} className="panels-container w-screen h-screen ">
          {
            workExp.map((item, index) => (
              <ExpSection
                key={index}
                data={item}
                styles={item.img_tag}
                index={index}
              />
            ))
          }
      </div>
    </section>
  );
}

export default VertSection


// To be defined: Styles should be defining the BG, and the text color, I will be maintaining a largely universal design aesthetic, so the only thing that will change is the background color and the text color.
const ExpSection = ({data, styles, index}: {data: workExpDetails, styles:string, index:number}) => {
  return (
    <div
      className={`panel panel-${index} ${styles} w-screen h-screen sticky top-0 lg:absolute  lg:left-0 flex items-center justify-center text-4xl font-bold lg:shadow-[0_-10px_10px_rgba(${data.shadowColor ? data.shadowColor : '0,0,0'},0.4)] backdrop-blur-md'`}
    >
      <div className={`content content-${index} w-full h-full flex lg:fixed lg:top-0 lg:left-0`}>
        <div  className='w-[35vw] h-full flex items-center justify-center'>
            <div className='h-[60vh] w-full pl-[10%]'>
              <div className='mt-[5vh] h-[20vh] flex items-center'>
                <h1 className='text-[2.5vw] font-semibold text-left leading-relaxed'>
                  {data.job_title}
                </h1>
              </div>
              <div className=''>
                <Link href={data.company_link} target='_blank' rel='noopener noreferrer'>
                  <h1 className='w-fit  leading-relaxed text-2xl font-light text-left underline-offset-[5px] underline decoration-2 decoration-offwhite/50 hover:decoration-offwhite/100 transition-all duration-300 ease-in-out'>
                    {data.company_name}
                  </h1>
                </Link>
                <h1 className='text-lg font-light text-left mt-[1vh]'>
                  {data.duration}
                </h1>
              </div>
            </div>
        </div>
        <div className='w-[25vw] h-full flex items-center justify-center'>
          <div className='w-[25vw] h-[25vw] relative mt-[10vh]'>
            <Image
            src={data.logo_img_src}
            alt={data.company_name}
            fill
            className='object-contain object-center'
            />
          </div>
          
        </div>
        <div className='w-[40vw] h-full flex items-center justify-center'>
          <div className='w-[95%] flex items-center justify-center flex-col'>
            <h2 className='text-base lg:text-lg font-normal text-left w-full h-[10vh] mt-[15vh]'>
              {data.description}
            </h2>
            <Separator className={`w-full h-[2px] ${data.bp_style ? data.bp_style : 'bg-black'} rounded-full my-5`}/>
            <ul className='w-full h-[20vh]'>
              {data.achievements.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 mb-3 text-base lg:text-lg font-light"
                >
                  <span className={`mt-[10px] w-2 h-2 ${data.bp_style ? data.bp_style : 'bg-black'} shrink-0`}></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Separator className={`w-full h-[2px] ${data.bp_style ? data.bp_style : 'bg-black'} rounded-full my-5`}/>
            <ul className='w-full flex gap-3 '>
              {data.skills.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 mb-3 text-base lg:text-lg font-extralight"
                >
                  <span className={`mt-[10px] w-2 h-2 rounded-2xl ${data.bp_style ? data.bp_style : 'bg-black'} shrink-0`}></span>                    
                  <span>{item}</span>
                  
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

}


function animatePanels({ panelPrefix, contentPrefix, panelCount, timeline, duration = 1 } : {
  panelPrefix: string;
  contentPrefix: string;
  panelCount: number;
  timeline: gsap.core.Timeline;
  duration?: number;
}) {
  // First set all panels offscreen
  for (let i = 1; i <= panelCount; i++) {
    gsap.set(`.${panelPrefix}-${i}`, { y: '100%' });
  }

  for (let i = 1; i <= panelCount; i++) {
    const stepLabel = `step-${i}`;
    timeline.add(stepLabel, (i - 1) * duration);

    timeline.fromTo(
      `.${panelPrefix}-${i}`,
      { y: '100%', opacity: 1 },
      { y: '0%', duration },
      stepLabel
    );

    timeline.fromTo(
      `.${contentPrefix}-${i}`,
      { y: '-100%', clipPath: 'inset(100% 0 0% 0)' },
      { y: '0%', clipPath: 'inset(0% 0% 0% 0)', duration },
      stepLabel
    );
  }
}
