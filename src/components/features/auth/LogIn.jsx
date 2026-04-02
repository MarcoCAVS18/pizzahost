// components/features/auth/LogIn.jsx (Refactorizado con useErrorHandler)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SocialLoginButtons from './SocialLoginButtons';
import { logIn } from '../../../services/authService';
import Separator from '../../ui/Separator';
import Button from '../../ui/Button';
// Importar el esquema de validación centralizado
import { loginSchema } from '../../../utils/validationSchemas';
// Importar el hook de manejo de errores
import useErrorHandler from '../../../hooks/useErrorHandler';

const LogIn = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Configurar el manejador de errores con mensajes específicos
  const errorMessages = {
    'auth/wrong-password': 'Incorrect email or password.',
    'auth/user-not-found': 'No account exists with this email.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
    'auth/invalid-email': 'Please enter a valid email address.',
  };
  
  const { error: loginError, executeWithErrorHandling } = useErrorHandler({ 
    errorMessages,
    defaultMessage: 'An unexpected error occurred during login. Please try again.'
  });
  
  // Usar el esquema de validación centralizado
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Usar el manejador de errores para ejecutar la función de login
      await executeWithErrorHandling(async () => {
        await logIn(data.email, data.password);
        
        // Esperar un momento para asegurar que el estado de autenticación se actualice
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      });
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
