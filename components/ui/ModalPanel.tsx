/* eslint-disable prefer-const */
import { workExpDetails } from '@/lib/types'
import { motion } from 'framer-motion';
import Image from 'next/image';


const scaleAnimation = {

    initial: {scale: 0, x:"0%", y:"0%"},

    enter: {scale: 1, x:"0%", y:"0%", transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}},

    closed: {scale: 0, x:"0%", y:"0%", transition: {duration: 0.8, ease: [0.32, 0, 0.67, 0]}}

}

export default function ModalPanel({modal, experiences}:{modal:number, experiences:workExpDetails[]}) {
return (
    <>
        <motion.div variants={scaleAnimation} initial="enter" className={`h-[65vh] w-full justify-center items-center flex`}>
            <div style={{ top: `${modal * -100}%`,
                transition: "top 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
            }} className={`min-h-full w-full absolute flex justify-center flex-col items-center `}>
            {
                experiences.map( (exp, index) => {
                const { logo_img_src } = exp
                return <div className={`flex items-center justify-center w-1/2 flex-col h-[60vh] ${exp.img_tag} text-start rounded-xl border-[4px] gap-10 border-offwhite shadow-lg shadow-beige p-5`} key={`modal_${index}`}>
                    <div className='w-[300px] h-[300px] relative min-h-[300px]'>
                        <Image 
                        src={`${logo_img_src}`}
                        fill
                        alt="image"
                        className='object-contain'
                        />
                    </div>
                    <div className='w-[375px]h-full'>
                        <h1>{exp.job_title}</h1>
                        <h2>{exp.duration}</h2>
                        <p>
                            {exp.description}
                        </p>
                    </div>
                </div>
                })
            }
            </div>
        </motion.div>
    </>
  )
}
