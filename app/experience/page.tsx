
import Stair from '@/components/animated/Stair'
import CommunitySection from '@/components/experience/communitySection'
import Experience from '@/components/experience/experience'
import HorizontalExpansion from '@/components/sections/horizontalExpansion'
import React from 'react'

const page = () => {
  return (
    <div className='bg-beige w-screen'>
      <Stair>
        <Experience/>
        <HorizontalExpansion/>
        {/* <CommunitySection/> */}
      </Stair>
    </div>
  )
}

export default page