// ToggleCart.js

import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const ToggleCart = () => {
  const cartQuantity = 5;

  return (
    <div className="flex items-center justify-center w-8 h-8">
      <div className="relative">
        <FaShoppingCart className="text-xl" />
        {cartQuantity > 0 && (
          <div className="absolute -top-2 -right-2 bg-red text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {cartQuantity}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleCart;