// components/pages/UserDashboard.jsx

import React from 'react';
import ProfileHeader from '../components/features/dashboard/ProfileHeader';
import LogoutButton from '../components/features/dashboard/LogoutButton';
import UserShippingInfo from '../components/features/dashboard/UserShippingInfo';
import RecentOrders from '../components/features/dashboard/RecentOrders';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-beige py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-end mb-4">
          <LogoutButton />
        </div>
        <ProfileHeader />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <UserShippingInfo />
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;