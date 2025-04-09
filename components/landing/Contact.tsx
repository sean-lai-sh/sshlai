import React from 'react'
import { ArrowDownLeft } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import { Button } from '../ui/button'
import Link from 'next/link'
import { motion } from 'motion/react'
import NavigationLink from '../ui/navLink'
const Contact = () => {
  return (
    <div className='w-full bg-charcoal min-h-[60vh] px-10 pt-32 sticky'>
        <div className='flex md:flex-row flex-col justify-between h-[50%] items-center md:items-start'>
            <h2 className='md:text-7xl text-5xl text-offwhite font-bold mb-5 md:mb-0'>
                {"Let's Work Together!"}
            </h2> 
           
            <motion.div className={`lg:absolute lg:right-[25%] lg:top-[25%] lg:items-center justify-center`}>
                <NavigationLink href="/contact" className='bg-offwhite text-charcoal text-2xl h-52 rounded-full border-5 w-52 items-center justify-center flex
                hover:bg-beige duration-1000 transition-all ease-in-out hover:text-black
                '>

                    <div>Contact</div>

                </NavigationLink>
            </motion.div> 
            <div className='justify-center items-center w-[40%] hidden md:flex h-full'>
                <ArrowDownLeft size={100} className='top-0'/>
            </div>
            {/* <motion.svg style={{ scale: 2}} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">

                <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
            </motion.svg> */}
        </div>
        <Separator className='w-full bg-beige h-1 mt-5 mb-10'/>
        <div className='md:space-x-14 space-y-12 md:space-y-0'>
            <Link href="mailto:seanlai221@gmail.com" className='mb-10'>
                <Button className='
                bg-beige text-charcoal hover:bg-charcoal hover:text-beige hover:shadow-sm 
                hover:shadow-beige transition-all duration-600 rounded-lg underline
                h-14 w-56 border-2 border-offwhite/50 hover:border-offwhite/100'>
                    seanlai221@gmail.com
                </Button>
            </Link>
            <Link href="tel:+1-347-646-8764">
                <Button className='
                bg-beige text-charcoal hover:bg-charcoal hover:text-beige hover:shadow-sm 
                hover:shadow-beige transition-all duration-600 ease-in-out rounded-lg underline
                h-14 w-56 border-2 border-offwhite/50 hover:border-offwhite/100'>
                    +1 347-646-8764
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default Contact