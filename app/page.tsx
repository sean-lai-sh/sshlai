'use client';
import {HeroSection} from "@/components/landing";
import { useEffect } from "react";
import Lenis from "lenis";
import Stair from "@/components/animated/Stair";
import Experience from "@/components/landing/experience";


// components/Hero.tsx
export default function Hero() {
  useEffect(() => {
    const lenis = new Lenis();
  
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
    document.documentElement.classList.add('scroll-hidden') // 

    return () => {
      document.documentElement.classList.remove('scroll-hidden')
      lenis.destroy();
    };
  }, []);
  
  return (
    <main className="w-screen scroll-hidden">
      <Stair>
          <HeroSection/>
          {/* <Work /> */}
          <Experience/>
          {/* <HorizontalExpansion/>  */}
          {/* <Contact /> */}
      </Stair>  
    </main>
  );
}

