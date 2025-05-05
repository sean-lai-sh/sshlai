'use client'
import styles from './style.module.css'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
export function PopIcon({Icon, style, customDelay  = 0}:{Icon: React.ReactNode, style?:string, customDelay?: number}) {

    const animation = {
      initial: {y: "100%"},
      enter: (i: number) => ({y: "0", transition: {duration: 0.75, ease: [0.33, 1, 0.68, 1],  delay: 0.075 * i  + customDelay}})
    }
  
    const { ref, inView } = useInView({
      threshold: 0.75,
      triggerOnce: true
    });
  
    return(
      <div ref={ref} className={`${style} h-fit`}>
       <div className={styles.lineMask}>
              <motion.p custom={0} variants={animation} initial="initial" animate={inView ? "enter" : ""}>{Icon}</motion.p>
            </div>
      </div>
    )
}
