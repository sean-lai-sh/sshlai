'use client'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

const Anim_Button = ({
  content,
  style = "px-20 py-5 rounded-2xl border-[2px] border-offwhite",
  href = "/",
  funcAct
}: {
  content: string,
  style?: string,
  href: string,
  funcAct: () => void
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  

  useEffect(() => {
    const container = containerRef.current
    const bg = backgroundRef.current
    if (!container || !bg) return

    const enter = () => {
      funcAct?.()
      gsap.killTweensOf(bg)
      gsap.to(bg, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.35,
        ease: 'cubic-bezier(0.22, 1, 0.28, 1)',
      })
    }

    const exit = () => {
      gsap.killTweensOf(bg)
      gsap.to(bg, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.35,
        ease: 'cubic-bezier(0.22, 1, 0.28, 1)',
        onComplete: () => {
          gsap.set(bg, { clipPath: 'inset(100% 0% 0% 0%)' }) // Reset to initial
        }
      })
    }

    container.addEventListener('mouseenter', enter)
    container.addEventListener('mouseleave', exit)

    return () => {
      container.removeEventListener('mouseenter', enter)
      container.removeEventListener('mouseleave', exit)
    }
  }, [funcAct])

  return (
    <Link href={href} passHref className="w-fit">
      <div
        ref={containerRef}
        className={`relative flex justify-between items-center font-semibold text-white overflow-hidden w-fit cursor-pointer hover:text-black ${style}`}
      >
        {/* Background Layer */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full bg-offwhite z-0"
          style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        />

        {/* Foreground content */}
        <div className="relative flex z-10 items-center h-full">
          {content}
        </div>
      </div>
    </Link>
  )
}

export default Anim_Button
