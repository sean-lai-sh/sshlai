import React from 'react'
import { Separator } from './separator'
import { ProjectDetails } from '@/lib/types'

type ModalStates = {
  active:boolean;
  index: number;
}


const ModalProject = ({proj, index, setModal}:{proj:ProjectDetails, index:number, setModal:React.Dispatch<React.SetStateAction<ModalStates>>;}) => {
  return (
    <div className='
    xl:text-5xl lg:text-4xl text-2xl
    hover:text-gray-500 text-charcoal-darker hover:cursor-pointer w-full items-center justify-center transition-colors duration-200 ease-in-out font-medium flex flex-col' onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}}>
        
            <span className='flex w-full justify-between h-40 items-center group'>
                <h2 className='relative text-start sm:min-w-[30%] min-w-[35%] mr-5 sm:mr-0 group-hover:translate-x-[-10px] transition-all duration-500 ease-in-out'>{proj.ProjName}</h2>
                <h2 className='relative group-hover:translate-x-[10px] transition-all duration-500 ease-in-out lg:text-2xl text-lg font-normal'>{proj.Liner}</h2>
            </span>
            {/* <h2>{proj.tag ? proj.tag : ""}</h2> */}
            <Separator className='w-full rounded-2xl bg-charcoal-darker mt-5'/>
    </div>
  )
}

export default ModalProject