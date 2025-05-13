import React from 'react'
import logo from '../../assets/logo.png';
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
  <footer className='flex md:flex-row flex-col-reverse
  items-center justify-between text-left-w-full px-8 border-t'>

      {/* colonne de gauche */ }
    <div className='flex items-center gap-4'>
      <img className='hidden md:block w-20' src={logo} alt="logo" />

      <div className='hiddenmd:block h-7 w-px bg-gray-500/60'>

      </div>
      <p className='py-4 text-center text-xs md:text-sm text-gray-500'>
        Copyright 2025 Knowledge. All right Reserved.</p>
    </div>
    {/* colonne de droite */ }
    <div className='flex items-center gap-3 max-md:mt-4'>
      <a href='#'>
        <img src={assets.facebook_icon} alt="facebook-icon'" />
      </a>
      <a href='#'>
        <img src={assets.twitter_icon} alt="twitter-icon" />
      </a>
      <a href='#'>
        <img src={assets.instagram_icon} alt="instagram-icon" />
      </a>
    </div>

  </footer>
  )
}

export default Footer
