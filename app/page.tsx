'use client';
import {HeroSection} from "@/components/landing";
import { useEffect } from "react";
import Lenis from "lenis";
import Contact from "@/components/landing/Contact";
import Work from "@/components/landing/Work";


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
    <main className="w-full scroll-hidden overflow-y-scroll z-0">
      <HeroSection/>
      <Work />
      <Contact />
    </main>
  );
}

