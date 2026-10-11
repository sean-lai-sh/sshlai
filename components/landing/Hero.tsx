'use client'
import React from 'react'
import MarqueeBanner from '../Navigation/marquee'
import { searching } from '@/lib/consts'
import { MaskText } from '../ui/inlinemask/inlineMask'
import { AsciiCanvas } from './asciicanvas'
import { fieldScene } from './asciifield'
import { reactionScene } from './asciireaction'
import { seaScene } from './asciisea'
import { topoScene } from './asciitopo'
import AnimatedLink from '../ui/AnimatedLink'
// import Anim_Button from '../ui/animated_a'
const scenes = {
  field: { scene: fieldScene, label: 'ASCII Perlin noise field' },
  reaction: { scene: reactionScene, label: 'ASCII reaction-diffusion pattern' },
  sea: { scene: seaScene, label: 'ASCII sea driven by Perlin noise' },
  topo: { scene: topoScene, label: 'ASCII topographic contours driven by Perlin noise' },
}

const HeroSection = () => {
  const [sceneKey, setSceneKey] = React.useState<keyof typeof scenes>('field')
  React.useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('scene')
    if (requested && requested in scenes) setSceneKey(requested as keyof typeof scenes)
  }, [])
  const { scene, label } = scenes[sceneKey]
  return (
    <section className="min-h-screen w-full flex flex-col bg-vantablack scroll-hidden">
      <div className="flex-1 w-full flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-4 lg:gap-20 px-4 pt-8 pb-12 lg:py-0">
        <div className="relative w-full max-w-md lg:max-w-none lg:w-[min(40vw,80vh,640px)] aspect-[3/2] lg:aspect-square shrink-0 overflow-hidden">
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
    <div className="w-full py-1 lg:py-4 text-white space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          <MaskText
            phrases={["Sean Lai"]}
            style="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
            customDelay={0.7}
            duration={0.9}
          />
        </h1>
        <div className="mt-1 text-sm sm:text-base text-beige">
          <MaskText
            phrases={["Making AI useful."]}
            style="text-sm sm:text-base text-beige"
            customDelay={0.8}
            duration={0.9}
          />
        </div>
      </div>
      <div className="text-sm sm:text-base leading-6 lg:leading-7 text-beige space-y-3 lg:space-y-7">
        <p>
          Incoming Winter Software Engineer Intern @ {' '}
          <AnimatedLink href="https://forus.com">
            Forus
          </AnimatedLink>
          <br />
          Fellow @ {' '}
          <AnimatedLink href="https://x.ai">
            SpaceXAI
          </AnimatedLink>
        </p>
        <p>
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
        </p>
        <p>
          Sidequest(s):
          <br />Eating around, photography, helping founders
        </p>
      </div>
    </div>
  </div>
}
