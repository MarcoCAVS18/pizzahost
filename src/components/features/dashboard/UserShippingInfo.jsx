// components/dashboard/UserShippingInfo.jsx

import React from 'react';
import { FaEdit } from 'react-icons/fa';

const UserShippingInfo = () => {
  // Estos datos vendrán de tu base de datos
  const userInfo = {
    fullName: 'John Doe',
    address: '123 Pizza Street, NY 10001',
    phone: '+1 (555) 123-4567',
    userId: '4321' // ID de 4 dígitos
  };

  return (
    <div className="rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif italic text-2xl">Shipping Information</h2>
        <button className="text-darkRed hover:text-lightRed transition-colors">
          <FaEdit className="text-xl" />
        </button>
      </div>

      <div className="space-y-4 font-oldstyle">
        <div>
          <label className="text-gray-600 text-sm">Full Name</label>
          <p className="text-lg">{userInfo.fullName}</p>
        </div>

        <div>
          <label className="text-gray-600 text-sm">Shipping Address</label>
          <p className="text-lg">{userInfo.address}</p>
        </div>

        <div>
          <label className="text-gray-600 text-sm">Phone Number</label>
          <p className="text-lg">{userInfo.phone}</p>
        </div>

        <div>
          <label className="text-gray-600 text-sm">User ID</label>
          <p className="text-lg">{userInfo.userId}</p>
        </div>
      </div>
    </div>
  );
};

export default UserShippingInfo;