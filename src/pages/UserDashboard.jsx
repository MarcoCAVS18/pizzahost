import React from 'react';
import ProfileHeader from '../components/features/dashboard/ProfileHeader';
import UserShippingInfo from '../components/features/dashboard/UserShippingInfo';
import RecentOrders from '../components/features/dashboard/RecentOrders';
import { AnimationProvider } from '../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../context/ScrollAnimation/ScrollAnimation';

const UserDashboard = () => {
  return (
    <AnimationProvider>
      <div className="min-h-screen bg-beige py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-end mb-4"></div>
          <ScrollAnimation delay={200}>
            <ProfileHeader />
          </ScrollAnimation>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ScrollAnimation delay={400}>
              <UserShippingInfo />
            </ScrollAnimation>
            <ScrollAnimation delay={600}>
              <RecentOrders />
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </AnimationProvider>
  );
};

export default UserDashboard;
