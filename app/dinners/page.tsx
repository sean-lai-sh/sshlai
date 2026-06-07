'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Stair from '@/components/animated/Stair';
import WelcomeSequence from '@/components/dinners/WelcomeSequence';
import { MaskText } from '@/components/ui/inlinemask/inlineMask';
import { dinnerCopy, dinnerTopics } from '@/lib/consts';

const Dinners = () => {
  return (
    <>
      <WelcomeSequence lines={dinnerCopy.welcomeLines} />
      <Stair>
        <main className="min-h-screen w-screen text-beige bg-charcoal-darker overflow-x-hidden flex flex-col">
          {/* Minimal top nav */}
          <nav className="w-full px-6 lg:px-12 py-4 lg:py-6 flex-shrink-0">
            <div className="max-w-6xl mx-auto flex justify-end items-center gap-6">
              <Link
                href="/"
                className="text-beige hover:text-white transition-colors duration-300 text-sm"
              >
                main
              </Link>
              <Link
                href="mailto:seanlai@nyu.edu"
                className="text-beige hover:text-white transition-colors duration-300 text-sm"
              >
                contact
              </Link>
            </div>
          </nav>

          <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 pb-24 lg:pb-32 flex flex-col gap-6 lg:gap-10">
            {/* Header */}
            <header className="flex flex-col pt-6 lg:pt-10">
              <h1 className="text-white mb-4">
                <MaskText
                  phrases={[dinnerCopy.heading]}
                  style="font-script italic text-7xl lg:text-9xl leading-[1.1] pb-2"
                  customDelay={0.4}
                  duration={0.9}
                />
              </h1>
              <p className="text-base lg:text-lg text-beige/70 max-w-2xl">
                {dinnerCopy.tagline}
              </p>
            </header>

            {/* Anchor image + explanation */}
            <section className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-4 font-sans text-base lg:text-lg text-beige/90 leading-relaxed">
                {dinnerCopy.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                <div className="border-l-2 border-beige/25 pl-4 pt-1">
                  <p className="font-script italic text-2xl lg:text-3xl text-beige/85 leading-none mb-1.5">
                    Warning
                  </p>
                  <p className="italic text-sm lg:text-base text-beige/60">
                    {dinnerCopy.warning}
                  </p>
                </div>
              </div>
              <div className="relative w-full aspect-[5/4] rounded-md overflow-hidden border border-white/10 shadow-lg shadow-charcoal-darker">
                <Image
                  src="/dinners-table.png"
                  alt="A halftone scene of guests gathered around a dinner table"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </section>

            {/* Previous topics */}
            <section>
              <h2 className="text-2xl lg:text-3xl font-medium text-white mb-2">
                {dinnerCopy.topicsHeading}
              </h2>
              <p className="text-sm text-beige/70 mb-8">{dinnerCopy.topicsNote}</p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                {dinnerTopics.map((topic) => (
                  <li
                    key={topic.number}
                    className="group flex items-baseline gap-4 py-4 border-t border-white/10 last:border-b md:last:border-b-0"
                  >
                    <span className="font-mono text-sm text-beige/40 group-hover:text-beige transition-colors duration-300 flex-shrink-0">
                      {topic.number}
                    </span>
                    <span className="text-base lg:text-lg text-beige/85 group-hover:text-white transition-colors duration-300">
                      {topic.title}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </Stair>
    </>
  );
};

export default Dinners;
