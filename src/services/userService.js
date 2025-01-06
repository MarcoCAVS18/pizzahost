// src/services/userService.js

import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const getUserShippingInfo = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.warn('No user data found');
    return null;
  }
};

export const updateUserShippingInfo = async (userId, data) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, data, { merge: true });
};
