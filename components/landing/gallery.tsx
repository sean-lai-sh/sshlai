'use client';
import React, { useState } from 'react'
import { ProjectDetails } from '@/lib/types'
import ModalProject from '../ui/modalProject'
import Modal from '../ui/Modal'
import { Separator } from '../ui/separator';
const Gallery = ({projects}:{projects : ProjectDetails[]}) => {
  const [modal, setModal] = useState({active: false, index: 0})
  return (
    <section className='flex flex-col justify-center top-0 bg-offwhite sm:px-10 px-5 xl:px-16'>
       <div className='w-full'>
          <h2 className='text-left md:text-8xl text-6xl text-charcoal font-extrabold'>Recent Work</h2>
          <Separator className='w-full rounded-xl bg-charcoal-darker'/>
      </div>
      <div className='w-full items-center flex flex-col mb-6 '>
      {
          projects.map((proj, idx) => {
              return <ModalProject key={idx} proj={proj} index={idx} setModal={setModal}/>
          })
      }
      <Modal modal={modal} projects={projects}/>
      </div>
    </section>
  )
}

export default Gallery