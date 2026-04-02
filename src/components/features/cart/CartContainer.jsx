// src/components/features/cart/CartContainer.jsx - With existing Loader component
import React, { useState, useEffect } from 'react';
import { useCart } from '../../../hooks/useCart';
import { useAuth } from '../../../context/AuthContext';
import EmptyCartMessage from './EmptyCartMessage';
import CartContent from './CartContent';
import Loader from '../../ui/Loader'; // Using existing Loader component

const CartContainer = () => {
  const { isEmpty } = useCart();
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
          <Loader />
          <p className="text-xl font-oldstyle text-gray-600 mt-4">
            {user ? "Loading your cart..." : "Loading your cart..."}
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