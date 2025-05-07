
import Stair from '@/components/animated/Stair'
import Experience from '@/components/experience/experience'
import Contact from '@/components/landing/Contact'
import HorizontalExpansion from '@/components/sections/horizontalExpansion'
import React from 'react'

const page = () => {
  return (
    <div className='bg-beige w-screen'>
      <Stair>
        <Experience/>
        <HorizontalExpansion/>
        <Contact/>
      </Stair>
    </div>
  )
}

export default page