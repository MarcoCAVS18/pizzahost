// services/authService.js

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, storage } from './firebase';

export { auth, storage };

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Email & Password Authentication
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error; // Pasar el error original para poder acceder a error.code
  }
};

export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('AuthService: Error en login:', error);
    console.error('AuthService: Código de error:', error.code);
    // Es importante lanzar el error original, no un nuevo Error
    throw error;
  }
};

// Social Authentication with Popup fallback to Redirect
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('AuthService: Error en login con Google:', error);
    if (
      error.code === 'auth/popup-closed-by-user' ||
      error.code === 'auth/cancelled-popup-request' ||
      error.code === 'auth/popup-blocked'
    ) {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw error; 
  }
};

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  } catch (error) {
    if (
      error.code === 'auth/popup-closed-by-user' ||
      error.code === 'auth/cancelled-popup-request' ||
      error.code === 'auth/popup-blocked'
    ) {
      await signInWithRedirect(auth, facebookProvider);
      return null;
    }
    throw error; 
  }
};

export const signInWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    return result.user;
  } catch (error) {
    if (
      error.code === 'auth/popup-closed-by-user' ||
      error.code === 'auth/cancelled-popup-request' ||
      error.code === 'auth/popup-blocked'
    ) {
      await signInWithRedirect(auth, appleProvider);
      return null;
    }
    throw error; 
  }
};

// Handle Redirect Results
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      return result.user;
    }
    return null;
  } catch (error) {
    throw error; 
  }
};

// Password Reset
export const resetPassword = async (email) => {
  try {
    const redirectUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://pizzita.netlify.app/reset-password'
        : 'http://localhost:3000/reset-password';

    await sendPasswordResetEmail(auth, email, {
      url: redirectUrl,
      handleCodeInApp: true,
    });
  } catch (error) {
    throw error;
  }
};

// Logout
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error; 
  }
};

// Auth state observer
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};