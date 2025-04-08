'use client';
import React, {useRef} from 'react'
import { top3Featured, allProjects } from '@/lib/consts'
import { Separator } from '../ui/separator'
import styles from './sliding.module.scss';
import { Button } from '../ui/button';
import Link from 'next/link';
const RecentWork = () => {
    const featuredProjects = allProjects.filter((_, index) => top3Featured.includes(index))
    const container = useRef(null);
    return (
        <section ref={container}  className={`relative text-black pt-10 px-10 xl:px-16 scroll-hidden ${styles.recentWork}`}>
            <div className='w-full mb-10 xl:mt-10'>
                <h3 className='text-2xl font-sans w-[60vw] font-normal'>{"I work on projects spanning distributed systems and integration work in Robotics. You'll also find me supporting the entrepreunership intiatives at NYU. Take a look at some technical projects I've undertaken recently"}</h3>
            </div>
            <div className='w-full'>
                <h2 className='text-left text-8xl text-charcoal font-extrabold'>Recent Work</h2>
                <Separator className='w-full rounded-xl bg-charcoal-darker'/>
            </div>
            <ul className='w-full items-center justify-center mb-6'>
            {
                featuredProjects.map((proj, idx) => {
                    return <li key={idx} className='
                    xl:text-5xl lg:text-4xl
                    hover:text-gray-500 text-charcoal-darker hover:cursor-pointer w-full items-center justify-center transition-colors duration-200 ease-in-out font-medium'>
                        <a href={proj.CTA_link}>
                            <div className='flex justify-between h-40 items-center'>
                                <h2 className='text-start min-w-[30%]'>{proj.ProjName}</h2>
                                <h2 className='text-end'>{proj.Liner}</h2>
                            </div>
                            {/* <h2>{proj.tag ? proj.tag : ""}</h2> */}
                            <Separator className='w-full rounded-2xl bg-charcoal-darker mt-5'/>
                        </a>
                    </li>
                })
            }
            </ul>
            <div className='w-full justify-center items-center flex mb-10'>
                <Link href="/projects">
                    <Button className='w-[20vw] h-[10vh] rounded-2xl border border-black shadow-none hover:bg-gray-600 hover:text-offwhite transition-colors duration-300 ease-in-out hover:border-2 hover:border-beige'>More Works</Button>
                </Link>
            </div>
        </section>
  )
}

export default RecentWork