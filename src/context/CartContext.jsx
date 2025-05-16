// src/context/CartContext.jsx - Fixed unused vars warning
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserCart, updateCart } from '../services/cartService';
// Removed unused saveUserCart import

// Create the context
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // This effect runs whenever the user auth state changes
  useEffect(() => {
    if (!user) {
      // No user logged in, reset sync states
      setIsSyncing(false);
      setSyncError(false);
      setLastSyncTime(null);
      return;
    }
    
    // When user is logged in, we track sync status here
    setLastSyncTime(new Date());
  }, [user]);

  // Method to manually sync cart with Firebase
  const syncCartWithFirebase = async (items) => {
    if (!user?.uid || !items) return;
    
    setIsSyncing(true);
    setSyncError(false);
    
    try {
      await updateCart(user.uid, items);
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Error syncing cart with Firebase:', error);
      setSyncError(true);
    } finally {
      setIsSyncing(false);
    }
  };

  // Fetch cart from Firebase
  const fetchCartFromFirebase = async () => {
    if (!user?.uid) return null;
    
    setIsSyncing(true);
    setSyncError(false);
    
    try {
      const cartItems = await getUserCart(user.uid);
      setLastSyncTime(new Date());
      return cartItems;
    } catch (error) {
      console.error('Error fetching cart from Firebase:', error);
      setSyncError(true);
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  // Value object to be provided by the context
  const contextValue = {
    isSyncing,
    syncError,
    lastSyncTime,
    syncCartWithFirebase,
    fetchCartFromFirebase
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export default CartContext;