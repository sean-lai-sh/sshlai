import React from 'react'
import { ColorData } from '@/components/ui/AsciiArtViewer'
import ResponsiveAsciiArt from '@/components/essays/ResponsiveAsciiArt'
import EssayLink from '@/components/essays/EssayLink'
import { promises as fs } from 'fs'
import path from 'path'

async function getHeroData(): Promise<{ desktop: ColorData | null; mobile: ColorData | null }> {
  try {
    const desktopPath = path.join(process.cwd(), 'public', 'essay_hero.json')
    const mobilePath = path.join(process.cwd(), 'public', 'essay_hero_mobile.json')

    const [desktopContents, mobileContents] = await Promise.all([
      fs.readFile(desktopPath, 'utf8'),
      fs.readFile(mobilePath, 'utf8')
    ])

    return {
      desktop: JSON.parse(desktopContents),
      mobile: JSON.parse(mobileContents)
    }
  } catch (error) {
    console.error('Error reading essay hero data:', error)
    return { desktop: null, mobile: null }
  }
}

export default async function EssaysPage() {
  const heroData = await getHeroData()

  return (
    <main className="min-h-screen w-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">


        {/* Content Section - Mobile: stacked, Desktop: side-by-side */}
        <div className="flex flex-col lg:flex-row-reverse items-center sm:items-start gap-4 lg:gap-12">

          {/* Image Section */}
          <div className="w-[100%] sm:max-w-[100vw] lg:w-1/2 flex justify-center items-start">
             <ResponsiveAsciiArt
                desktopData={heroData.desktop}
                mobileData={heroData.mobile}
                className="bg-transparent border-none shadow-none p-0"
              />
          </div>

          {/* Essays List Section */}
          <div className="w-full lg:w-1/2">
            {/* Hero Section */}
          <div className="mb-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Essays
            </h1>
          </div>
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
