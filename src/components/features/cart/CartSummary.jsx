import React, { useEffect } from 'react';
import { useCart } from '../../../hoks/useCart';
import Button from '../../ui/Button';
import Separator from '../../ui/Separator';

const CartSummary = () => {
  const { items, total } = useCart();

  // Usando el total ya calculado por el store
  const subtotal = parseFloat(total);
  
  // Define el shipping y el total final
  const shipping = subtotal > 50 ? 0 : 5;
  const finalTotal = subtotal + shipping;

  // Opcional: Para depuración
  useEffect(() => {
    console.log("CartSummary - Items actualizados:", items);
    console.log("CartSummary - Total calculado:", subtotal);
  }, [items, subtotal]);

  return (
    <div className="bg-beige p-2 rounded-lg">
      <h2 className="text-xl font-bold mb-4 font-serif">Order Summary</h2>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between font-serif">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-serif">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <Separator />
      </div>

      <div className="pt-4 mb-6">
        <div className="flex justify-between font-serif">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <Button
        text="Proceed to Checkout"
        textColor="text-white"
        bgColor="bg-darkRed"
        className="w-full hover:bg-lightRed"
      />
    </div>
  );
};

export default CartSummary;