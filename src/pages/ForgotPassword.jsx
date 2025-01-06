// components/pages/ForgotPassword.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { resetPassword } from '../services/authService';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      await resetPassword(data.email);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-lightBeige min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg md:max-w-2xl">
        <h2 className="text-4xl font-bold mb-8 font-oldstyle italic text-center">
          Reset Password
        </h2>

        {!success ? (
          <>
            <p className="text-center text-gray-600 mb-8 font-oldstyle">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className="w-full px-4 md:px-6 py-3 bg-transparent border-b-2 border-gray-300 focus:border-darkRed focus:outline-none transition-colors"
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm block mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="pt-4">
                <Button
                  text={isLoading ? 'Sending...' : 'Send Reset Link'}
                  type="submit"
                  size="medium"
                  textColor="text-white"
                  bgColor="bg-darkRed"
                  className="w-full hover:bg-lightRed disabled:opacity-50 disabled:cursor-not-allowed mb-8"
                  disabled={isLoading}
                />
              </div>
            </form>
          </>
        ) : (
          <div className="text-center font-serif">
            <div className="mb-6 p-4">
              Password reset link has been sent to your email address.
              Please check your inbox and follow the instructions.
            </div>
            <p className="text-gray-600 mt-4">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <Button
              text="Try Again"
              onClick={() => setSuccess(false)}
              size="medium"
              textColor="text-darkRed"
              bgColor="bg-transparent"
              className="hover:text-lightRed underline my-4 font-oldstyle"
            />
          </div>
        )}

        <div className="text-center">
          <Link to="/user">
            <Button
              text="Back to Login"
              size="medium"
              textColor="text-white"
              bgColor="bg-gray-700"
              className="hover:text-lightRed, hover:bg-gray-500"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;