'use client'
import React from 'react'

const ContactPage = () => {
  return (
    <div className="w-full flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl flex flex-col md:flex-row md:justify-between gap-6 text-center md:text-left text-sm ">
        <a
          href="https://www.linkedin.com/in/sean-sh-lai/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline duration-300 text-white"
        >
          LinkedIn
        </a>
        
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline duration-300 text-white"
        >
          Resume
        </a>
        <a
          href="mailto:seanlai@nyu.edu"
          className="hover:underline duration-300 text-white"
        >
          Email
        </a>
        <a
          href="https://github.com/sean-lai-sh"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline duration-300 text-white"
        >
          GitHub
        </a>
        <a
          href="https://x.com/seansecureshell"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline duration-300 text-white"
        >
          Twitter/X
        </a>
      </div>
    </div>
  )
}

export default ContactPage