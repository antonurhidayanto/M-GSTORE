import React from 'react'
import ContactMeBtn from '../components/ContactMeBtn'

const Footer = () => {
  return (
    <footer className='min-h-16 border-t flex justify-between items-center py-8 px-20 mt-20'>
        <p className='flex justify-center items-center text-xl font-bold'>AntoNurhidayanto Copyright 2024</p>
        <ContactMeBtn>
            Contact me
        </ContactMeBtn>
    </footer>
  )
}

export default Footer