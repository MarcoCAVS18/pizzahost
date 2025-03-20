// components/features/cart/CartItemsList.jsx
import React from 'react';
import CartItem from './CartItem';
import Separator from '../../ui/Separator';
import { useCart } from '../../../hoks/useCart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartItemsList = () => {
  const { items, updateQuantity, removeItem, updateIngredients } = useCart();

  const handleRemoveItem = (item) => {
    const itemName = item.name || 'Item';
    removeItem(item);
    
    toast.error(`"${itemName}" has been removed from the cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: { top: '120px' },
    });
  };

  return (
    <div className="space-y-4">
      <ToastContainer />
      
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
            category={item.category}
            flavors={item.flavors}
            isCustom={item.isCustom}
          />
          {index < items.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartItemsList;