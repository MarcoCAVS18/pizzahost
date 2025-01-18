// components/pages/Cart.jsx
import React from 'react';
import CartItem from '../components/features/cart/CartItem';
import Button from '../components/ui/Button';
import { useCart } from '../hoks/useCart';
import { useNavigate } from 'react-router-dom';
import { usePageLoader } from '../hoks/usePageLoader';


const Cart = ({ setIsLoading }) => {
  const navigate = useNavigate();
    usePageLoader(setIsLoading);

  const {
    items,
    updateQuantity,
    removeItem,
    total,
    isEmpty
  } = useCart();

  if (isEmpty) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-beige">
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to your cart to see them here</p>
        <Button
          text="Continue Shopping"
          onClick={() => navigate('/menu')}
          textColor="text-white"
          bgColor="bg-darkRed"
          className="hover:bg-lightRed"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Resumen del carrito */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">${total}</span>
                </div>
              </div>

              <Button
                text="Proceed to Checkout"
                textColor="text-white"
                bgColor="bg-darkRed"
                className="w-full hover:bg-lightRed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
