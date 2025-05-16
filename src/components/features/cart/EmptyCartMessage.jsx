// src/components/features/cart/EmptyCartMessage.jsx - Updated with user-aware messaging
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const EmptyCartMessage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-beige">
      <FaShoppingCart className="text-9xl text-gray-400 mb-6" />
      <h2 className="text-3xl font-bold text-gray-800 font-oldstyle italic">Your cart is empty</h2>
      
      {user ? (
        <p className="text-gray-600 font-serif mb-4 text-center max-w-md">
          Hi, {user.displayName || 'there'}! Your cart is synchronized across all your devices.
          Add some delicious items to your cart to see them here.
        </p>
      ) : (
        <p className="text-gray-600 font-serif mb-4 text-center max-w-md">
          Add some products to your cart to see them here. 
          <span className="block mt-2">
            Sign in to keep your cart synchronized across devices!
          </span>
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          text="Continue Shopping"
          onClick={() => navigate('/menu#menu-section')}
          textColor="text-white"
          bgColor="bg-darkRed"
          hoverColor="hover:bg-lightRed"
        />
        
        {!user && (
          <Button
            text="Sign In"
            onClick={() => navigate('/user')}
            textColor="text-darkRed"
            bgColor="bg-transparent"
            className="border border-darkRed hover:bg-darkRed/5"
          />
        )}
      </div>
    </div>
  );
};

export default EmptyCartMessage;