'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface AnimatedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ 
  href, 
  children, 
  className = '', 
  target, 
  rel 
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  
  const linkContent = (
    <span className={`relative inline-block group ${className}`}>
      <span className="relative z-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">
        {children}
      </span>
      <motion.span
        className="absolute bottom-0 left-0 h-[1px] bg-cyan-400 origin-left scale-x-0 group-hover:scale-x-100 duration-700 ease-in-out transition-all"
        // transition={{ 
        //   duration: 0.3, 
        //   ease: "easeInOut" 
        // }}
        style={{ width: '100%' }}
      />
    </span>
  )

  if (isExternal) {
    return (
      <a 
        href={href} 
        target={target || "_blank"} 
        rel={rel || "noopener noreferrer"}
      >
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

export default AnimatedLink
