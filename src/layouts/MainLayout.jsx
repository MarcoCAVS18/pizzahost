import React from 'react';
import Loader from '../components/ui/Loader';

const MainLayout = ({ children, isLoading }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="mt-16 flex-grow relative">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
            <Loader />
          </div>
        )}
        <div className={`transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;