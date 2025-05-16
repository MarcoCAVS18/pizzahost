// src/components/features/cart/CartContainer.jsx - Fixed unused vars warning
import React, { useState, useEffect } from 'react';
import { useCart } from '../../../hooks/useCart';
import { useAuth } from '../../../context/AuthContext';
import EmptyCartMessage from './EmptyCartMessage';
import CartContent from './CartContent';

const CartContainer = () => {
  const { isEmpty } = useCart(); // Removed unused 'items' variable
  const { user } = useAuth();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // This effect handles the initial load sync with Firebase
  useEffect(() => {
    // Give it a little time to load cart from Firebase or local storage
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user]);

  // Show a loading state during initial cart sync
  if (isInitialLoad) {
    return (
      <div className="min-h-screen p-6 bg-beige mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-darkRed mb-4"></div>
          <p className="text-xl font-oldstyle text-gray-600">
            {user ? "Syncing your cart..." : "Loading your cart..."}
          </p>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return <EmptyCartMessage />;
  }

  return <CartContent />;
};

export default CartContainer;