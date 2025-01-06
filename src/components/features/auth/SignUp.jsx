// components/features/user/SignUp.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signUp } from '../../../services/authService';
import Button from '../../ui/Button';

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

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password);
      console.log('User signed up successfully');
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-3xl font-bold italic font-oldstyle mb-4 text-center text-gray-800 break-words">Create an Account</h2>
      <p className="text-center mb-6 text-gray-600 font-serif">Join our community today!</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-[22.5px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              placeholder="First Name"
              {...register('firstName')}
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-darkRed bg-transparent"
            />
            {errors.firstName && <span className="text-red-500 text-xs block mt-1">{errors.firstName.message}</span>}
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Last Name"
              {...register('lastName')}
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-darkRed bg-transparent"
            />
            {errors.lastName && <span className="text-red-500 text-xs block mt-1">{errors.lastName.message}</span>}
          </div>
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-darkRed bg-transparent"
          />
          {errors.email && <span className="text-red-500 text-xs block mt-1">{errors.email.message}</span>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            {...register('phone')}
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-darkRed bg-transparent"
          />
          {errors.phone && <span className="text-red-500 text-xs block mt-1">{errors.phone.message}</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-darkRed bg-transparent"
          />
          {errors.password && <span className="text-red-500 text-xs block mt-1">{errors.password.message}</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-darkRed bg-transparent"
          />
          {errors.confirmPassword && <span className="text-red-500 text-xs block mt-1">{errors.confirmPassword.message}</span>}
        </div>

        <div className="pt-2">
          <Button
            text="Sign Up"
            type="submit"
            size="medium"
            textColor="text-white"
            bgColor="bg-darkRed"
            className="w-full hover:bg-lightRed"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;