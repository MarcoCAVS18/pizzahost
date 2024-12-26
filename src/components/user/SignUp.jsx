// SignUp.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const SignUp = () => {
  const signUpSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold mb-6 font-oldstyle italic text-center">Sign Up</h2>
      <p className="text-center mb-8 font-oldstyle text-gray-600">Don't have an account yet?</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="First Name"
              {...register('firstName')}
              className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-darkRed transition-colors"
            />
            {errors.firstName && <span className="text-red-500 text-sm block mt-1">{errors.firstName.message}</span>}
          </div>
          
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Last Name"
              {...register('lastName')}
              className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-darkRed transition-colors"
            />
            {errors.lastName && <span className="text-red-500 text-sm block mt-1">{errors.lastName.message}</span>}
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            autoComplete="username"
            {...register('email')}
            className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-darkRed transition-colors"
          />
          {errors.email && <span className="text-red-500 text-sm block mt-1">{errors.email.message}</span>}
        </div>

        <div className="space-y-2">
          <input
            type="tel"
            placeholder="Phone Number"
            {...register('phone')}
            className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-darkRed transition-colors"
          />
          {errors.phone && <span className="text-red-500 text-sm block mt-1">{errors.phone.message}</span>}
        </div>

        <div className="space-y-2">
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...register('password')}
            className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-darkRed transition-colors"
          />
          {errors.password && <span className="text-red-500 text-sm block mt-1">{errors.password.message}</span>}
        </div>

        <div className="space-y-2">
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-darkRed transition-colors"
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm block mt-1">{errors.confirmPassword.message}</span>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-darkRed text-white px-6 py-3 rounded-md hover:bg-lightRed transition duration-200 font-oldstyle text-lg"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;