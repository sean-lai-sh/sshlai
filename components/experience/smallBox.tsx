import React from 'react'
import { CommunityExp } from '@/lib/types';
import Image from 'next/image';

const VertBox = ({comm}:{comm:CommunityExp}) => {
    return (
        <div className='w-[90vw] mt-10 p-4 bg-black rounded-3xl group'>
            {/* <div className='relative w-full h-[400px] md:h-[800px]'>
                <Image src={comm.img} alt={comm.title} fill className='object-cover z-10' />
            </div>
            <div className='justify-center items-center flex'>
            <h3 className='text-offwhite lg:text-2xl text-center font-serif'>
                {comm.tagline}
            </h3>
            </div> */}
            <div
            className="relative aspect-[3/4] overflow-auto"
            >
                <div className='absolute inset-0 w-[99%] left-1 h-[95%] overflow-y-hidden'>
                    <Image
                    src={comm.img || 'fallback.jpg'}
                    alt="Front Reveal"
                        fill
                    className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            </div>
            <div>
            {comm.maskedContent !== null ? <comm.maskedContent/> : ""}
            </div>
        </div>
  )
}

export default VertBox