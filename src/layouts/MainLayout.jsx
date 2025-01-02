// components/layouts/MainLayout.jsx

import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="mt-[72px] lg:mt-[88px] flex-grow">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;