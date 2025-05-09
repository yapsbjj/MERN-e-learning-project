import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h2 className='text-xl md:text-4xl text-gray-800 font-semibold'>Apprenez des compétences d'aujourdhui, où et quand vous le souhaiter!</h2>
      <p className='text-gray-500 sm:text-sm'>Découvrer l'ensemble des cours ci dessous</p>
      
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600'>c'est parti!</button>
        <button className='flex items-center gap-2'>En savoir plus <img src={assets.arrow_icon} alt="arrow_icon" /></button>
      </div>

    </div>
  )
}

export default CallToAction
