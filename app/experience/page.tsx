
'use client'
import Stair from '@/components/animated/Stair'
import Event from '@/components/sections/ExpHeader'
import React, { useEffect } from 'react'
import Skill from '@/components/sections/Skill'
import Lenis from 'lenis'
import Experiences from '@/components/sections/Experiences'

const Page = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // document.documentElement.classList.add('scroll-hidden') // 
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0);
    });
    return () => {
      // document.documentElement.classList.remove('scroll-hidden')
      lenis.destroy();
    };
  }, []);
  return (
    <main className='bg-beige w-screen'>
      <Stair>
        <Event/>
        <Skill/>
        <Experiences/>
      </Stair>
    </main>
  )
}

export default Page