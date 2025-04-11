// src/components/features/cart/CartSummary.jsx
import React, { useState, useCallback } from 'react';
import { useCart } from '../../../hooks/useCart';
import Button from '../../ui/Button';
import Separator from '../../ui/Separator';
import ApplyCoupon from './ApplyCoupon';

const CartSummary = () => {
  // Elimino la destructuración de items ya que no lo usamos (resuelve el warning)
  const { total } = useCart();
  const [discountInfo, setDiscountInfo] = useState({
    discountAmount: 0,
    discountedShipping: 0,
    originalShipping: 0,
    total: 0,
    couponCode: null,
    couponId: null,
    couponRemoved: false
  });

  // Usando el total calculado por el store (asegurarse de que sea un número)
  const subtotal = parseFloat(total || 0);
  
  // Define el shipping basado en el subtotal
  const originalShipping = subtotal > 50 ? 0 : 5;
  
  // Necesitamos modificar esta lógica para asegurarnos de que al remover el cupón, shipping sea originalShipping
  let shipping = originalShipping; // Empezamos con el valor base
  
  // Sólo usar el valor de discountedShipping si hay un cupón aplicado Y no ha sido removido
  if (discountInfo.couponCode && !discountInfo.couponRemoved) {
    shipping = typeof discountInfo.discountedShipping === 'number' ? 
      discountInfo.discountedShipping : originalShipping;
  }
  
  // Asegurar que el descuento sea un número
  const discountAmount = typeof discountInfo.discountAmount === 'number' ? discountInfo.discountAmount : 0;
  
  // Total con descuento - garantizar que todos los valores son números
  const finalTotal = discountInfo.couponCode && typeof discountInfo.total === 'number' && !discountInfo.couponRemoved
    ? discountInfo.total 
    : subtotal + shipping;


  // Manejar la aplicación de descuentos (memoizado para evitar recreaciones)
  const handleDiscountApplied = useCallback((discountData) => {
    console.log("Discount data received:", discountData);
    
    // Si se ha eliminado un cupón, hacer un reset completo
    if (discountData.couponRemoved) {
      console.log("CartSummary - Detectada eliminación de cupón, reseteando estado");
      const correctShipping = subtotal > 50 ? 0 : 5;
      
      // Reset de todos los valores
      setDiscountInfo({
        discountAmount: 0,
        discountedShipping: correctShipping, // Usar valor recalculado
        originalShipping: correctShipping,   // Usar valor recalculado
        total: subtotal + correctShipping,
        couponCode: null,
        couponId: null,
        couponRemoved: false
      });
      
      // Para asegurar que la UI se actualice correctamente
      setTimeout(() => {
        setDiscountInfo(prev => ({
          ...prev,
          couponRemoved: false
        }));
      }, 100);
      
      return;
    }
    
    // Validar los datos recibidos para evitar valores undefined
    const validatedData = {
      discountAmount: typeof discountData.discountAmount === 'number' ? discountData.discountAmount : 0,
      discountedShipping: typeof discountData.discountedShipping === 'number' ? discountData.discountedShipping : originalShipping,
      originalShipping: typeof discountData.originalShipping === 'number' ? discountData.originalShipping : originalShipping,
      total: typeof discountData.total === 'number' ? discountData.total : subtotal + originalShipping,
      couponCode: discountData.couponCode || null,
      couponId: discountData.couponId || null,
      couponRemoved: false
    };
    
    // Procesamiento normal para aplicar cupón
    setDiscountInfo(validatedData);
  }, [subtotal, originalShipping]);

  return (
    <div className="bg-beige p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 font-serif">Order Summary</h2>

      <div className="space-y-2 mb-4">
        {/* Línea de subtotal - con verificación de valores */}
        {discountAmount > 0 && !discountInfo.couponRemoved ? (
          <>
            <div className="flex justify-between font-serif">
              <span className="text-gray-600">Original Subtotal</span>
              <span className="line-through text-gray-500">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-serif">
              <span className="text-gray-600">
                Subtotal with {discountInfo.couponCode || ''}
              </span>
              <span className="font-medium text-green-600">${(subtotal - discountAmount).toFixed(2)}</span>
            </div>
          </>
        ) : (
          <div className="flex justify-between font-serif">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
        )}
        
        {/* Línea de envío - con verificación de valores */}
        <div className="flex justify-between font-serif">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <Separator />
      </div>

      {/* Componente para aplicar cupones */}
      <ApplyCoupon onDiscountApplied={handleDiscountApplied} />

      {/* Línea de total - con verificación de valores */}
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