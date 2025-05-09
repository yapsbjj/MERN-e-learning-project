import React from 'react'
import { assets } from '../../assets/assets'

const Compagnies = () => {
  return (
    <div className='pt-16'>
      <p className='text-base text-gray-500'>Les Compagnies partenaires qui nous font confiance</p>
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16
      md:mt-10 mt-5'>
        <img src={assets.microsoft_logo} alt="microsoft-logo" className='w-20 md:w-28' />
        <img src={assets.walmart_logo} alt="walmart-logo" className='w-20 md:w-28' />
        <img src={assets.accenture_logo} alt="accenture-logo" className='w-20 md:w-28' />
        <img src={assets.adobe_logo} alt="adobe-logo" className='w-20 md:w-28' />
        <img src={assets.paypal_logo} alt="paypal-logo" className='w-20 md:w-28' />
      </div>
    </div>
  )
}

export default Compagnies
