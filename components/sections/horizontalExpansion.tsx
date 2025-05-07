'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import HorizontalExpand from './horizontalExpand';
import Image from 'next/image';
import styles from './style.module.scss';
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
        "(min-width: 1068px)":() => {
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
          tl.add("initial", 0)
          //tl.to(".content", { x: "100%", duration: 0.9}, "initial");
          tl.fromTo(".panel-2", {x:"80%"},{ x: "0%", duration: 1}, "initial");
          tl.fromTo(".panel-3", { x: "95%" }, { x: "80%", duration:1}, "initial");
          tl.fromTo(".panel-4", { x: "100%" }, { x: "95%", duration:1}, "initial");
          tl.fromTo(".image-panel", { x: "100%" }, { x: "-25%", scale: 0.25, top:"20%", duration: 1}, "initial");
          tl.fromTo(".image-panel-2", { x: "-225%", scale:0.7 }, { x: "100%", scale:1, duration: 1}, "initial");
          tl.fromTo(".image-panel-3", { x: "-270%", scale:0.3 }, { x: "-225%", scale:0.7, duration: 1}, "initial");
          tl.fromTo(".content-2", { x: "-80%", clipPath: "inset(0 0 0 80%)"}, { x: "0%", clipPath: "inset(0 0 0 0%)", duration: 1}, "initial");
          tl.add("first_overlay", 1)
          tl.fromTo(".panel-3", {x:"80%"},{ x: "0%", duration: 1}, "first_overlay");
          tl.fromTo(".panel-4", { x: "95%" }, { x: "80%", duration:1}, "first_overlay");
          tl.fromTo(".panel-5", { x: "100%" }, { x: "95%", duration:1}, "first_overlay");
          tl.fromTo(".image-panel-2", { x: "100%" }, { x: "-25%", scale: 0.25, top:"20%", duration: 1}, "first_overlay");
          tl.fromTo(".image-panel-3", { x: "-225%", scale:0.7 }, { x: "100%", scale:1, duration: 1}, "first_overlay");
          tl.fromTo(".image-panel-4", { x: "-270%", scale:0.3 }, { x: "-225%", scale:0.7, duration: 1}, "first_overlay");
          tl.fromTo(".content-3", { x: "-80%", clipPath: "inset(0 0 0 80%)"}, { x: "0%", clipPath: "inset(0 0 0 0%)", duration: 1}, "first_overlay");
          tl.add("second_overlay", 2)
          tl.fromTo(".panel-4", {x:"80%"},{ x: "0%", duration: 1}, "second_overlay");
          tl.fromTo(".panel-5", { x: "95%" }, { x: "80%", duration:1}, "second_overlay");
          tl.fromTo(".image-panel-3", { x: "100%" }, { x: "-25%", scale: 0.25, top:"20%", duration: 1}, "second_overlay");
          tl.fromTo(".image-panel-4", { x: "-225%", scale:0.7 }, { x: "100%", scale:1, duration: 1}, "second_overlay");
          tl.fromTo(".image-panel-5", { x: "-270%", scale:0.3 }, { x: "-225%", scale:0.7, duration: 1}, "second_overlay");
          tl.fromTo(".content-4", { x: "-80%", clipPath: "inset(0 0 0 80%)"}, { x: "0%", clipPath: "inset(0 0 0 0%)", duration: 1}, "second_overlay");
          tl.add("third", 3)
          tl.fromTo(".panel-5", {x:"80%"},{ x: "0%", duration: 1}, "third");
          tl.fromTo(".image-panel-4", { x: "100%" }, { x: "-25%", scale: 0.25, top:"20%", duration: 1}, "third");
          tl.fromTo(".image-panel-5", { x: "-225%", scale:0.7 }, { x: "100%", scale:1, duration: 1}, "third");
          tl.fromTo(".content-5", { x: "-80%", clipPath: "inset(0 0 0 80%)"}, { x: "0%", clipPath: "inset(0 0 0 0%)", duration: 1}, "third");
          tl.add("forth", 4)
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
          className="horizontal-inner lg:flex block lg:w-[400vw] w-screen min-h-[500vh] gap-0 "
        >
          <div className='absolute w-screen h-screen top-0 left-0 hidden lg:block'>
            <div className=' w-full pl-[16rem] pt-[15svh] relative z-[5]'>
              <h1 className='title text-[5vw] leading-relaxed text-charcoal-darker '>
                Events Hosted
              </h1>
            </div>
          </div>
          <div className="panel bg-[#c44541] w-screen h-screen sticky top-0 flex flex-col-reverse items-center justify-center text-white text-6xl lg:absolute lg:left-0 ">
            <div className='content lg:top-[15vh] lg:left-0 lg:pt-[15vh] lg:px-[16rem] py-[1rem] md:px-[5rem] lg:gap-13 lg:w-full w-[75%] h-full lg:fixed flex flex-col lg:items-start lg:justify-start justify-start items-start text-white text-6xl text-start'
            style={{ transform: "none" }}>
              <span className='lg:hidden text-lg left-4 absolute top-5 font-semibold text-charcoal-darker'>
                01
              </span>
              <h1 className='lg:text-[2vw] text-3xl lg:mt-[5rem] leading-relaxed text-charcoal-darker w-full'>HOF Hacks</h1>
              <h2 className='lg:text-[1.25vw] text-lg mt-[1.5rem] lg:mt-[3rem] leading-relaxed text-charcoal-darker  w-full'>
                1 Month to Host. 230+ RSVPs.<br/> 
                Vercel, Figma, & HOF Capital. <br/>
                Tons of Saratoga Water.
              </h2>
              <div className='w-fit border-[3px] rounded-full bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
                <a>View Event</a>
              </div>
            </div>
            <div className={`image-panel origin-bottom-right flex items-end w-[50%] pt-[2rem] min-h-[300px] relative lg:block lg:static lg:w-[20vw] lg:min-h-[90vh] lg:pt-[10vh]`}>
              <Image
              src={"/hofhack.png"}
              alt={"panel_image"}
              fill 
              className='object-contain'
              />
            </div>
          </div>
          <div className="panel-2 bg-offwhite w-screen h-screen sticky top-0 flex flex-col-reverse items-center justify-center text-white text-6xl lg:absolute lg:left-0 ">
            <div className='content-2 lg:top-[15vh] lg:left-0 lg:pt-[15vh] lg:px-[16rem] py-[1rem] md:px-[5rem] lg:gap-13 lg:w-full w-[75%] h-full lg:fixed flex flex-col lg:items-start lg:justify-start justify-start items-start text-white text-6xl text-start'
            style={{ transform: "none" }}>
              <span className='lg:hidden text-lg left-4 absolute top-5 font-semibold text-charcoal-darker'>
                02
              </span>
              <h1 className='lg:text-[2vw] text-3xl lg:mt-[5rem] leading-relaxed text-charcoal-darker w-full'>Startup Week 2025</h1>
              <h2 className='lg:text-[1.25vw] text-lg mt-[1.5rem] lg:mt-[3rem] leading-relaxed text-charcoal-darker'>
                  New Events, Energy, and Team<br/> 
                  Anthropic, Adobe, ZFellows, & Google Ventures <br/>
                  A better week for student entrepreneurs.
              </h2>
              <div className='w-fit border-[3px] rounded-full bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
                <a>View Event</a>
              </div>
            </div>
            <div className={`image-panel-2 origin-bottom-right flex items-end w-[50%] pt-[2rem] min-h-[300px] relative lg:block lg:static lg:w-[20vw] lg:min-h-[90vh] lg:pt-[10vh]`}>
              <Image
              src={"/sw2025.png"}
              alt={"panel_image"}
              fill 
              className='object-contain'
              />
            </div>
          </div>
          <div className="panel-3 bg-white w-screen h-screen sticky top-0 flex flex-col-reverse items-center justify-center text-white text-6xl lg:absolute">
            <div className='content-3 lg:top-[15vh] lg:left-0 lg:pt-[15vh] lg:px-[16rem] py-[1rem] md:px-[5rem] lg:gap-13 lg:w-full w-[75%] h-full lg:fixed flex flex-col lg:items-start lg:justify-start justify-start items-start text-white text-6xl text-start'
              >
                <span className='lg:hidden text-lg left-4 absolute top-5 font-semibold text-charcoal-darker'>
                03
                </span>
                <h1 className='lg:text-[2vw] text-3xl lg:mt-[5rem] leading-relaxed text-charcoal-darker'>Startup Week Buildathon</h1>
                <h2 className='lg:text-[1.25vw] text-lg mt-[1.5rem] lg:mt-[3rem] leading-relaxed text-charcoal-darker'>
                  Inaugural Hiring Hackathon. 36Hrs, 10K Prize Pool<br/> 
                  Hosted in under 4 months. 220 RSVPs and 10 final round offers <br/>
                  <span className='lg:inline-block hidden'>Hosted at Verci @ NYC</span>
                </h2>
                <div className='w-fit border-[3px] rounded-full border-gray-600 bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
                  <a>Learn the Story</a>
                </div>
                
            </div>
            <div className={`origin-bottom-right flex items-end image-panel-3 w-[50%] min-h-[330px] relative lg:block lg:static lg:w-[20vw] lg:min-h-[90vh] lg:pt-[10vh] ${styles.responsive_shift}`}>
              <Image
              src={"/swbuildathon.png"}
              alt={"panel_image"}
              fill 
              className='object-contain'
              />
            </div>
          </div>
          <div className="panel-4 bg-[#C2DAFF] w-screen h-screen sticky top-0 flex flex-col-reverse items-center justify-center text-white text-6xl lg:absolute">
            <div className='content-4 lg:top-[15vh] lg:left-0 lg:pt-[15vh] lg:px-[16rem] py-[1rem] md:px-[5rem] lg:gap-13 lg:w-full w-[75%] h-full lg:fixed flex flex-col lg:items-start lg:justify-start justify-start items-start text-white text-6xl text-start'
              >
                <span className='lg:hidden text-lg left-4 absolute top-5 font-semibold text-black'>
                04
                </span>
                <h1 className='lg:text-[2vw] text-3xl lg:mt-[5rem] leading-relaxed text-charcoal-darker w-full'>Mentor & Meet</h1>
                <h2 className='text-[1.25vw] mt-[3rem] leading-relaxed text-charcoal-darker '>
                  10 Mentors, Founders and Operators from Series A - C<br/> 
                  1:4 Student Ratio. 1 night of networking<br/>
                  In collaboration with Supermomos
                </h2>
                <div className='w-fit border-[3px] rounded-full bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
                  <a>Visit Event</a>
                </div>
                
            </div>
            <div className={`image-panel-4 origin-bottom-right flex items-end  w-[50%] min-h-[330px] relative lg:block lg:static lg:w-[20vw] lg:min-h-[90vh] lg:pt-[10vh] ${styles.responsive_shift}`}>
              <Image
              src={"/mnm.png"}
              alt={"panel_image"}
              fill 
              className='object-contain'
              />
            </div>
          </div>
          <div className="panel-5 bg-offwhite w-screen h-screen sticky top-0 flex flex-col-reverse items-center justify-center text-white text-6xl lg:absolute">
            <div className='content-5 lg:top-[15vh] lg:left-0 lg:pt-[15vh] lg:px-[16rem] py-[1rem] md:px-[5rem] lg:gap-13 lg:w-full w-[75%] h-full lg:fixed flex flex-col lg:items-start lg:justify-start justify-start items-start text-white text-6xl text-start'
               >
                  <span className='lg:hidden text-lg left-4 absolute top-5 font-semibold text-offwhite'>
                  05
                  </span>
                  <h1 className='lg:text-[2vw] text-3xl lg:mt-[5rem] leading-relaxed text-charcoal-darker w-full'>Startup Week 2024</h1>
                  <h2 className='text-[1.25vw] mt-[3rem] leading-relaxed text-charcoal-darker '>
                    1 Week, Over 40 founders, & YC<br/> 
                    Students hungry for a chance<br/>
                    My first big event at NYU.
                  </h2>
                  <div className='w-fit border-[3px] rounded-full bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
                    <a>Visit Event</a>
                  </div>
                  
              </div>
              <div className={`image-panel-5 origin-bottom-right flex items-end  w-[50%] min-h-[330px] relative lg:block lg:static lg:w-[20vw] lg:min-h-[90vh] lg:pt-[10vh] ${styles.responsive_shift}`}>
              <Image
              src={"/mnm.png"}
              alt={"panel_image"}
              fill 
              className='object-contain'
              />
            </div>
          </div> 
          {/* <div  style={{transform: "translate3D(100%,0,0 )"}} className="panel-3 absolute w-screen h-screen top-0 bg-white  flex items-center justify-center text-white text-6xl">
            <div className='content w-screen h-screen bg-green-500 flex items-center justify-center text-white text-6xl'>
              Color 3
            </div> 
          </div> */}
          {/* <div className="panel absolute w-screen h-screen bg-red-300 flex items-center justify-center text-6xl">Panel 2</div>
          <div className="panel absolute w-screen h-screen bg-purple-300 flex items-center justify-center text-6xl">Panel 3</div>
          <div className="panel absolute w-screen h-screen bg-yellow-300 flex items-center justify-center text-6xl">Panel 4</div> */}
        </div>
    </section>
  );
};

export default HorizontalExpansion;
