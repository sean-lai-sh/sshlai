'use client';
import Loader from "@/components/animated/loader";
import {HeroSection, RecentWork} from "@/components/landing";
import { useEffect } from "react";
import Lenis from "lenis";
import Contact from "@/components/landing/Contact";


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
      <RecentWork />
      <Contact />
    </main>
  );
}

