// components/features/cart/CartHeader.jsx

import React from 'react';
import ClearCartButton from './ClearCartButton';

const CartHeader = () => {
  return (
    <div className="flex justify-between items-center my-8">
      <h1 className="text-3xl font-bold font-oldstyle italic">Shopping Cart</h1>
      <ClearCartButton />
    </div>
  );
};

export default CartHeader;