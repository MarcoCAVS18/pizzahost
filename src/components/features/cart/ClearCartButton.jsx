// src/components/features/cart/ClearCartButton.jsx - Fixed unused vars warning
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useCart } from '../../../hooks/useCart';
// Removed unused useAuth import

const ClearCartButton = () => {
  const { clearCart } = useCart();
  // Removed unused user variable
  const [isConfirming, setIsConfirming] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = async () => {
    if (isConfirming) {
      setIsClearing(true);
      
      try {
        await clearCart(); // This now handles both local and Firebase clearing
      } catch (error) {
        console.error("Error clearing cart:", error);
      } finally {
        setIsClearing(false);
        setIsConfirming(false);
      }
    } else {
      setIsConfirming(true);
      // Auto-reset confirmation state after 3 seconds
      setTimeout(() => setIsConfirming(false), 3000);
    }
  };

  return (
    <button
      onClick={handleClearCart}
      disabled={isClearing}
      className={`flex items-center gap-2 px-4 py-2 text-darkRed hover:text-lightRed transition-colors font-oldstyle self-end mb-4 ${
        isClearing ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isClearing ? (
        <>
          <div className="animate-spin h-4 w-4 border-t-2 border-r-2 border-darkRed rounded-full"></div>
          <span>Clearing...</span>
        </>
      ) : (
        <>
          <FaTrashAlt />
          <span>{isConfirming ? "Confirm Clear All" : "Clear All"}</span>
        </>
      )}
    </button>
  );
};

export default ClearCartButton;