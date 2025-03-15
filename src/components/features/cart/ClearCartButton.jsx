// components/features/cart/ClearCartButton.jsx

import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useCart } from '../../../hoks/useCart';

const ClearCartButton = () => {
  const { clearCart } = useCart();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClearCart = () => {
    if (isConfirming) {
      clearCart();
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
      // Auto-reset confirmation state after 3 seconds
      setTimeout(() => setIsConfirming(false), 3000);
    }
  };

  return (
    <button
      onClick={handleClearCart}
      className="flex items-center gap-2 px-4 py-2 text-darkRed hover:text-lightRed transition-colors font-oldstyle self-end mb-4"
    >
      <FaTrashAlt />
      <span>{isConfirming ? "Confirm Clear All" : "Clear All"}</span>
    </button>
  );
};

export default ClearCartButton;