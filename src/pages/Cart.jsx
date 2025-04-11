// pages/Cart.jsx
import React from 'react';
import CartContainer from '../components/features/cart/CartContainer';
import { usePageLoader } from '../hooks/usePageLoader';

const Cart = ({ setIsLoading }) => {
  usePageLoader(setIsLoading);

  return <CartContainer />;
};

export default Cart;