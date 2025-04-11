import CommunitySection from '@/components/experience/communitySection'
import StackedExperience from '@/components/experience/expSection'
import React from 'react'

const page = () => {
  return (
    <div className='bg-beige w-screen '>
        <StackedExperience/>
        <CommunitySection/>
    </div>
  )
}

export default page