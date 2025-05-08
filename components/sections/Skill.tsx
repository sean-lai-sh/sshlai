import React from 'react'

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
    <section className='w-screen min-h-screen bg-charcoal-darker '>
        <div className='w-full min-h-[150vh]'>
            Some images here
        </div>
        <div className='w-full h-fit flex items-start justify-start px-[2vw]'>
            <h1 className='text-6xl lg:text-[10vw] font-semibold text-white text-center mt-[5rem] mb-[2rem]'>
                Skills
            </h1>
        </div>
        <div className='w-full min-h-screen flex flex-col md:flex-row justify-between md:px-[3vw] px-[10vw] lg:px-[10vw] '>
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