// src/context/AuthContext.js

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, auth } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const storage = getStorage();

export const uploadProfileImage = async (file) => {
  try {
    const storageRef = ref(storage, `profile-images/${auth.currentUser.uid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    await updateProfile(auth.currentUser, {
      photoURL: downloadURL
    });
    
    return downloadURL;
  } catch (error) {
    throw new Error('Error uploading profile image');
  }
};