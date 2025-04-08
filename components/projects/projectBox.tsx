'use client'
import React, {useRef} from 'react'
import {useHover} from '@uidotdev/usehooks'
import Transition from '../transitions/Glitch'
import { ProjectDetails } from '@/lib/types'
import Link from 'next/link'
const ProjBox = ({project}:{project: ProjectDetails}) => {
  const transitionRef = useRef<HTMLDivElement>(null); 
  const [hoverRef, isHovered] = useHover()
  return (
    <div
    
    ref={hoverRef}
    role="button"
    aria-label={`Project: ${project.ProjName}`}
    className="w-full h-full flex flex-col justify-between bg-charcoal-light group relative overflow-hidden hover:scale-[1.02] transition-transform duration-600 ease-in-out rounded-lg p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent hover:shadow-lg hover:shadow-beige"
    tabIndex={0}
    >
        <div className="aspect-video overflow-hidden rounded-md">
            <Transition
            transition={isHovered}
            ref={transitionRef}
            frontImg={project.frontImg} // Image to show when not hovered
            backImg={project.backImg}
            />
        </div>

        <article className="flex flex-col justify-between flex-grow text-beige mt-4">
            <div className='px-2'>
            <h2 className="text-2xl font-semibold">{project.ProjName}</h2>
            <p className=" text-offwhite">{project.Liner}</p>
            <p className="text-xs text-muted">{project.TechStack}</p>
            </div>
            
            {project.CTA && project.CTA_link && (
            <Link
                href={`${project.CTA_link}`}// Link to the project or external site
                className="mt-2 inline-block py-3 px-2 text-accent underline underline-offset-4 transition hover:bg-beige rounded-lg 
                hover:text-charcoal hover:shadow-md hover:shadow-beige hover:ring-2 hover:ring-offwhite w-fit min-w-[20%]"
                target='_blank'
                rel="noopener noreferrer"
            >
                {project.CTA}
            </Link>
            )}
        </article>
    </div>

  )
}

export default ProjBox