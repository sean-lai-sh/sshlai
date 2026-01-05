import React from 'react'
import Link from 'next/link'
import Stair from '@/components/animated/Stair'
import InvestmentLink from '@/components/angels/InvestmentLink'

const Page = () => {
  return (
    <Stair>
      <main className="h-screen w-screen text-beige bg-charcoal-darker overflow-hidden flex flex-col">
        {/* Simple Header Navigation */}
        <nav className="w-full px-6 lg:px-12 py-4 lg:py-6 flex-shrink-0">
          <div className="max-w-7xl mx-auto flex justify-end items-center gap-6">
            <Link
              href="/"
              className="text-beige hover:text-white transition-colors duration-300 text-sm"
            >
              main
            </Link>
            <Link
              href="/contact"
              className="text-beige hover:text-white transition-colors duration-300 text-sm"
            >
              contact
            </Link>
          </div>
        </nav>

        {/* Main Content - Single Screen Layout */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-8 px-6 lg:px-12 pb-8 lg:pb-12 overflow-y-auto lg:overflow-hidden">
          {/* Hero Section */}
          <section>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
              Angel Investing
            </h1>
            <p className="text-base lg:text-lg text-beige/80">
              Backing builders I believe in for the long run.
            </p>
          </section>

          {/* Angel Wings ASCII Art */}
          {/* <section className="relative w-full flex justify-center items-center py-6 lg:py-8">
            <div className="relative max-w-full overflow-hidden">
              <AngelWingsBackground className="relative opacity-25" />
            </div>
          </section> */}

          {/* Two Column Layout */}
          <div className="flex flex-col-reverse lg:flex-1 lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: What Angel Investing Is To Me */}
            <section>
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-3 lg:mb-4">
                What Angel Investing Is To Me
              </h2>
              <div className="space-y-3 text-sm text-beige/90 leading-relaxed">
                <p>
                    Angels are reserved for the friends I want to partner
                    with for the long run. I like to think of my check not as necessary capital but a sign of trust and desire to grow our partnership for years to come. As such, when writing these checks, it's almost always that I&apos;ve known you a decent bit past a casual intro and want to continue helping past the initial asks from you.
                <br />
                <br />
                    I am always happy to help even when I do not invest. <strong> The difference is simply depth. </strong> As a college student, my time and capital are limited, so I reserve my highest level of commitment for founders I back personally.
                <br />
                <br />  
               Regardless of investment, feel free to reach out. I enjoy meeting builders who dare to pursue ambitious ideas and follow through on them. I invest solely my own personal capital and do not manage or deploy money for others.
                </p>
                {/* <div className="pt-2">
                  <h3 className="text-base text-white font-medium mb-2">
                    How I Can Help
                  </h3>
                  <ul className="space-y-2 text-sm lg:text-base">
                    <li className="flex gap-2">
                      <span className="text-beige/60">•</span>
                      <span>Investor & angel intros</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-beige/60">•</span>
                      <span>Client Intros</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-beige/60">•</span>
                      <span>Sourcing talent, especially technical roles</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-beige/60">•</span>
                      <span>Technical architecture advice</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-beige/60">•</span>
                      <span>University growth intros</span>
                    </li>
                  </ul>
                </div> */}
              </div>
            </section>

            {/* Right Column: Investments */}
            <section>
              <h2 className="text-2xl tracking-wide font-medium line-clamp-none text-white mb-3">
                Select Investments
              </h2>
              <ul className="space-y-3">
                <li>
                  <InvestmentLink
                    href="https://en.wikipedia.org/wiki/Stealth_startup"
                    name="Stealth"
                    category="Agentic Task Competency Evals"
                  />
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </Stair>
  )
}

export default Page
