import React from 'react'
import styles from './sliding.module.scss';
const RecentWork = () => {
    return (
        <section  className={` text-black pt-10 sm:px-10 px-5 xl:px-16 scroll-hidden ${styles.recentWork} bg-offwhite`}>
            <div className='w-full mb-10 mt-10'>
                <h3 className='text-2xl font-sans w-[60vw] font-normal'>{"I work on projects spanning distributed systems and integration work in Robotics. You'll also find me supporting the entrepreunership intiatives at NYU. Take a look at some technical projects I've undertaken recently"}</h3>
            </div>
    
        </section>
  )
}

export default RecentWork