// LogIn.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const LogIn = () => {
  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold mb-8 font-oldstyle italic text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-100 focus:border-darkRed focus:outline-none transition-colors"
          />
          {errors.email && <span className="text-red-500 text-sm block mt-1">{errors.email.message}</span>}
        </div>
        <div className="space-y-2">
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-100 focus:outline-none focus:border-darkRed transition-colors"
          />
          {errors.password && <span className="text-red-500 text-sm block mt-1">{errors.password.message}</span>}
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-darkRed text-white px-6 py-3 rounded-md hover:bg-lightRed transition duration-200 font-oldstyle text-lg"
          >
            Login
          </button>
        </div>
      </form>
      <p className="mt-6 text-center font-oldstyle">
        <a href="/forgot-password" className="text-darkRed hover:text-lightRed underline transition-colors">
          Forgot your password?
        </a>
      </p>
    </div>
  );
};

export default LogIn;