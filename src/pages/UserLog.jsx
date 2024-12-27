import React from 'react';
import LogIn from '../components/user/LogIn';
import SignUp from '../components/user/SignUp';
import { AnimationProvider } from '../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../context/ScrollAnimation/ScrollAnimation';

const UserLog = () => {
  return (
    <AnimationProvider>
      <div className="bg-lightBeige min-h-screen flex items-center justify-center py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-16 items-stretch justify-center">
            <ScrollAnimation delay={0} className="w-full md:w-2/3 lg:w-1/2 items-center">
              <div className="p-8 md:p-12">
                <LogIn />
              </div>
            </ScrollAnimation>
            
            {/* Línea divisoria con mayor espaciado */}
            <div className="hidden md:flex items-center">
              <div className="h-full border-r-2 border-gray"></div>
            </div>
            
            <ScrollAnimation delay={300} className="w-full md:w-2/3 lg:w-1/2">
              <div className="p-8 md:p-12">
                <SignUp />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </AnimationProvider>
  );
};

export default UserLog;
