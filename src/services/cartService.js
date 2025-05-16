// src/services/cartService.js
import { db } from './firebase';
import { 
  doc, 
  collection, 
  setDoc, 
  getDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp 
} from 'firebase/firestore';

/**
 * Creates a new cart in Firestore
 * @param {string} userId - User ID
 * @param {Array} items - Cart items
 * @returns {Promise<void>}
 */
export const createCart = async (userId, items = []) => {
  try {
    if (!userId) {
      console.error('Cannot create cart: User ID is required');
      return;
    }

    const cartRef = doc(db, 'carts', userId);
    
    await setDoc(cartRef, {
      userId,
      items,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    });
    
    console.log('Cart created successfully for user:', userId);
  } catch (error) {
    console.error('Error creating cart in Firestore:', error);
    throw error;
  }
};

/**
 * Gets or creates a user's cart from Firestore
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Cart items or empty array
 */
export const getOrCreateCart = async (userId) => {
  try {
    if (!userId) {
      console.error('Cannot get cart: User ID is required');
      return [];
    }

    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    
    if (cartSnap.exists()) {
      const cartData = cartSnap.data();
      return cartData.items || [];
    } else {
      // If cart doesn't exist, create a new one
      await createCart(userId, []);
      return [];
    }
  } catch (error) {
    console.error('Error getting cart from Firestore:', error);
    return [];
  }
};

/**
 * Gets the user's cart from Firestore
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Cart items or empty array
 */
export const getUserCart = async (userId) => {
  try {
    if (!userId) {
      console.error('Cannot get cart: User ID is required');
      return [];
    }

    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    
    if (cartSnap.exists()) {
      const cartData = cartSnap.data();
      return cartData.items || [];
    }
    
    return [];
  } catch (error) {
    console.error('Error getting cart from Firestore:', error);
    return [];
  }
};

/**
 * Updates the user's cart in Firestore
 * @param {string} userId - User ID
 * @param {Array} items - Updated cart items
 * @returns {Promise<void>}
 */
export const updateCart = async (userId, items) => {
  try {
    if (!userId) {
      console.error('Cannot update cart: User ID is required');
      return;
    }

    const cartRef = doc(db, 'carts', userId);
    
    await setDoc(cartRef, {
      items,
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    console.log('Cart updated successfully for user:', userId);
  } catch (error) {
    console.error('Error updating cart in Firestore:', error);
    throw error;
  }
};

/**
 * Completely syncs the user's cart with Firestore (save/update)
 * This is an alias that decides whether to create or update
 * @param {string} userId - User ID
 * @param {Array} items - Cart items
 * @returns {Promise<void>}
 */
export const syncCart = async (userId, items) => {
  try {
    if (!userId) {
      console.error('Cannot sync cart: User ID is required');
      return;
    }

    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    
    if (cartSnap.exists()) {
      // Update existing cart
      await updateCart(userId, items);
    } else {
      // Create new cart
      await createCart(userId, items);
    }
    
    console.log('Cart synced successfully for user:', userId);
  } catch (error) {
    console.error('Error syncing cart to Firestore:', error);
    throw error;
  }
};

/**
 * Clears the user's cart in Firestore
 * @param {string} userId - User ID
 * @returns {Promise<void>}
 */
export const clearCart = async (userId) => {
  try {
    if (!userId) {
      console.error('Cannot clear cart: User ID is required');
      return;
    }

    const cartRef = doc(db, 'carts', userId);
    
    await setDoc(cartRef, {
      items: [],
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    console.log('Cart cleared successfully for user:', userId);
  } catch (error) {
    console.error('Error clearing cart in Firestore:', error);
    throw error;
  }
};

// For backward compatibility - export aliases with the old names
export const saveUserCart = syncCart;
export const updateUserCart = updateCart;
export const clearUserCart = clearCart;

// Export default object with all functions
export default {
  createCart,
  getOrCreateCart,
  getUserCart,
  updateCart,
  syncCart,
  clearCart,
  saveUserCart,
  updateUserCart,
  clearUserCart
};