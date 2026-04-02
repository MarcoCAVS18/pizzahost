// src/components/features/cart/ToggleCart.jsx - Simplified without sync indicators
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../../hooks/useCart';

const ToggleCart = () => {
  const { items } = useCart();
  
  const cartQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart" className="relative flex items-center justify-center w-8 h-8 group">
      <div className="relative">
        <FaShoppingCart className="text-xl transition-colors group-hover:text-darkRed" />
        
        {/* Cart quantity badge */}
        {cartQuantity > 0 && (
          <div className="absolute -top-2 -right-2 bg-darkRed text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {cartQuantity > 9 ? '9+' : cartQuantity}
          </div>
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
        <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Cart
        </div>
      </div>
    </Link>
  );
};

export default ToggleCart;