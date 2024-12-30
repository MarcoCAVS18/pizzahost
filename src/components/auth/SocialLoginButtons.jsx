// components/auth/SocialLoginButtons.jsx

import React from 'react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { 
  signInWithGoogle, 
  signInWithFacebook, 
  signInWithApple 
} from '../../services/authService';

const SocialLoginButton = ({ icon, text, onClick, bgColor, textColor, hoverColor }) => (
  <button 
    onClick={onClick}
    className={`w-full ${bgColor} ${textColor} px-6 py-3 rounded-md flex items-center justify-center space-x-2 hover:${hoverColor} transition duration-200`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

const SocialLoginButtons = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.error('Facebook sign in error:', error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
    } catch (error) {
      console.error('Apple sign in error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <SocialLoginButton
        icon={<FaGoogle className="text-red-600" />}
        text="Sign in with Google"
        onClick={handleGoogleSignIn}
        bgColor="bg-white"
        textColor="text-gray-600"
        hoverColor="bg-gray-100"
      />
      <SocialLoginButton
        icon={<FaFacebook />}
        text="Sign in with Facebook"
        onClick={handleFacebookSignIn}
        bgColor="bg-blue-600"
        textColor="text-white"
        hoverColor="bg-blue-700"
      />
      <SocialLoginButton
        icon={<FaApple />}
        text="Sign in with Apple"
        onClick={handleAppleSignIn}
        bgColor="bg-black"
        textColor="text-white"
        hoverColor="bg-gray-800"
      />
    </div>
  );
};

export default SocialLoginButtons;