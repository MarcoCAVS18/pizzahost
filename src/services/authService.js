// services/authService.js

import { initializeApp } from 'firebase/app';
import {
  getAuth,
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
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

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
    console.log('AuthService: Intentando iniciar sesión con:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('AuthService: Login exitoso:', userCredential.user.uid);
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
    console.log('AuthService: Iniciando login con Google');
    const result = await signInWithPopup(auth, googleProvider);
    console.log('AuthService: Login con Google exitoso');
    return result.user;
  } catch (error) {
    console.error('AuthService: Error en login con Google:', error);
    if (
      error.code === 'auth/popup-closed-by-user' ||
      error.code === 'auth/cancelled-popup-request' ||
      error.code === 'auth/popup-blocked'
    ) {
      console.log('AuthService: Fallando a redirect para login con Google');
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw error; // Pasar el error original
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
    throw error; // Pasar el error original
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
    throw error; // Pasar el error original
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
    console.error('Error handling redirect:', error);
    throw error; // Pasar el error original
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
    console.error('Error in password reset:', error);
    throw error; // Pasar el error original para poder acceder a error.code
  }
};

// Logout
export const logOut = async () => {
  try {
    console.log('AuthService: Cerrando sesión');
    await signOut(auth);
    console.log('AuthService: Sesión cerrada con éxito');
  } catch (error) {
    console.error('AuthService: Error al cerrar sesión:', error);
    throw error; // Pasar el error original
  }
};

// Auth state observer
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};