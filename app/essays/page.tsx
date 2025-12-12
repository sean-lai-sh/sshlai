'use client'
import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import AsciiArtViewer from '@/components/ui/AsciiArtViewer'

// Local AnimatedLink component with white styling to match "black white underline" request (assuming white text on dark bg)
const EssayLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  const underlineRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const underline = underlineRef.current

    if (!container || !underline) return

    const handleMouseEnter = () => {
      gsap.to(underline, {
        scaleX: 1,
        duration: 1,
        ease: 'power3.inOut'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(underline, {
        scaleX: 0,
        duration: 1,
        ease: 'power3.inOut'
      })
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const linkContent = (
    <span ref={containerRef} className="relative inline-block group w-full">
      <span className="relative flex justify-between z-10 text-white group-hover:text-gray-300 transition-colors duration-200">
        {children}
      </span>
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-[1px] bg-white origin-left"
        style={{ width: '100%', transform: 'scaleX(0)' }}
      />
    </span>
  )

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {linkContent}
      </a>
    )
  }

  return (
    <Link href={href}>
      {linkContent}
    </Link>
  )
}

export default function EssaysPage() {
  return (
    <main className="min-h-screen w-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 tracking-tight">
            Essays
          </h1>
        </div>

        {/* Content Section - Mobile: stacked, Desktop: side-by-side */}
        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12">

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center items-start">
             <AsciiArtViewer 
                filePath="" 
                colorFilePath="/essay_hero.json" 
                colorMode={true} 
                className="bg-transparent border-none shadow-none p-0"
              />
          </div>

          {/* Essays List Section */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-6 md:gap-8">
              <article className="group">
            
                  <EssayLink href="/essays/essay-1">
                    <span className="text-xl md:text-2xl font-medium">Essay 1</span>
                    <p>01/02/25</p>
                  </EssayLink>
                 
              </article>

              {/* Add more essay entries here following the same pattern */}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
