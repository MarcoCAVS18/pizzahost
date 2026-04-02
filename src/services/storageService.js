// src/services/storageService.js

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth } from './authService';

const storage = getStorage();

export const uploadProfileImage = async (file) => {
  try {
    const storageRef = ref(storage, `profile-images/${auth.currentUser.uid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Actualizar el perfil del usuario con la nueva foto
    await updateProfile(auth.currentUser, {
      photoURL: downloadURL
    });
    
    return downloadURL;
  } catch (error) {
    throw new Error('Error uploading profile image');
  }
};