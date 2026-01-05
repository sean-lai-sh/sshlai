'use client'
import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

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

export default EssayLink
