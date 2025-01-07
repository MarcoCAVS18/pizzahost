//src/components/features/menu/HeroSection.jsx

import React from 'react';
import pizza5 from '../../../assets/images/pizzas/pizza6.jpg';

const HeroSection = () => {
  const handleDownload = () => {
    window.open('https://mislibrospreferidos.com/_uploads/primer-capitulo/c83b4-28133_como_hacer_caca_en_el_trabajo.pdf', '_blank');
  };

  return (
    <div className="relative h-[500px] mb-16">
      <div className="absolute inset-0 bg-[#8B0000]/10">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={pizza5} 
            alt="Background" 
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 h-full relative">
        <div className="flex h-full items-center max-w-2xl">
          <div className="w-full">
            <h1 className="text-6xl font-oldstyle mb-6 text-white drop-shadow-lg">
              <span className="font-bold block mb-2">Traditional</span>
              <span className="block">Italian Cuisine</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-lg font-serif drop-shadow-md">
              Check out our full menu and products through our physical menu. You can save it! It will always be updated.
            </p>
            <button 
              className="bg-darkRed text-white px-8 py-3 rounded-md hover:bg-lightRed transition-colors font-serif shadow-lg"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;