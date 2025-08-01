import React from 'react'
import Image from 'next/image'
const Skill = () => {


    const skills = [
        {
            name: 'Languages',
            items: [
                'Python',
                'JavaScript',
                'C++',
                'Java',
                'C#',
                'SQL'
            ]
        },
        {
            name: 'Technologies',
            items: [
                'AWS',
                'Git',
                'Supabase',
                'PostgreSQL',
                'MongoDB',
                'Unity',
                'Unreal Engine 5'
            ]
        },
        {
            name: 'Libraries',
            items: [
                'Next.js',
                'React.js',
                'PyTorch',
                'Numpy',
                'Pandas',
                'Flask',
                'Motion',
                'GSAP',
            ]
        },
    ]

  return (
    <section className='w-screen bg-charcoal-darker '>
        <div className='w-full'>
            <div className='w-full h-full flex flex-col lg:flex-row pointer-events-none px-10'>
                <div className='w-fit h-full flex flex-col items-start justify-between'>
                    <div className='relative w-[50vw] min-h-[70vw] md:w-[30vw] md:min-h-[40vw] bg-white '>
                            <Image
                            src={'/sw_25_endpic.jpg'}
                            alt='hhacks'
                            fill
                            className = 'object-contain object-center inset-4'
                            />
                            
                    </div>
                    <div className='h-full items-end justify-end lg:flex hidden'>
                        <h1 className='text-6xl lg:text-[10vw] font-semibold text-white mt-[5rem] mb-[2rem]'>
                            Skills
                        </h1>
                    </div>
                </div>
                <div className='w-full h-fit flex flex-col md:items-end md:justify-end gap-0'>
                    <div className='w-[60vw] min-h-[50vw] md:w-[30vw] md:min-h-[20vw] h-full relative mt-[20vh] '>
                        <Image
                        src={'/techgp.jpg'}
                        alt='techgp'
                        fill
                        className = 'object-contain object-center'
                        />
                    </div>
                    <div className='relative w-full min-h-[50vw] md:w-[30vw] md:min-h-[30vw] '>
                        <Image
                        src={'/hhacks_pic.jpg'}
                        alt='hhacks'
                        fill
                        className = 'object-contain object-center'
                        />
                </div>
                     
                </div>
            </div>
        </div>
        <div className='w-full h-fit flex items-start justify-between px-[2vw] lg:hidden'>
            <div className='w-fit h-full flex items-end justify-end'>
                <h1 className='text-6xl lg:text-[10vw] font-semibold text-white  mt-[2rem] mb-[2rem]'>
                    Skills
                </h1>
            </div>
        </div>
        <div className='w-full pb-[20vh] flex flex-col md:flex-row justify-between md:px-[3vw] px-[10vw] lg:px-[10vw] '>
            {
                skills.map((skill, index) => {
                    return (
                        <div key={index} className='flex flex-row'>
                            <div className='w-fit h-full items-start justify-start mt-[0.7rem] xl: text-blue-400 text-2xl -translate-x-5'>
                                <span>
                                    0{index + 1}
                                </span>
                            </div>
                            <div className='w-full h-full p-2 md:p-1'>
                                <h1 className=' font-semibold text-white mb-4 lg:text-[40px] text-4xl'>{skill.name}</h1>
                                <ul className='space-y-4'>
                                    {skill.items.map((item, i) => (
                                        <li key={i} className=' font-normal text-white lg:text-xl text-lg'>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    </section>
  )
}

export default Skill
