// components/features/cart/CartContainer.jsx
import React from 'react';
import { useCart } from '../../../hoks/useCart';
import EmptyCartMessage from './EmptyCartMessage';
import CartContent from './CartContent';

const CartContainer = () => {
  const { isEmpty } = useCart();

  if (isEmpty) {
    return <EmptyCartMessage />;
  }

  return <CartContent />;
};

export default CartContainer;