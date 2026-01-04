'use client'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface InvestmentLinkProps {
  href: string
  name: string
  category: string
}

const InvestmentLink = ({ href, name, category }: InvestmentLinkProps) => {
  const underlineRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const underline = underlineRef.current

    if (!container || !underline) return

    const handleMouseEnter = () => {
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.inOut'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.8,
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

  return (
    <a
      ref={containerRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 text-base cursor-pointer"
    >
      <span className="relative inline-block text-lg font-medium text-beige group-hover:text-gray-400 transition-colors duration-800 ease-in-out">
        {name}
        <span
          ref={underlineRef}
          className="absolute bottom-0 left-0 h-[1px] bg-white origin-left"
          style={{ width: '100%', transform: 'scaleX(0)' }}
        />
      </span>
      <span className="text-beige/40 text-xs ml-auto self-center">
        {category}
      </span>
    </a>
  )
}

export default InvestmentLink
