// components/features/user/ToggleUser.jsx
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ToggleUser = ({ showText = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/user');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="flex items-center cursor-pointer"
    >
      <div className="w-8 h-8 flex items-center justify-center">
        {user?.photoURL ? (
          <img 
            src={user.photoURL} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <FaUser className="text-xl" />
        )}
      </div>
      {showText && (
        <span className="text-lg ml-2 hover:text-darkRed transition-colors">
          {user ? 'Mi Perfil' : 'Sign In / Sign Up'}
        </span>
      )}
    </div>
  );
};

export default ToggleUser;
