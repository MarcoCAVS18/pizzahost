import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-lightBeige p-6 flex justify-between items-center relative z-50">
      <div className="text-lg font-bold">
        <a href="/">Logo</a>
      </div>

      <div className="hidden md:flex space-x-8 font-oldstyle items-center text-sm">
        <a href="/" className="hover:text-gray-600">Home</a>
        <a href="/menu" className="hover:text-gray-600">Menu</a>
        <a href="/about" className="hover:text-gray-600">About</a>
        <a href="/contact" className="bg-darkRed text-white py-4 px-8 rounded-2xl hover:bg-red">
          Contact
        </a>
      </div>

      <div className="md:hidden relative z-50">
        <button onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="text-darkRed text-2xl" /> : <FaBars className="text-darkRed text-2xl" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/30 z-40 font-oldstyle">
          <div 
            className="absolute top-0 transform -translate-x-1/2 w-full h-full bg-lightBeige shadow-lg transition-transform duration-500 ease-in-out animate-fadeIn"
          >
            <div className="flex flex-col items-center pt-12 space-y-6">
              <a 
                href="/" 
                className="text-xl w-full text-center py-4 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Home
              </a>
              <a 
                href="/menu" 
                className="text-xl w-full text-center py-4 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Menu
              </a>
              <a 
                href="/about" 
                className="text-xl w-full text-center py-4 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                About
              </a>
              <a 
                href="/contact" 
                className="text-xl w-full text-center py-4 bg-darkRed text-white hover:bg-red transition duration-300 ease-in-out"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
