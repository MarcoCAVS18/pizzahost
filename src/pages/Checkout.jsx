// src/pages/Checkout.jsx
import React from 'react';
import { usePageLoader } from '../hooks/usePageLoader';
import CheckoutContainer from '../components/features/checkout/CheckoutContainer';

const Checkout = ({ setIsLoading }) => {
  usePageLoader(setIsLoading, 800);

  return (
    <div>
      <CheckoutContainer />
    </div>
  );
};

export default Checkout;