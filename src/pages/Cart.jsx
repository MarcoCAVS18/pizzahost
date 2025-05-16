// src/pages/Cart.jsx - Updated with sync notification
import React, { useState, useEffect } from 'react';
import CartContainer from '../components/features/cart/CartContainer';
import CartSyncNotification from '../components/features/cart/CartSyncNotification';
import { usePageLoader } from '../hooks/usePageLoader';
import { useCart } from '../hooks/useCart';

const Cart = ({ setIsLoading }) => {
  usePageLoader(setIsLoading);
  const [syncError, setSyncError] = useState(false);
  const cartStore = useCart();
  
  // Simulate sync error detection
  useEffect(() => {
    const checkForSyncErrors = () => {
      setSyncError(false);
    };
    
    checkForSyncErrors();
  }, [cartStore.items]);

  return (
    <>
      <CartContainer />
      <CartSyncNotification 
        isSynced={cartStore.synced} 
        syncError={syncError} 
      />
    </>
  );
};

export default Cart;