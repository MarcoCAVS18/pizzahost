// components/dashboard/LogoutButton.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { logOut } from '../../../services/authService';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-darkRed hover:text-lightRed transition-colors font-oldstyle"
    >
      <FaSignOutAlt />
      <span>Sign Out</span>
    </button>
  );
};

export default LogoutButton;