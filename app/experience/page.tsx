
import Stair from '@/components/animated/Stair'
import CommunitySection from '@/components/experience/communitySection'
import Experience from '@/components/experience/experience'
import React from 'react'

const page = () => {
  return (
    <div className='bg-beige w-screen'>
      <Stair>
        <Experience/>
        <CommunitySection/>
      </Stair>
    </div>
  )
}

export default page