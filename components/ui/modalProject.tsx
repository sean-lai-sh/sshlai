import React from 'react'
import { Separator } from './separator'
import { ProjectDetails } from '@/lib/types'
import Link from 'next/link'

const ModalProject = ({proj}:{proj:ProjectDetails}) => {
  return (
    <div className='
    xl:text-5xl lg:text-4xl text-2xl
    hover:text-gray-500 text-charcoal-darker hover:cursor-pointer w-full items-center justify-center transition-colors duration-200 ease-in-out font-medium'>
        <Link href={proj.CTA_link} passHref>
            <span className='flex justify-between h-40 items-center group'>
                <h2 className='relative text-start sm:min-w-[30%] min-w-[35%] mr-5 sm:mr-0 group-hover:translate-x-[-10px] transition-all duration-500 ease-in-out'>{proj.ProjName}</h2>
                <h2 className='relative group-hover:translate-x-[10px] transition-all duration-500 ease-in-out lg:text-2xl text-lg'>{proj.Liner}</h2>
            </span>
            {/* <h2>{proj.tag ? proj.tag : ""}</h2> */}
            <Separator className='w-full rounded-2xl bg-charcoal-darker mt-5'/>
        </Link>
    </div>
  )
}

export default ModalProject