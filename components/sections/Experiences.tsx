'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Image from 'next/image';
import { PanelData } from '@/lib/types';
import { commPanel } from '@/lib/consts';
gsap.registerPlugin(ScrollTrigger);

const HorizontalExpansion = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const horizontal = horizontalRef.current;
      if (!container || !horizontal) return;
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)":() => {
          const tl = gsap.timeline({
            defaults: { ease: "sine.inOut" },
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=5000",
              scrub: true,
              
              pin: true,
              anticipatePin: 1,
              
            }
          });
          
          createPanelAnimation(tl, commPanel.length);
          
        }
      });

    });
    const lenis = new Lenis()
    const raf = (time : number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-screen bg-black">
        <div
          ref={horizontalRef}
          className="horizontal-inner overflow-visible lg:flex block lg:w-[400vw] w-screen min-h-[500vh] lg:min-h-[100vh] gap-0 "
        >
          <div className='absolute w-screen h-screen top-0 left-0 hidden lg:block'>
            <div className=' w-full pl-[16rem] pt-[15svh] relative z-[5]'>
              <h1 className='title text-[5vw] leading-relaxed text-charcoal-darker '>
                Events Hosted
              </h1>
            </div>
          </div>
          {
            commPanel.map((data, index) => {
              return (
                <Panel key={index} data={data} />
              )
            })
          }
        </div>
        {/* <motion.div style={{height}} className={`relative mt-[100px]`}>
            <div className={`
                absolute
                z-[1]
                h-[1550%]
                w-[120%]
                left-[-10%]
                rounded-b-[50%]
                bg-darker
                shadow-darker/40
                shadow-[0px_50px_40px_rgba(0,0,0,0.748)]
                overflow-clip
            `}></div>
        </motion.div> */}
    </section>
  );
};

export default HorizontalExpansion;

function createPanelAnimation(tl: gsap.core.Timeline , numberOfPanels: number) {
  // Validate input
  if (!tl || numberOfPanels < 2) {
    console.error("Invalid timeline or insufficient panels");
    return;
  }

  // For each transition step (number of panels - 1)
  for (let step = 1; step < numberOfPanels-1; step++) {
        const marker = `panel-${step}`;
        tl.add(marker, step);
        tl.fromTo(`panel-${step }`, {
            y:'100%'
        }, {
            y: "0%",
            duration: 1,
            
        }, marker)
        
        tl.fromTo(`content-${step}`,
            { y: "80%", clipPath: "inset(80% 0 0 0)" }, 
            { y: "0%", clipPath: "inset(0 0 0 0)", duration: 1 }, 
            marker
        )
  }

  // Add final marker after all transitions
  tl.add("final", numberOfPanels - 1);
}

const Panel: React.FC<{
  data: PanelData;
  }> = ({ data}) => (
  <div 
  style={ {backgroundColor: data.bgColor}}
    className={`panel-${data.id} w-screen h-screen sticky top-0 flex flex-col-reverse md:flex-row items-center justify-center text-white text-6xl lg:absolute lg:left-0`}
  >
    <div 
      className={`content-${data.id} lg:top-[15vh] lg:left-0 md:pt-[15vh] lg:px-[16rem] py-[1rem] md:px-[3rem] lg:gap-13 lg:w-full w-[75%] md:w-[60%] h-full lg:fixed flex flex-col lg:items-start lg:justify-start md:items-start md:justify-center justify-start items-start text-white text-6xl text-start`}
      style={{ transform: "none" }}
    >
      <span className='lg:hidden text-lg left-[4rem] absolute top-[5rem] font-semibold text-charcoal-darker'>
        {data.number}
      </span>
      <h1 className='lg:text-[3vw] md:text-5xl text-3xl lg:mt-[5rem] leading-relaxed text-charcoal-darker w-full'>
        {data.title}
      </h1>
      <h2 className='lg:text-[1.5vw] md:text-2xl text-lg mt-[1.5rem] lg:mt-[3rem] leading-relaxed text-charcoal-darker w-full'>
        {data.description.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h2>
      <div className='w-fit border-[3px] rounded-full bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
        <a href={data.ctaLink}>{data.ctaText}</a>
      </div>
    </div>
        <div 
      className={`
        image-panel-${data.id}
        origin-bottom-right
        flex items-center justify-center
        lg:justify-end lg:items-end
        w-[50%] pt-[2rem] min-h-[300px]
        relative h-full
        lg:block lg:static lg:w-[20vw]
        lg:min-h-[90vh] lg:pt-[30vh] lg:mx-0
        md:mx-[4rem] md:h-fit md:min-h-[400px]
        md:w-[40%]
      `}
    >
      <div className="md:shadow-lg md:shadow-charcoal-darker overflow-hidden h-fit ">
        <Image
          src={data.image}
          alt="panel_image"
          width={400}
          height={500}
          className="object-contain w-full h-auto"
        />
      </div>
    </div>
  </div>
);