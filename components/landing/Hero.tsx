import React from 'react'
import MarqueeBanner from '../Navigation/marquee'
import { searching } from '@/lib/consts'
import { MaskText } from '../ui/inlinemask/inlineMask'
import { AsciiNoiseBackground } from './asciihero'
import Anim_Button from '../ui/animated_a'
import TextMask from '../ui/inlinemask/inlineCompmask'
const HeroSection = () => {
  return (
    <section className="min-h-[50vh] lg:min-h-[80vh] w-full text-black flex flex-col justify-center md:px-6 bg-transparent scroll-hidden">
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
    <div className="w-full max-w-full md:w-fit p-2 py-4 sm:p-4 lg:p-10 text-white lg:bg-transparent lg:backdrop-blur-sm space-y-4">
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
          <TextMask
            phrases={["Building Smarter Research Infra & Data Tools", "Trekking into the complexities of our world one data point at a time"]}
            className="text-sm sm:text-base md:text-lg text-beige"
            customDelay={0.7}
            duration={0.9}
          />
        </div>
      </div>
          <Anim_Button content="Resume" href="/Sean%20Lai%20Resume.pdf" funcAct={() => {}} style='mt-5 min-w-10 max-w-[10rem]'/>
      </div>
    <div className="lg:bg-transparent lg:backdrop-blur-md p-2 py-4 sm:p-4 lg:p-10 w-full max-w-full md:w-1/2 h-full flex items-center justify-start md:items-start md:justify-start text-xs sm:text-base lg:text-base lg:leading-7 text-beige overflow-x-hidden">
      <TextMask
        phrases={[
          <>
            Building data infra at{' '}
            <a
              href="https://www.boostb2b.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline transition-colors"
            >
              Boost Payment Solutions
            </a>.
          </>,
          <>
            VP @{' '}
            <a
              href="https://www.techatnyu.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline transition-colors"
            >
              Tech@NYU
            </a>{' '}
            – run hiring hackathons and curated tech events.
          </>,
          <>
            Research Eng Lead @{' '}
            <a
              href="https://vip.hsrn.nyu.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline transition-colors"
            >
              NYU HSRN Lab
            </a>{' '}
            – building low latency research workflows.
          </>,
          <>
            Prev: VLM Research @{' '}
            <a
              href="https://ai4ce.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline transition-colors"
            >
              NYU AI4CE Lab
            </a>{' '}
            & Research Assistant @{' '}
            <a
              href="https://engineering.nyu.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline transition-colors"
            >
              NYU Sustainablity Intiative
            </a>.
          </>,
        ]}
        className="p-2 text-left leading-relaxed"
        newLine
      />

    </div>
  </div>
}
