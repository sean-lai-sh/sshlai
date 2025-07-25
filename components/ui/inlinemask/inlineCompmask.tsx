'use client'
import React, { ReactNode, FC } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './style.module.css'

interface TextMaskProps {
  phrases: ReactNode[]
  className?: string
  customDelay?: number
  duration?: number
  newLine?: boolean
}

export const TextMask: FC<TextMaskProps> = ({
  phrases,
  className = '',
  customDelay = 0,
  duration = 0.75,
  newLine = false,
}) => {
  const animation = {
    initial: { y: '100%' },
    enter: (i: number) => ({
      y: '0',
      transition: {
        delay: customDelay + 0.075 * i,
        duration,
        ease: [0.33, 1, 0.68, 1],
      },
    }),
  }

  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className={`${className} h-fit`}>
      {phrases.map((phrase, i) => (
        <div key={i} className={styles.lineMask}>
          <motion.p
            custom={i}
            variants={animation}
            initial="initial"
            animate={inView ? 'enter' : undefined}
          >
            {phrase}
          </motion.p>
          {newLine && i < phrases.length - 1 && (
            <>
              <br />
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default TextMask
