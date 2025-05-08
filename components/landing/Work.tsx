
import React from 'react'
import { top3Featured, allProjects } from '@/lib/consts'
import { Button } from '../ui/button';
import NavigationLink from '../ui/navLink';
import Gallery from './gallery';
import RecentWork from './RecentWork';
// import Anim_Button from '../ui/animated_a'; 
const Work = () => {
    const featuredProjects = allProjects.filter((_, index) => top3Featured.includes(index))
    return (
        <div className='w-full bg-offwhite flex flex-col items-center justify-center pt-[20vh] md:pt-0'>
            <RecentWork/>
            <Gallery projects={featuredProjects} />
            <div className='w-full justify-center items-center flex pb-10 text-black bg-offwhite'>
                <NavigationLink href="/projects">
                    <Button className='lg:w-[30vw] w-[50vw] h-[10vh] rounded-2xl border border-black shadow-none hover:bg-gray-600 hover:text-offwhite transition-colors duration-300 ease-in-out hover:border-2 hover:border-beige text-2xl'>More Works</Button>
                </NavigationLink>
                {/* <Anim_Button content="More Works" href="/projects" funcAct={() => {}}/> */}
            </div>
        </div>
    )
}

export default Work