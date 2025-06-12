import React, { useContext } from 'react';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const {
    navigate,
    isEducator,
    backendUrl,
    setIsEducator,
    getToken,
  } = useContext(AppContext);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const location = useLocation();

  const isCourseListPage = location.pathname.includes('/course-list');

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate('/educator');
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/update-role', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const UserLinks = () => (
    <div className="flex items-center gap-2 flex-wrap text-sm whitespace-nowrap">
      {isEducator ? (
        <Link to="/educator" className="hover:underline">Dashboard</Link>
      ) : (
        <button onClick={becomeEducator} className="text-blue-700 hover:underline">
          Devenir formateur
        </button>
      )}
      <Link to="/my-enrollments" className="hover:underline">Mes cours</Link>
    </div>
  );

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'
      }`}
    >
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={logo}
        alt="logo-knowledge"
        className="w-28 lg:w-32 cursor-pointer"
      />

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-5 text-gray-600">
        {user && <UserLinks />}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm"
          >
            S'inscrire
          </button>
        )}
      </div>

      {/* Mobile Links */}
      <div className="md:hidden flex flex-wrap items-center gap-2 text-gray-600 max-w-full">
        {user && <UserLinks />}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm"
          >
            S'inscrire
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

