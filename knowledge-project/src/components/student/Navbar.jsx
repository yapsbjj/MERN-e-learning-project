import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { SignOutButton, useUser, useClerk } from '@clerk/clerk-react'

const Navbar = () => {
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const { navigate } = useContext(AppContext)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className='bg-white w-full shadow-sm fixed top-0 left-0 z-50'>
      <div className='flex justify-between items-center px-4 md:px-10 py-4'>

        {/* Logo */}
        <img
          src={assets.logo}
          alt="logo"
          className='w-32 cursor-pointer'
          onClick={() => navigate('/')}
        />

        {/* Desktop Nav */}
        <ul className='hidden md:flex gap-6 text-gray-600 font-medium text-sm'>
          <li className='cursor-pointer hover:text-blue-600' onClick={() => navigate('/')}>Accueil</li>
          <li className='cursor-pointer hover:text-blue-600' onClick={() => navigate('/course-list')}>Cours</li>
          <li className='cursor-pointer hover:text-blue-600' onClick={() => navigate('/my-enrollments')}>Mes cours</li>
        </ul>

        {/* Actions */}
        <div className='flex items-center gap-4'>

          {/* Icône utilisateur */}
          {user ? (
            <div className='flex items-center gap-2'>
              <img src={user.imageUrl} alt="profile" className='w-8 h-8 rounded-full' />
              <SignOutButton>
                <button className='text-sm text-blue-600 font-medium hover:underline'>Se déconnecter</button>
              </SignOutButton>
            </div>
          ) : (
            <button onClick={() => openSignIn()}>
              <img src={assets.user_icon} alt="user icon" className='w-6 h-6' />
            </button>
          )}

          {/* Burger icon mobile */}
          <img
            src={assets.menu_icon}
            alt="menu icon"
            className='w-6 h-6 cursor-pointer md:hidden'
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden px-6 pb-4 bg-white border-t border-gray-200'>
          <ul className='flex flex-col gap-4 text-gray-600 font-medium text-sm'>
            <li className='cursor-pointer' onClick={() => { navigate('/'); setMobileMenuOpen(false); }}>Accueil</li>
            <li className='cursor-pointer' onClick={() => { navigate('/course-list'); setMobileMenuOpen(false); }}>Cours</li>
            <li className='cursor-pointer' onClick={() => { navigate('/my-enrollments'); setMobileMenuOpen(false); }}>Mes cours</li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
