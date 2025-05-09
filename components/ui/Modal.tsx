/* eslint-disable prefer-const */
import { ProjectDetails } from '@/lib/types'
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './style.module.css';
import gsap from 'gsap';
import Link from 'next/link';

const scaleAnimation = {

    initial: {scale: 0, x:"-50%", y:"-50%"},

    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},

    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}

}

type ModalStates = {
    active:boolean;
    index: number;
}

export default function Modal({modal, projects}:{modal:ModalStates, projects:ProjectDetails[]}) {
  const { active, index } = modal;
  const modalContainer = useRef(null);

  const cursor = useRef(null);

  const cursorLabel = useRef(null);
    useEffect( () => {
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})

    //Move cursor
    let xMoveCursor = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
    let yMoveCursor = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})

    //Move cursor label
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
    window.addEventListener('mousemove', (e) => {
        const { pageX, pageY } = e;
        xMoveContainer(pageX)
        yMoveContainer(pageY)
        xMoveCursor(pageX)
        yMoveCursor(pageY)
        xMoveCursorLabel(pageX)
        yMoveCursorLabel(pageY)
    })
    }, [])



return (
    <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={`${styles.modalContainer} hidden lg:flex`}>
            <div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
            {
                projects.map( (project, index) => {
                const { src, tag } = project
                return <div className={`${styles.modal} ${tag}`} key={`modal_${index}`}>
                    <Image 
                    src={`${src}`}
                    width={300}
                    height={0}
                    alt="image"
                    />
                </div>
                })
            }
            </div>
        </motion.div>
        <motion.div ref={cursor} className={`${styles.cursor}`} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
        <Link href={projects[index].CTA_link}>
            <motion.div ref={cursorLabel} className={`${styles.cursorLabel} text-lg font-medium`} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>View</motion.div></Link>
    </>
  )
}
