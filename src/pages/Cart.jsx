import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import CartItem from '../components/features/cart/CartItem';
import Button from '../components/ui/Button';
import Separator from '../components/ui/Separator';
import { useCart } from '../hoks/useCart';
import { useNavigate } from 'react-router-dom';
import { usePageLoader } from '../hoks/usePageLoader';
import CartSummary from '../components/features/cart/CartSummary';
import CheckoutShippingInfo from '../components/features/cart/CheckoutShippingInfo';
import ClearCartButton from '../components/features/cart/ClearCartButton';

const Cart = ({ setIsLoading }) => {
  const navigate = useNavigate();
  usePageLoader(setIsLoading);
  const { items, updateQuantity, removeItem, updateIngredients, isEmpty } = useCart();

  const handleRemoveItem = (item) => {
    removeItem(item);
  };

  if (isEmpty) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-beige">
        <FaShoppingCart className="text-9xl text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 font-oldstyle italic">Your cart is empty</h2>
        <p className="text-gray-600 font-serif mb-4">Add some products to your cart to see them here</p>
        <Button
          text="Continue Shopping"
          onClick={() => navigate('/menu#menu-section')}
          textColor="text-white"
          bgColor="bg-darkRed"
          hoverColor="hover:bg-lightRed"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-beige mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center my-8">
          <h1 className="text-3xl font-bold font-oldstyle italic">Shopping Cart</h1>
          <ClearCartButton />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,auto,1fr] gap-0">
          <div className="space-y-4">
            {items.map((item, index) => (
              <React.Fragment key={`${item.id}-${item.selectedSize}`}>
                <CartItem
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  quantity={item.quantity}
                  basePrice={item.basePrice}
                  selectedSize={item.selectedSize}
                  ingredients={item.ingredients}
                  extras={item.extras}
                  onUpdateQuantity={updateQuantity}
                  onRemove={handleRemoveItem}
                  onUpdateIngredients={updateIngredients}
                  sizes={item.sizes}
                />
                {index < items.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>

          <Separator orientation="vertical" />

          <div className="lg:sticky lg:top-20 flex flex-col">
            <CheckoutShippingInfo />
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;