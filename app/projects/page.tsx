import ProjBox from '@/components/projects/projectBox'
import React from 'react'
import { allProjects } from '@/lib/consts'

const Projects = () => {
  return (
    <main className='w-screen bg-charcoal-darker items-center justify-center overflow-y-auto'>
        <div className="p-6 items-center justify-center min-w-[60vw] lg:mx-20 md:mx-10 sm:mx-6 mx-10">
            <h1 className={`mt-20 text-4xl text-center text-beige font-medium mb-4`}>Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-16 mb-32">
                {allProjects.map((project) => (
                <ProjBox
                    project={project}
                    key={project.ProjName} // Use a unique key for each project box
                />
                ))}
            </div>
        </div>
  </main>
  )
}

export default Projects
