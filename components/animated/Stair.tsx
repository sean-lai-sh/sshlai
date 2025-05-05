/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion';
import { opacity, expand } from './anim';
import { MotionProps, Variants } from 'framer-motion';
import './style.scss'
type CustomAnim = (
  variants: Variants,
  custom?: any
) => MotionProps;

export default function Stair({children} : {children: React.ReactNode}) {
    const anim: CustomAnim = (variants, custom=null) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "exit",
            custom,
            variants
        }
    }
    const [nbOfColumns, setCols] = useState(5);
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const calculatedPanelCount = width < 640 ? 1 : width < 1024 ? 2 : 5;
            setCols(calculatedPanelCount);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        /// set to top of page
        
    }, []);
    
    return (
        <div className='stairs'>
            <motion.div {...anim(opacity)} className='transition-background'/>
            <div className='transition-container'>
                {
                    [...Array(nbOfColumns)].map( (_, i) => {
                      return (
                            <motion.div key={i} {...anim(expand, nbOfColumns - i)}/>
                        ) 
                    })
                }
            </div>
            {
                children
            }
        </div>
    )
}