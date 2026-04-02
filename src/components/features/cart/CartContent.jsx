// components/features/cart/CartContent.jsx
import React from 'react';
import CartHeader from './CartHeader';
import CartItemsList from './CartItemsList';
import CartSidebar from './CartSidebar';
import CartRecommendations from './recommendations/CartRecommendations';
import Separator from '../../ui/Separator';

const CartContent = () => {
  return (
    <div className="min-h-screen p-6 bg-beige mt-8">
      <div className="max-w-6xl mx-auto">
        <CartHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,auto,1fr] gap-0">
          <div>
            <CartItemsList />
            <CartRecommendations />
          </div>
          <Separator orientation="vertical" />
          <CartSidebar />
        </div>
      </div>
    </div>
  );
};

export default CartContent;