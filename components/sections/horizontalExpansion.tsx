'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalExpansion = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const horizontal = horizontalRef.current;
      if (!container || !horizontal) return;
       // pin the section during scroll
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=2000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      });

      // reveal panel 2
      gsap.to(".panel-2", {
        x: "0%",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1000",
          scrub: true,
        },
      });

      // reveal panel 3
      gsap.to(".panel-3", {
        x: "0%",
        scrollTrigger: {
          trigger: container,
          start: "+=1000",
          end: "+=2000",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black overflow-hidden">
      <div className="sticky top-0 h-screen w-screen flex items-center">
        <div
          ref={horizontalRef}
          className="horizontal-inner overflow-hidden flex w-[400vw] h-screen"
        >
          <div className="panel absolute w-screen h-screen top-0 left-0 bg-blue-400  flex items-center justify-center text-white text-6xl">
            <div className='content w-screen h-screen  flex items-center justify-center text-white text-6xl'>
              Color 1
            </div>
          </div>
          <div style={{transform: "translate3D(80%,0,0 )"}}className="panel-2 absolute w-screen h-screen top-0  bg-white  flex items-center justify-center text-white text-6xl">
            <div className='content w-screen h-screen bg-red-500 flex items-center justify-center text-white text-6xl'>
              Color 2
            </div>
          </div>
          <div  style={{transform: "translate3D(95%,0,0 )"}} className="panel-3 absolute w-screen h-screen top-0  bg-white  flex items-center justify-center text-white text-6xl">
            <div className='content w-screen h-screen bg-green-500 flex items-center justify-center text-white text-6xl'>
              Color 3
            </div> 
          </div>
          {/* <div className="panel absolute w-screen h-screen bg-red-300 flex items-center justify-center text-6xl">Panel 2</div>
          <div className="panel absolute w-screen h-screen bg-purple-300 flex items-center justify-center text-6xl">Panel 3</div>
          <div className="panel absolute w-screen h-screen bg-yellow-300 flex items-center justify-center text-6xl">Panel 4</div> */}
        </div>
      </div>
    </section>
  );
};

export default HorizontalExpansion;
