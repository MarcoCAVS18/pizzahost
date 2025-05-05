// src/components/features/cart/CartSummary.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import Button from '../../ui/Button';
import Separator from '../../ui/Separator';
import ApplyCoupon from './ApplyCoupon';

const CartSummary = () => {
  const navigate = useNavigate();
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

  // Using the total calculated by the store (making sure it's a number)
  const subtotal = parseFloat(total || 0);
  
  // Define shipping based on subtotal
  const originalShipping = subtotal > 50 ? 0 : 5;
  
  // Need to modify this logic to ensure that when coupon is removed, shipping is originalShipping
  let shipping = originalShipping; // Start with base value
  
  // Only use discountedShipping value if there's an applied coupon AND it hasn't been removed
  if (discountInfo.couponCode && !discountInfo.couponRemoved) {
    shipping = typeof discountInfo.discountedShipping === 'number' ? 
      discountInfo.discountedShipping : originalShipping;
  }
  
  // Make sure discount is a number
  const discountAmount = typeof discountInfo.discountAmount === 'number' ? discountInfo.discountAmount : 0;
  
  // Calculate final total manually to ensure it correctly reflects discounts
  const finalTotal = discountInfo.couponCode && !discountInfo.couponRemoved
    ? (subtotal - discountAmount) + shipping
    : subtotal + shipping;

  // Handle the application of discounts (memoized to avoid recreations)
  const handleDiscountApplied = useCallback((discountData) => {
    console.log("Discount data received:", discountData);
    
    // If a coupon has been removed, do a complete reset
    if (discountData.couponRemoved) {
      console.log("CartSummary - Detected coupon removal, resetting state");
      const correctShipping = subtotal > 50 ? 0 : 5;
      
      // Reset all values
      setDiscountInfo({
        discountAmount: 0,
        discountedShipping: correctShipping, // Use recalculated value
        originalShipping: correctShipping,   // Use recalculated value
        total: subtotal + correctShipping,
        couponCode: null,
        couponId: null,
        couponRemoved: false
      });
      
      // To ensure the UI updates correctly
      setTimeout(() => {
        setDiscountInfo(prev => ({
          ...prev,
          couponRemoved: false
        }));
      }, 100);
      
      return;
    }
    
    // Validate received data to avoid undefined values
    const validatedData = {
      discountAmount: typeof discountData.discountAmount === 'number' ? discountData.discountAmount : 0,
      discountedShipping: typeof discountData.discountedShipping === 'number' ? discountData.discountedShipping : originalShipping,
      originalShipping: typeof discountData.originalShipping === 'number' ? discountData.originalShipping : originalShipping,
      // Calculate total manually if not provided in the data
      total: typeof discountData.total === 'number' 
        ? discountData.total 
        : (subtotal - (typeof discountData.discountAmount === 'number' ? discountData.discountAmount : 0)) + 
          (typeof discountData.discountedShipping === 'number' ? discountData.discountedShipping : originalShipping),
      couponCode: discountData.couponCode || null,
      couponId: discountData.couponId || null,
      couponRemoved: false
    };
    
    console.log("CartSummary - Validated data:", validatedData);
    
    // Normal processing to apply coupon
    setDiscountInfo(validatedData);
  }, [subtotal, originalShipping]);

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <div className="bg-beige p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 font-serif">Order Summary</h2>

      <div className="space-y-2 mb-4">
        {/* Subtotal line - with value verification */}
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
        
        {/* Shipping line - with value verification */}
        <div className="flex justify-between font-serif">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <Separator />
      </div>

      {/* Component to apply coupons */}
      <ApplyCoupon onDiscountApplied={handleDiscountApplied} />

      {/* Total line - with value verification */}
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
        onClick={handleCheckout}
      />
    </div>
  );
};

export default CartSummary;