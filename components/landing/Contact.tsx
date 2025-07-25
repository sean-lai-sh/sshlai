'use client'
import React from 'react'

const ContactPage = () => {
  return (
    <div className="w-full flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl flex flex-col md:flex-row md:justify-between gap-6 text-center md:text-left ">
        <a
          href="https://www.linkedin.com/in/sean-lai-123456789/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline duration-300 text-white"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/sean_lai"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline duration-300 text-white"
        >
          Twitter/X
        </a>
        <a
          href="mailto:sean.lai@example.com"
          className="hover:underline duration-300 text-white"
        >
          Email
        </a>
        <a
          href="https://github.com/sean-lai"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline duration-300 text-white"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}

export default ContactPage
