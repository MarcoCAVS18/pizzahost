import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SocialLoginButtons from './SocialLoginButtons';
import { logIn } from '../../../services/authService';
import Separator from '../../ui/Separator';
import Button from '../../ui/Button';


const LogIn = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const errorMessages = {
    'auth/wrong-password': 'Incorrect email or password.',
    'auth/user-not-found': 'No account exists with this email.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
    'auth/invalid-email': 'Please enter a valid email address.',
  };

  const onSubmit = async (data) => {
    console.log('Login form submitted with data:', data);
    setIsSubmitting(true);
    
    try {
      setLoginError('');
      console.log('Attempting to log in with email:', data.email);
      
      // Llamada a la función de login
      const user = await logIn(data.email, data.password);
      console.log('Login successful, user:', user);
      
      // Esperar un momento para asegurar que el estado de autenticación se actualice
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
        navigate('/dashboard');
      }, 500);
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Manejo específico según el tipo de error
      if (error.code) {
        console.error('Error code:', error.code);
        setLoginError(errorMessages[error.code] || `Login failed: ${error.message}`);
      } else {
        // Si el error no tiene código, puede ser un error personalizado
        setLoginError(error.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-4 text-center font-oldstyle italic text-gray-800">Welcome Back</h2>
      <p className="text-center mb-6 text-gray-600 font-serif">Log in to your account</p>
      
      {loginError && (
        <div className="text-darkRed text-sm text-center mb-4 p-2 bg-red-50 rounded">
          {loginError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            autoComplete="username email"
            className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-darkRed"
          />
          {errors.email && <span className="text-darkRed text-xs block mt-1">{errors.email.message}</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            autoComplete="current-password"
            className="w-full px-3 py-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-darkRed"
          />
          {errors.password && <span className="text-darkRed text-xs block mt-1">{errors.password.message}</span>}
        </div>

        <div className="flex justify-end mb-4">
          <a href="/forgot-password" className="text-sm text-darkRed font-serif hover:text-lightRed">
            Forgot Password?
          </a>
        </div>

        <div>
          <Button
            text={isSubmitting ? "Logging in..." : "Log In"}
            type="submit"
            size="medium"
            textColor="text-white"
            bgColor="bg-darkRed"
            className="w-full hover:bg-lightRed"
            disabled={isSubmitting}
          />
        </div>
      </form>

      <Separator text="Or" />

      <div>
        <SocialLoginButtons />
      </div>
    </div>
  );
};

export default LogIn;