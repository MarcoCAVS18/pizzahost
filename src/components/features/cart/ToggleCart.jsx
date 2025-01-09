// components/cart/ToggleCart.jsx
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../../hoks/useCart';

const ToggleCart = () => {
  const { items } = useCart();
  const cartQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex items-center justify-center w-8 h-8">
      <div className="relative">
        <FaShoppingCart className="text-xl" />
        {cartQuantity > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {cartQuantity}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleCart;