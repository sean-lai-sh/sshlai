'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import HorizontalExpand from './horizontalExpand';
import Image from 'next/image';
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
          tl.to(".panel-2", { x: "0%", duration: 1}, "initial");
          tl.fromTo(".image-panel", { x: "100%" }, { x: "-25%", scale: 0.25, top:"20%", duration: 1}, "initial");
          tl.fromTo(".image-panel-2", { x: "-225%", scale:0.7 }, { x: "100%", scale:1, duration: 1}, "initial");
          tl.fromTo(".image-panel-3", { x: "-270%", scale:0.3 }, { x: "-225%", scale:0.7, duration: 1}, "initial");
          tl.to(".content-2", { x: "0%", clipPath: "inset(0 0 0 0%)", duration: 1}, "initial");
          tl.fromTo(".panel-3", { x: "95%" }, { x: "80%", duration:1}, "initial");
          tl.fromTo(".panel-4", { x: "100%" }, { x: "95%", duration:1}, "initial");
          tl.add("first_overlay", 1)
          tl.to(".panel-3", { x: "0%", duration: 1}, "first_overlay");
          tl.fromTo(".image-panel-2", { x: "100%" }, { x: "-25%", scale: 0.25, top:"20%", duration: 1}, "first_overlay");
          tl.fromTo(".image-panel-3", { x: "-225%", scale:0.7 }, { x: "100%", scale:1, duration: 1}, "first_overlay");
          tl.fromTo(".image-panel-4", { x: "-270%", scale:0.3 }, { x: "-225%", scale:0.7, duration: 1}, "first_overlay");
          tl.to(".content-3", { x: "0%", clipPath: "inset(0 0 0 0%)", duration: 1}, "first_overlay");
          tl.fromTo(".panel-4", { x: "95%" }, { x: "80%", duration:1}, "first_overlay");
          tl.fromTo(".panel-5", { x: "100%" }, { x: "95%", duration:1}, "first_overlay");
          tl.add("second_overlay", 2)
          tl.fromTo(".image-panel-3", { x: "100%" }, { x: "-25%", scale: 0.25, top:"20%", duration: 1}, "second_overlay");
          tl.fromTo(".image-panel-4", { x: "-225%", scale:0.7 }, { x: "100%", scale:1, duration: 1}, "second_overlay");
          tl.fromTo(".image-panel-5", { x: "-270%", scale:0.3 }, { x: "-225%", scale:0.7, duration: 1}, "second_overlay");
          tl.to(".content-4", { x: "0%", clipPath: "inset(0 0 0 0%)", duration: 1}, "second_overlay");
          tl.to(".panel-4", { x: "0%", duration: 1}, "second_overlay");
          tl.fromTo(".panel-5", { x: "95%" }, { x: "80%", duration:1}, "second_overlay");
          tl.add("third", 3)
          tl.to(".panel-5", { x: "0%", duration: 1}, "third");
          tl.fromTo(".image-panel-4", { x: "100%" }, { x: "-25%", scale: 0.25, top:"20%", duration: 1}, "third");
          tl.fromTo(".image-panel-5", { x: "-225%", scale:0.7 }, { x: "100%", scale:1, duration: 1}, "third");
          tl.to(".content-5", { x: "0%", clipPath: "inset(0 0 0 0%)", duration: 1}, "third");
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
    <section ref={containerRef} className="relative w-screen h-[400vh] bg-black overflow-hidden">
      <div className="sticky top-0 h-screen w-screen flex items-center">
        <div
          ref={horizontalRef}
          className="horizontal-inner overflow-hidden flex lg:flex-row flex-col h-[400vh] lg:w-[400vw] lg:h-screen"
        >
          <div className='absolute w-screen h-screen top-0 left-0  hidden lg:block'>
            <div className=' w-full pl-[16rem] pt-[15svh] relative z-[5]'>
              <h1 className='title text-[5vw] leading-relaxed text-charcoal-darker '>
                Events Hosted
              </h1>
            </div>
          </div>
          <div className="panel w-screen h-auto min-h-screen lg:h-screen bg-[#c44541] flex items-center justify-center text-white text-6xl lg:absolute top-0 left-0">
            <div className='content top-[15vh] left-0 pt-[15vh] px-[16rem] gap-13 w-full h-full lg:fixed relative flex flex-col items-start justify-start text-white text-6xl'
            style={{ transform: "none" }}>
              <span className='lg:hidden text-lg left-4 absolute top-3 font-semibold text-charcoal-darker'>
                01
              </span>
              <h1 className='text-[2vw] mt-[5rem] leading-relaxed text-charcoal-darker'>HOF Hacks</h1>
              <h2 className='text-[1.25vw] mt-[3rem] leading-relaxed text-charcoal-darker '>
                1 Month to Host. 230+ RSVPs.<br/> 
                Vercel, Figma, & HOF Capital. <br/>
                Tons of Saratoga Water.
              </h2>
              <div className='w-fit border-[3px] rounded-full bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
                <a>View Event</a>
              </div>
            </div>
            <div style={{transform: "translate3D(50%,0,0)"}} className=' origin-bottom-right image-panel w-[20vw] min-h-[90vh] pt-[10vh]  '>
              <Image
              src={"/hofhack.png"}
              alt={"panel_image"}
              fill 
              className='object-contain'
              />
            </div>
          </div>
          <div style={{ transform: "translate3D(80%,0,0 )"}} className="panel-2 border-l-2 border-r-black sticky lg:absolute w-screen h-screen top-0  bg-offwhite flex items-center justify-center text-white text-6xl">
            <div className='content-2 top-[15vh] left-0 pt-[15vh] px-[16rem] gap-13 w-full h-full fixed flex flex-col items-start justify-start text-white text-6xl'
              style={{ transform: "translate3D(-80%,0,0 )", 
                clipPath: "inset(0 0 0 80%)"}}>
                <span className='lg:hidden text-lg left-4 absolute top-3 font-semibold text-charcoal-darker'>
                02
                </span>
                <h1 className='text-[2vw] mt-[5rem] leading-relaxed text-charcoal-darker'>Startup Week 2025</h1>
                <h2 className='text-[1.25vw] mt-[3rem] leading-relaxed text-charcoal-darker '>
                  New Events, New Energy, New Team<br/> 
                  Anthropic, Adobe, ZFellows, & Google Ventures <br/>
                  A better week for student entrepreneurs.
                </h2>
                <div className='w-fit border-[3px] border-gray-500 rounded-full bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
                  <a>View The Week</a>
                </div>
                
            </div>
            <div className=' origin-bottom-right image-panel-2 w-[20vw] min-h-[90vh] pt-[10vh]'>
              <Image
              src={"/sw2025.png"}
              alt={"panel_image"}
              fill 
              className='object-contain'
              />
            </div>
          </div>
          <div  style={{transform: "translate3D(95%,0,0 )"}} className="panel-3 sticky lg:absolute w-screen h-screen top-0  bg-white  flex items-center justify-center text-white text-6xl">
            <div className='content-3 top-[15vh] left-0 pt-[15vh] px-[16rem] gap-13 w-full h-full fixed flex flex-col items-start justify-start text-white text-6xl'
              style={{ transform: "translate3D(-80%,0,0 )", 
                clipPath: "inset(0 0 0 80%)"}}>
                <span className='lg:hidden text-lg left-4 absolute top-3 font-semibold text-charcoal-darker'>
                02
                </span>
                <h1 className='text-[2vw] mt-[5rem] leading-relaxed text-charcoal-darker'>Startup Week Buildathon</h1>
                <h2 className='text-[1.25vw] mt-[3rem] leading-relaxed text-charcoal-darker '>
                  Inaugural Hiring Hackathon. 36Hrs, 10K Prize Pool<br/> 
                  Hosted in under 4 months. 220 RSVPs and 10 final round offers <br/>
                  Hosted at Verci @ NYC
                </h2>
                <div className='w-fit border-[3px] rounded-full border-gray-600 bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
                  <a>Learn the Story</a>
                </div>
                
            </div>
            <div  className=' origin-bottom-right image-panel-3 w-[20vw] min-h-[90vh] pt-[10vh]  '>
              <Image
              src={"/swbuildathon.png"}
              alt={"panel_image"}
              fill 
              className='object-contain'
              />
            </div>
          </div>
          <div  style={{transform: "translate3D(100%,0,0 )"}} className="panel-4 sticky lg:absolute w-screen h-screen top-0  bg-[#C2DAFF]  flex items-center justify-center text-white text-6xl">
            <div className='content-4 top-[15vh] left-0 pt-[15vh] px-[16rem] gap-13 w-full h-full fixed flex flex-col items-start justify-start text-white text-6xl'
              style={{ transform: "translate3D(-80%,0,0 )", 
                clipPath: "inset(0 0 0 80%)"}}>
                <span className='lg:hidden text-lg left-4 absolute top-3 font-semibold text-offwhite'>
                02
                </span>
                <h1 className='text-[2vw] mt-[5rem] leading-relaxed text-charcoal-darker'>Mentor & Meet</h1>
                <h2 className='text-[1.25vw] mt-[3rem] leading-relaxed text-charcoal-darker '>
                  10 Mentors, Founders and Operators from Series A - C<br/> 
                  1:4 Student Ratio. 1 night of networking<br/>
                  In collaboration with Supermomos
                </h2>
                <div className='w-fit border-[3px] rounded-full bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
                  <a>Visit Event</a>
                </div>
                
            </div>
            <div  className=' origin-bottom-right image-panel-4 w-[20vw] min-h-[90vh] pt-[10vh]  '>
              <Image
              src={"/mnm.png"}
              alt={"panel_image"}
              fill 
              className='object-contain'
              />
            </div>
          </div>
          <div  style={{transform: "translate3D(100%,0,0 )"}} className="panel-5 sticky lg:absolute w-screen h-screen top-0 bg-offwhite  flex items-center justify-center text-white text-6xl">
            <div className='content-5 top-[15vh] left-0 pt-[15vh] px-[16rem] gap-13 w-full h-full fixed flex flex-col items-start justify-start text-white text-6xl'
                style={{ transform: "translate3D(-80%,0,0 )", 
                  clipPath: "inset(0 0 0 80%)"}}>
                  <span className='lg:hidden text-lg left-4 absolute top-3 font-semibold text-offwhite'>
                  02
                  </span>
                  <h1 className='text-[2vw] mt-[5rem] leading-relaxed text-charcoal-darker'>Startup Week 2024</h1>
                  <h2 className='text-[1.25vw] mt-[3rem] leading-relaxed text-charcoal-darker '>
                    1 Week, Over 40 founders, & YC<br/> 
                    My first event hosted at the college level<br/>
                    A stepping stone for my future events
                  </h2>
                  <div className='w-fit border-[3px] rounded-full bg-black text-center h-fit p-3 mt-3 px-6 text-xl cursor-pointer'>
                    <a>Visit Event</a>
                  </div>
                  
              </div>
              <div  className=' origin-bottom-right image-panel-5 w-[20vw] min-h-[90vh] pt-[10vh]  '>
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
      </div>
    </section>
  );
};

export default HorizontalExpansion;
