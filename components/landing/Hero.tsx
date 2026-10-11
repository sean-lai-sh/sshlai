'use client'
import React from 'react'
import MarqueeBanner from '../Navigation/marquee'
import { searching } from '@/lib/consts'
import { MaskText } from '../ui/inlinemask/inlineMask'
import { AsciiCanvas } from './asciicanvas'
import { seaScene } from './asciisea'
import { topoScene } from './asciitopo'
import AnimatedLink from '../ui/AnimatedLink'
// import Anim_Button from '../ui/animated_a'
const scenes = {
  sea: { scene: seaScene, label: 'ASCII sea driven by Perlin noise' },
  topo: { scene: topoScene, label: 'ASCII topographic contours driven by Perlin noise' },
}

const HeroSection = () => {
  const [sceneKey, setSceneKey] = React.useState<keyof typeof scenes>('sea')
  React.useEffect(() => {
    if (new URLSearchParams(window.location.search).get('scene') === 'topo') setSceneKey('topo')
  }, [])
  const { scene, label } = scenes[sceneKey]
  return (
    <section className="min-h-screen w-full flex flex-col bg-vantablack scroll-hidden">
      <div className="flex-1 w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 px-4 py-20 lg:py-0">
        <div className="relative w-full max-w-md lg:max-w-none lg:w-[min(40vw,80vh,640px)] aspect-square shrink-0 overflow-hidden">
          <AsciiCanvas className="absolute inset-0" scene={scene} label={label} />
        </div>
        {LandingInformation()}
      </div>
      {searching && <MarqueeBanner />}
    </section>
  )
}

export default HeroSection

function LandingInformation() {
  return <div className="flex justify-center w-full max-w-md">
    <div className="w-full py-4 text-white space-y-6">
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
