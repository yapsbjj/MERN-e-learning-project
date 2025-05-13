import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets'

const SideBar = () => {

  const { isEducator } = useContext(AppContext)

  const menuItems = [
    {name: 'Tableau de bord', path: '/educator', icon: assets.home_icon },
    {name: 'Ajouter un cours', path: '/educator/add-course', icon: assets.add_icon },
    {name: 'Mes cours', path: '/educator/my-courses', icon: assets.my_course_icon },
    {name: 'Elèves inscrits', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  return isEducator && (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col'>
      {menuItems.map((item)=>(
        <NavLink
        to={item.path}
        key={item.name}
        end={item.path === '/educator'}
        className={({isActive})=> `flex items-center md:flex-row flex-col md:justify-center py-3.5 md:px-10 gap-3 
        ${isActive ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90' : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'}`}>
          <img src={item.icon} alt="" className='w-6 h-5' />
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>

      ))}
    </div>
  )
}

export default SideBar
