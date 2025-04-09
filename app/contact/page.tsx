import ContactForm from '@/components/contact/contactform'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Contact = () => {
   const socialStyle = "text-beige hover:text-white transition-colors duration-300 ease-in-out block text-lg hover:underline"
  return (
    <main className={`w-screen h-full min-h-screen text-beige bg-charcoal-darker overflow-y-auto`}>
        <div className=' flex flex-col justify-center items-center mx-10'>
            <div className=' md:mt-32 mt-36 md:w-3/4 flex md:flex-row flex-col justify-center '>
                <div className='md:w-[75%] items-start md:mx-20'>
                    <h1 className='text-start text-7xl'>{"Let's work together"}</h1>
                    <ContactForm/>
                </div>
                <div className='md:w-[25%] items-start text-lg text-beige space-y-6'>
                    <div className='md:block hidden items-start w-1/2'>
                        <Image src={'/pfp.JPEG'} alt={'profile picture'} width={300} height={300} className=' rounded-full'/>
                    </div>
                    <h2>My Info:</h2>
                    <h3>Email:</h3>
                    <a>seanlai221@gmail.com</a>

                    <h3>Location</h3>
                    <a>Brooklyn, NY</a>

                    <div>
                        <Link href="https://github.com/sean-lai-sh" target='_blank' rel="noreferrer" className={socialStyle}>
                            Github
                        </Link>
                        <Link href='https://www.linkedin.com/in/sean-sh-lai/' target='_blank' rel="noreferrer" className={socialStyle}>
                            Linkedin
                        </Link>
                        <Link href="https://dev.hsrn.nyu.edu/seanlai/" target='_blank' rel="noreferrer" className={socialStyle}>
                            Gitlab
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Contact