import React, { useState } from "react";
import { FaTimes, FaHeart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useAuth } from '../../context/AuthContext';
import ToggleCart from "../features/cart/ToggleCart";
import ToggleUser from "../features/user/ToggleUser";
import LogoutButton from "../features/dashboard/LogoutButton";
import Logo from "./Logo";
import Separator from "../ui/Separator";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const DesktopMenu = () => (
    <div className="hidden lg:flex space-x-6 font-oldstyle text-base">
      <a href="/" className="hover:text-darkRed hover:underline transition duration-200">
        Home
      </a>
      <a href="/menu" className="hover:text-darkRed hover:underline transition duration-200">
        Menu
      </a>
      <a href="/about" className="hover:text-darkRed hover:underline transition duration-200">
        About
      </a>
      <a href="/contact" className="hover:text-darkRed hover:underline transition duration-200">
        Contact
      </a>
    </div>
  );

  const DesktopIcons = () => (
    <div className="hidden lg:flex space-x-6 items-center">
      <a 
        href="/wishlist" 
        className="flex items-center justify-center w-8 h-8 hover:text-gray-600 transition duration-200"
      >
        <FaHeart className="text-xl" />
      </a>
      <a href="/cart" className="hover:text-gray-600 transition duration-200">
        <ToggleCart />
      </a>
      <div onClick={closeMenu}>
        <ToggleUser />
      </div>
    </div>
  );

  const MobileIcons = () => (
    <div className="lg:hidden relative z-50 flex items-center space-x-4">
      <a 
        href="/wishlist" 
        onClick={closeMenu}
        className="flex items-center justify-center w-8 h-8 hover:text-gray-600"
      >
        <FaHeart className="text-xl" />
      </a>
      <a href="/cart" onClick={closeMenu} className="hover:text-gray-600">
        <ToggleCart />
      </a>
      <button 
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? (
          <FaTimes className="text-[28px]" />
        ) : (
          <FiMenu className="text-[28px]" />
        )}
      </button>
    </div>
  );

  const MobileMenu = () => (
    <div className="lg:hidden fixed inset-0 bg-black/50 z-40">
      <div className="fixed top-0 left-0 right-0 bg-lightBeige shadow-lg overflow-y-auto animate-slideDown transform transition-transform duration-300">
        <div className="p-8 flex flex-col space-y-6 font-oldstyle">
          <div onClick={closeMenu}>
            <Logo />
          </div>

          <a 
            href="/" 
            onClick={closeMenu} 
            className="text-lg py-2 hover:text-darkRed hover:underline"
          >
            Home
          </a>
          <a 
            href="/menu" 
            onClick={closeMenu} 
            className="text-lg py-2 hover:text-darkRed hover:underline"
          >
            Menu
          </a>
          <a 
            href="/about" 
            onClick={closeMenu} 
            className="text-lg py-2 hover:text-darkRed hover:underline"
          >
            About
          </a>
          <a 
            href="/contact" 
            onClick={closeMenu} 
            className="text-lg py-2 hover:text-darkRed hover:underline"
          >
            Contact
          </a>

          <Separator className="my-2" />

          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <div onClick={closeMenu}>
                  <ToggleUser showText={false} />
                </div>
                <div onClick={closeMenu}>
                  <LogoutButton />
                </div>
              </>
            ) : (
              <div onClick={closeMenu}>
                <ToggleUser showText={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="bg-lightBeige p-4 lg:p-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center space-x-8">
        <a href="/" aria-label="Home" onClick={closeMenu}>
          <Logo />
        </a>
        <DesktopMenu />
      </div>

      <DesktopIcons />
      <MobileIcons />
      
      {isMenuOpen && <MobileMenu />}
    </nav>
  );
};

export default NavBar;