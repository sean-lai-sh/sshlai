'use client'

import { useState, useEffect } from 'react'
import AsciiArtViewer, { ColorData } from '@/components/ui/AsciiArtViewer'

interface ResponsiveAsciiArtProps {
  desktopData: ColorData | null
  mobileData: ColorData | null
  className?: string
}

export default function ResponsiveAsciiArt({ desktopData, mobileData, className }: ResponsiveAsciiArtProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const data = isMobile ? mobileData : desktopData

  return (
    <AsciiArtViewer
      colorMode={true}
      preloadedData={data}
      className={className}
    />
  )
}
