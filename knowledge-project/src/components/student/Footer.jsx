import React from 'react'
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className='bg-gray-900 w-full text-white text-left'>
      <div className='flex flex-col md:flex-row items-start justify-between px-6 md:px-36 gap-10 py-10 border-b border-white/30'>

        {/* Logo + texte */}
        <div className='flex flex-col items-center md:items-start flex-1 text-center md:text-left'>
          <img src={logo} alt="logo-Knowledge" className='w-32 md:w-40' />
          <p className='mt-6 text-sm text-white/80'>
            La société éditrice Knowledge propose aussi des formations sous forme de livres ou de kits dans les domaines de la
            musique, de l’informatique ou du jardinage.
          </p>
        </div>

        {/* Menu */}
        <div className='flex flex-col items-center md:items-start flex-1'>
          <h2 className='font-semibold text-white mb-4'>Menu</h2>
          <ul className='flex flex-col gap-2 text-sm text-white/80'>
            <li><a href="/">Accueil</a></li>
            <li><a href="#">À propos de nous</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
          </ul>
        </div>

        {/* Newsletter - rendue visible aussi sur mobile */}
        <div className='flex flex-col items-center md:items-start flex-1 w-full'>
          <h2 className='font-semibold text-white mb-4 text-center md:text-left'>
            Inscrivez-vous à notre newsletter
          </h2>
          <p className='text-sm text-white/80 text-center md:text-left'>
            Recevez nos dernières actualités, cours et ressources directement chez vous !
          </p>
          <div className='flex flex-col sm:flex-row gap-2 pt-4 w-full max-w-xs'>
            <input
              type="email"
              placeholder='Entrez votre email'
              className='border border-gray-500/30 bg-gray-800 text-white placeholder-gray-400 outline-none rounded px-3 py-2 text-sm w-full'
            />
            <button className='bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto'>
              S'inscrire
            </button>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <p className='py-4 text-center text-xs md:text-sm text-white/60'>
        © 2025 Knowledge. Tous droits réservés.
      </p>
    </footer>
  )
}

export default Footer
