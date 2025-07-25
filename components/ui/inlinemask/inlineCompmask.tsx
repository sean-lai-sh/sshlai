'use client'
import styles from './style.module.css'
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
export function ComponentMask({phrases, style, customDelay  = 0, duration = 0.75, newLine=false}:{phrases: ReactNode[], style?:string, customDelay?: number, duration?: number, newLine?: boolean}) {

    const animation = {
      initial: {y: "100%"},
      enter: (i: number) => ({y: "0", transition: {duration: duration, ease: [0.33, 1, 0.68, 1],  delay: 0.075 * i  + customDelay}})
    }
  
    const { ref, inView } = useInView({
      threshold: 0.75,
      triggerOnce: true
    });
  
    return(
      <div ref={ref} className={`${style} h-fit`}>
        {
          phrases.map( (phrase, index) => {
            return <div key={index} className={styles.lineMask}>
              <motion.p custom={index} variants={animation} initial="initial" animate={inView ? "enter" : ""}>{phrase}</motion.p>
              {newLine && <><br /><br /></>}
            </div>
          })
        }
      </div>
    )
}
