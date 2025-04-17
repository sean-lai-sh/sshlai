'use client'
import { useEffect, useRef } from "react";
import StackingCard from "../ui/StackingCard";
import Lenis from "lenis";
import { expConsts } from "@/lib/consts";
import { useScroll } from "motion/react";
export default function StackedExperience() {
    
    useEffect( () => {

        const lenis = new Lenis()  
        function raf(time: number) {   
          lenis.raf(time)   
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    
      })
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
  
      target: container,
  
      offset: ['start start', 'end end']
  
    })
    return (
        
      <section className="pt-[20vh] pb-[30vh] md:pb-[20vh] lg:pb-[10vh] block bg-offwhite ">
        <h1 className="md:text-7xl text-5xl text-charcoal font-bold text-center">Work Experience</h1>
        {
            expConsts.map( (exp, index) => {
                const targetScale = 1- ( (expConsts.length - index) * 0.05)
                return (
                    <StackingCard
                        key={`exp-${index}`} // Unique key for each experience
                        cardDetail={exp}
                        targetScale  ={targetScale}
                        progress={scrollYProgress}
                        range={[index * .25, 1]}
                    />
                )
            })
        }
      </section>
    );
  }
  