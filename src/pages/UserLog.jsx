// src/pages/UserLog.jsx

import React from 'react';
import LogIn from '../components/features/auth/LogIn';
import SignUp from '../components/features/auth/SignUp';
import Separator from '../components/ui/Separator';
import { AnimationProvider } from '../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../context/ScrollAnimation/ScrollAnimation';

const UserLog = () => {
  return (
    <AnimationProvider>
      <div className="bg-beige min-h-screen flex items-start justify-center">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12">
            <ScrollAnimation delay={0} className="w-full">
              <div className="p-8 md:p-10 lg:p-12">
                <LogIn />
              </div>
            </ScrollAnimation>
            
            <div className="hidden md:block self-stretch flex items-center">
              <Separator orientation="vertical" />
            </div>
            
            <ScrollAnimation delay={300} className="w-full">
              <div className="p-8 md:p-10 lg:p-12">
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