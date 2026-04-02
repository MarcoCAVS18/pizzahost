// src/services/userService.js - FIXED VERSION
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * Obtiene la información de envío del usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object|null>} Datos del usuario o null si no existe
 */
export const getUserShippingInfo = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    console.log(`Fetching shipping info for user ${userId}`);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log('User data found:', userData);
      return userData;
    } else {
      console.warn(`No user data found for user ${userId}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user shipping info:', error);
    throw error;
  }
};

/**
 * Actualiza la información de envío del usuario
 * @param {string} userId - ID del usuario
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<void>}
 */
export const updateUserShippingInfo = async (userId, data) => {
  try {
    console.log(`Updating shipping info for user ${userId}:`, data);
    
    // Asegurar que todos los campos necesarios estén presentes
    const completeData = {
      fullName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      country: 'Australia',
      postalCode: '',
      phone: '',
      ...data,
      // Asegurar que el userId esté siempre presente
      userId: userId
    };
    
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, completeData, { merge: true });
    console.log('User shipping info updated successfully');
  } catch (error) {
    console.error('Error updating user shipping info:', error);
    throw error;
  }
};
