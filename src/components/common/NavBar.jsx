// NavBar.jsx

import React, { useState } from "react";
import { FaTimes, FaHeart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import ToggleCart from "../cart/ToggleCart";
import ToggleUser from "../user/ToggleUser";
import Logo from "./Logo";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-lightBeige p-4 lg:p-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Logo + Navegación */}
      <div className="flex items-center space-x-8">
        <a href="/">
          <Logo />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 font-oldstyle text-base">
          <a
            href="/"
            className="hover:text-darkRed hover:underline transition duration-200"
          >
            Home
          </a>
          <a
            href="/menu"
            className="hover:text-darkRed hover:underline transition duration-200"
          >
            Menu
          </a>
          <a
            href="/about"
            className="hover:text-darkRed hover:underline transition duration-200"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-darkRed hover:underline transition duration-200"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Iconos de Perfil, Wishlist y Carrito */}
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
        <a href="/user" className="hover:text-gray-600 transition duration-200">
          <ToggleUser />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden relative z-50 flex items-center space-x-4">
        <a
          href="/wishlist"
          className="flex items-center justify-center w-8 h-8 hover:text-gray-600"
        >
          <FaHeart className="text-xl" />
        </a>
        <a href="/cart" className="hover:text-gray-600">
          <ToggleCart />
        </a>
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-[28px]" />
          ) : (
            <FiMenu className="text-[28px]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40">
          <div className="fixed top-0 left-0 right-0 bg-lightBeige shadow-lg overflow-y-auto animate-slideDown transform transition-transform duration-300">
            <div className="p-8 flex flex-col space-y-6 font-oldstyle">
              <Logo />

              <a
                href="/"
                className="text-lg py-2 hover:text-darkRed hover:underline"
              >
                Home
              </a>
              <a
                href="/menu"
                className="text-lg py-2 hover:text-darkRed hover:underline"
              >
                Menu
              </a>
              <a
                href="/about"
                className="text-lg py-2 hover:text-darkRed hover:underline"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-lg py-2 hover:text-darkRed hover:underline"
              >
                Contact
              </a>
              <hr />
              <div className="flex items-center space-x-2">
                <a href="/profile" className="hover:text-gray-600">
                  <ToggleUser />
                  <span className="text-lg">Sign In / Sign Up</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
