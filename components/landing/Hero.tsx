import React from 'react'
import MarqueeBanner from '../Navigation/marquee'
import { searching } from '@/lib/consts'
import { MaskText } from '../ui/inlinemask/inlineMask'
import { AsciiNoiseBackground } from './asciihero'
import AnimatedLink from '../ui/AnimatedLink'
// import Anim_Button from '../ui/animated_a'
const HeroSection = () => {
  return (
    <section className="min-h-screen w-full flex flex-col bg-vantablack scroll-hidden">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0 px-4 py-20 lg:py-0">
        <div className="flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[min(40vw,80vh)] max-lg:max-w-md overflow-hidden">
            <AsciiNoiseBackground className="absolute inset-0" />
          </div>
        </div>
        {LandingInformation()}
      </div>
      {searching && <MarqueeBanner />}
    </section>
  )
}

export default HeroSection

function LandingInformation() {
  return <div className="flex justify-center lg:justify-start">
    <div className="w-full max-w-md lg:pr-10 py-4 text-white space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          <MaskText
            phrases={["Sean Lai"]}
            style="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
            customDelay={0.7}
            duration={0.9}
          />
        </h1>

      </div>
      <p className="text-sm sm:text-base leading-7 text-beige">
        Incoming Winter Software Engineer Intern @ {' '}
        <AnimatedLink href="https://forus.com">
          Forus
        </AnimatedLink>{' '}
        – AI for Med Approval
        <br />
        <br />
        Fellow @ {' '}
        <AnimatedLink href="https://x.ai">
          SpaceXAI
        </AnimatedLink>
        <br />
        <br />
        Previously:
        <br />
        AI @ {' '}
        <AnimatedLink href="https://www.geaerospace.com/">
          GE Aerospace
        </AnimatedLink>
        <br />
        Data @ {' '}
        <AnimatedLink href="https://www.boostb2b.com">
          Boost Payment Solutions
        </AnimatedLink>
        <br />
        Youngest Fellow @ {' '}
        <AnimatedLink href="https://manus.im">
          Manus AI
        </AnimatedLink>
        <br />
        Program Lead @ {' '}
        <AnimatedLink href="https://vip.hsrn.nyu.edu">
          NYU HSRN
        </AnimatedLink>
        <br />
        President @ {' '}
        <AnimatedLink href="https://www.techatnyu.org">
          Tech@NYU
        </AnimatedLink>
        <br />
        <br />
        Worked On:
        <br />
        VLA evals, data infra, and research systems
        <br />
        <br />
        Sidequest(s):
        <br />Events for VCs & Founders, and touching grass
      </p>
    </div>
  </div>
}
