// src/context/CartContext.jsx - Simplified for automatic sync
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserCart, updateCart } from '../services/cartService';

// Create the context
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [isInitialSyncDone, setIsInitialSyncDone] = useState(false);

  // This effect runs when the user auth state changes
  useEffect(() => {
    if (!user) {
      // No user logged in, reset sync states
      setIsSyncing(false);
      setSyncError(false);
      setLastSyncTime(null);
      setIsInitialSyncDone(false);
      return;
    }
    
    // When user logs in, we'll fetch their cart automatically
    if (user && !isInitialSyncDone) {
      fetchCartFromFirebase();
    }
  }, [user, isInitialSyncDone]);

  // Method to sync cart with Firebase
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

  // Fetch cart from Firebase (automatically called when user logs in)
  const fetchCartFromFirebase = async () => {
    if (!user?.uid) return null;
    
    setIsSyncing(true);
    setSyncError(false);
    
    try {
      const cartItems = await getUserCart(user.uid);
      setLastSyncTime(new Date());
      setIsInitialSyncDone(true);
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
    fetchCartFromFirebase,
    isInitialSyncDone
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