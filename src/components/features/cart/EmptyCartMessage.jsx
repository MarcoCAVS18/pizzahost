// components/features/cart/EmptyCartMessage.jsx
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

const EmptyCartMessage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-beige">
      <FaShoppingCart className="text-9xl text-gray-400 mb-6" />
      <h2 className="text-3xl font-bold text-gray-800 font-oldstyle italic">Your cart is empty</h2>
      <p className="text-gray-600 font-serif mb-4">Add some products to your cart to see them here</p>
      <Button
        text="Continue Shopping"
        onClick={() => navigate('/menu#menu-section')}
        textColor="text-white"
        bgColor="bg-darkRed"
        hoverColor="hover:bg-lightRed"
      />
    </div>
  );
};

export default EmptyCartMessage;