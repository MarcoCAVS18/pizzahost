// components/features/cart/CartSidebar.jsx

import React from 'react';
import CheckoutShippingInfo from './CheckoutShippingInfo';
import CartSummary from './CartSummary';

const CartSidebar = () => {
  return (
    <div className="lg:sticky lg:top-20 flex flex-col">
      <CheckoutShippingInfo />
      <CartSummary />
    </div>
  );
};

export default CartSidebar;