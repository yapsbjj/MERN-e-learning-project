import React, { useContext } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext);
  const isCourseListPage = location.pathname.includes('/course-list');

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async ()=>{
    try {
      if(isEducator){
        navigate('/educator')
        return;
      }
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/update-role',
        {headers: {Authorization: `Bearer ${token}`}})

        if(data.success){
          setIsEducator(true)
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 
      md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'
      }`}
    >
      <img
        onClick={() => navigate('/')}
        src={logo}
        alt="logo-knowledge"
        className="w-28 lg:w-32 cursor-pointer"
      />

      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button onClick={becomeEducator}>
                {isEducator ? 'Tableau de bord des professeurs' : 'Devenir professeur'}
              </button>
              | <Link to="/my-enrollments">Mes cours</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            S'inscrire
          </button>
        )}
      </div>

      {/* For Phone Screens */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button onClick={becomeEducator}>
                {isEducator ? 'Professeur Dashboard' : 'Devenir professeur'}
              </button>
              <Link to="/my-enrollments">Mes inscriptions</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => clerk.openSignIn()}>
            <img src={assets.user_icon} alt="logo-user-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
