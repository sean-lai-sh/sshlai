'use client'
import React,{useRef} from 'react'
import {motion, useScroll, useTransform, MotionValue, useMotionTemplate} from 'framer-motion'
import { useInView } from 'react-intersection-observer';
const HorizontalExpand = (
    {index, img_src, style, content, x}
    :{index:number, img_src:string, style:string, content:React.ReactNode, x?:MotionValue<string>}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        container: ref,
        offset: ['start end', 'end end']
    })
    const img_scale = useTransform(scrollYProgress, [0, 0.5], [0.2 , 1]);
    const translateX = useTransform(scrollYProgress, [0, 1], ["50%" , "0%"]);
    const translateY = useTransform(scrollYProgress, [0, 1], ["50%" , "0%"]);

    // const inView = true
    return (
        <motion.div 
        className={`w-screen h-screen ${style} bg-blue-400`} 
        style={{zIndex:index,
            x:x,
        }}
        ref={ref}
        >
            Some content {index}
            <motion.div
            style={
                {
                scale:img_scale, 
                transform: useMotionTemplate`translate(${translateX}, ${translateY}) scale(${img_scale})`,
                }
            }
            className='bg-red-500 w-[50vw] h-[50vh] relative'
            >

            </motion.div>
        </motion.div>
    )
}

export default HorizontalExpand