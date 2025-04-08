'use client';
import styles from './circleLoad.module.scss';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { bottomUp } from './anim';

export default function LoadUp() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // The initial path draws a curve at the bottom of the viewport.
  const initialPath = `M0 ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} ${dimension.width} ${dimension.height} L${dimension.width} ${dimension.height} L0 ${dimension.height} Z`;

  // The target path moves the curve up so that the shape retracts upward.
  const targetPath = `M0 0 Q${dimension.width / 2} ${0 - 300} ${dimension.width} 0 L${dimension.width} ${dimension.height} L0 ${dimension.height} Z`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.div
      variants={bottomUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
            <svg>
                <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
            </svg>
        </>
      )}
    </motion.div>
  );
}
