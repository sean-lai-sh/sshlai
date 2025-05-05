import React from 'react'
import MarqueeBanner from '../Navigation/marquee'
import { searching } from '@/lib/consts'

const HeroSection = () => {
  return (
    <section className="h-[90vh] w-full text-black flex flex-col justify-center items-center px-6 bg-beige scroll-hidden">
        <h1 className="text-4xl md:text-6xl lg:text-9xl font-bold tracking-tight">
          Sean Lai
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-xl lg:max-w-5xl text-charcoal text-center">
          Full Stack Engineer & Researcher Building Systems Where Code Meets Cognition.
        </p>
        <a
          href="/projects"
          className="mt-8 px-6 py-3 border text-charcoal-light hover:bg-charcoal hover:text-beige hover:border-charcoal-light hover:shadow-lg shadow-accent hover:shadow-charcoal-darker transition-all duration-300 rounded-lg"
        >
          View My Work
        </a>
        {searching && <MarqueeBanner />}
    </section>
  )
}

export default HeroSection