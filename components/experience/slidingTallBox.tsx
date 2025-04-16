import React,{useRef} from 'react'
import { useHover } from '@uidotdev/usehooks'
import { CommunityExp } from '@/lib/types';
import Transition3D from '../transitions/card3dpull';
const SlidingBox = ({comm}:{comm:CommunityExp}) => {
    const transitionRef = useRef<HTMLDivElement>(null);
    const [hoverRef, isHovered] = useHover()
    return (
        <div ref={hoverRef} className='w-[300px] sm:w-[620px] sm:h-[860px] md:w-[660px] md:h-[880px] h-[400px] mt-10 p-2 bg-black rounded-3xl'>
            {/* <div className='relative w-full h-[400px] md:h-[800px]'>
                <Image src={comm.img} alt={comm.title} fill className='object-cover z-10' />
            </div>
            <div className='justify-center items-center flex'>
            <h3 className='text-offwhite lg:text-2xl text-center font-serif'>
                {comm.tagline}
            </h3>
            </div> */}
            <Transition3D transition={isHovered} ref={transitionRef} frontImg={comm.img} tag={comm.tagline}>
                {comm.maskedContent !== null ? <comm.maskedContent /> : <></>}
            </Transition3D>
        </div>
  )
}

export default SlidingBox