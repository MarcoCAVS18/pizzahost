// ToggleUser.js

import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const ToggleUser = ({ isLoggedIn = false, userName = '', userPhoto = '' }) => {
  const getInitials = (name) => {
    if (!name) return '';
    const [firstName, lastName] = name.split(' ');
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="flex items-center justify-center w-8 h-8">
      <div className="relative inline-flex w-7 h-7 rounded-full overflow-hidden bg-darkRed text-white items-center justify-center">
        {!isLoggedIn && (
          <FaUserCircle className="text-xl" />
        )}
        {isLoggedIn && !userPhoto && (
          <span className="text-xs font-bold">{getInitials(userName)}</span>
        )}
        {isLoggedIn && userPhoto && (
          <img
            src={userPhoto}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default ToggleUser;
