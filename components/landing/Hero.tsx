import React from 'react'
import MarqueeBanner from '../Navigation/marquee'
import { searching } from '@/lib/consts'
import { MaskText } from '../ui/inlinemask/inlineMask'
import { AsciiNoiseBackground } from './asciihero'
import AnimatedLink from '../ui/AnimatedLink'
// import Anim_Button from '../ui/animated_a'
const HeroSection = () => {
  return (
    <section className="min-h-[50vh] lg:min-h-[80vh] w-full text-black flex flex-col justify-center lg:px-6 bg-transparent scroll-hidden">
      <AsciiNoiseBackground />
      {LandingInformation()}
      {/* <ReachOut /> */}
        {searching && <MarqueeBanner />}
    </section>
  )
}

export default HeroSection

function LandingInformation() {
  return <div className="flex lg:flex-row flex-col lg:justify-between bg-charcoal/80 lg:bg-transparent #backdrop-blur-sm lg:backdrop-blur-none mt-[15rem] md:mt-[10rem] lg:mt-0">
    <div className="w-full min-w-[40vw] max-w-full md:w-fit p-2 py-4 sm:p-4 lg:p-10 text-white lg:bg-transparent lg:backdrop-blur-sm space-y-4">
      <div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          <MaskText
            phrases={["Sean Lai"]}
            style="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            customDelay={0.7}
            duration={0.9}
          />
        </h1>

        <div className="mt-2 text-left text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md md:max-w-xl text-beige">
          <MaskText
            phrases={["Generating Entropy, Designing Systems"]}
            style="text-sm sm:text-base md:text-lg text-beige"
            customDelay={0.7}
            duration={0.9}
          />
        </div>
      </div>
          {/* <Anim_Button content="Resume" href="/Sean%20Lai%20Resume.pdf" funcAct={() => {}} style='mt-5 min-w-10 max-w-[10rem]'/> */}
    </div>
    <div className="lg:bg-transparent lg:backdrop-blur-sm p-2 py-4 sm:p-4 lg:p-10 w-full max-w-full md:w-1/2 h-full flex items-center justify-start md:items-start md:justify-start text-xs sm:text-base lg:text-base lg:leading-7 text-beige overflow-x-hidden">
      <p>
        Youngest Fellow @ {' '}
        <AnimatedLink href="https://manus.im">
          Manus AI
        </AnimatedLink>{' '}
        – Helped w API DevX & Community
        <br />
        <br />
        President @{' '}
        <AnimatedLink href="https://www.techatnyu.org">
          Tech@NYU
        </AnimatedLink>{' '}
        – the largest tech club @ NYU for builders & hackers.
        <br />
        <br />
        Program Lead @{' '}
        <AnimatedLink href="https://vip.hsrn.nyu.edu">
          NYU HSRN Lab
        </AnimatedLink>{' '}
        – building low latency research workflows. 
        <br />
        <br />
        <span className="">Previously:</span>
        <br />
        - Data Infra @{' '}
        <AnimatedLink href="https://www.boostb2b.com">
          Boost Payment Solutions
        </AnimatedLink>
        <br /> - VLA Research @{' '}
        <AnimatedLink href="https://ai4ce.github.io/">
          NYU AI4CE Lab
        </AnimatedLink>
        <br /> - Research Assistant @{' '}
        <AnimatedLink href="https://engineering.nyu.edu/">
          NYU Sustainability Initiative
        </AnimatedLink>
        .
        <br />
        <br />
        Sidequest(s):
        <br />Events for VCs & Founders, and more recently <AnimatedLink href="/angels">Angel Investing</AnimatedLink>
      </p>
        

    </div>
  </div>
}
