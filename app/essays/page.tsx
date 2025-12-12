import React from 'react'
import AsciiArtViewer, { ColorData } from '@/components/ui/AsciiArtViewer'
import EssayLink from '@/components/essays/EssayLink'
import { promises as fs } from 'fs'
import path from 'path'

async function getHeroData(): Promise<ColorData | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'essay_hero.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading essay_hero.json:', error)
    return null
  }
}

export default async function EssaysPage() {
  const heroData = await getHeroData()

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
                colorMode={true} 
                preloadedData={heroData}
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
