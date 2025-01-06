// features/dashboard/ProfileHeader.jsx

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { uploadProfileImage } from '../../../context/AuthContext';
import { FaCamera, FaUser } from 'react-icons/fa';
import LogoutButton from './LogoutButton';

const ProfileHeader = () => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await uploadProfileImage(file);
    } catch (error) {
      console.error('Error updating profile image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="text-center mb-12">
      <div className="relative inline-block">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-darkRed mb-4 relative group bg-gray-100">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaUser className="text-6xl text-gray-400" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <label className="cursor-pointer p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isUploading}
              />
              <FaCamera className="text-white text-2xl" />
            </label>
          </div>
          
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      </div>

      <h1 className="font-serif italic text-3xl mb-2">
        {user?.displayName || 'User Name'}
      </h1>
      <div className="flex items-center justify-center gap-4">
        <p className="font-oldstyle text-gray-600">
          {user?.email}
        </p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfileHeader;
