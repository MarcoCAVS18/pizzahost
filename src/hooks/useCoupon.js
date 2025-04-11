// src/hooks/useCoupon.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { validateCoupon } from '../services/couponService';
import { useCart } from './useCart';

export const useCoupon = (
  subtotalOverride = null, 
  shippingCostOverride = null, 
  cartItemsOverride = null, 
  userHasOrderedOverride = false,
  onDiscountApplied = null
) => {
  const { total: cartTotal, items: cartItems } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState({
    discountAmount: 0,
    discountedShipping: 0,
    originalShipping: 0,
    discountType: null,
    discountDescription: '',
    couponCode: null,
    couponId: null,
    minOrderValue: 0,
    applicableCategory: 'all'
  });
  const [validationMessage, setValidationMessage] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);

  // Usar el subtotal del carrito o el override (memoizado)
  const subtotal = useMemo(() => 
    subtotalOverride !== null ? subtotalOverride : parseFloat(cartTotal || 0)
  , [subtotalOverride, cartTotal]);

  // Determinar el costo de envío (memoizado)
  const originalShipping = useMemo(() => 
    shippingCostOverride !== null ? shippingCostOverride : (subtotal > 50 ? 0 : 5)
  , [shippingCostOverride, subtotal]);

  // Usar los items del carrito o el override (memoizado)
  const currentCartItems = useMemo(() => 
    cartItemsOverride || cartItems || []
  , [cartItemsOverride, cartItems]);

  // Calcular descuento basado en tipo de cupón y productos aplicables
  const calculateDiscount = useCallback((coupon, items, subTotal, shippingCost) => {
    if (!coupon) {
      return {
        discountAmount: 0,
        discountedShipping: shippingCost,
        originalShipping: shippingCost,
        discountType: null,
        discountDescription: '',
        couponCode: null,
        couponId: null,
        minOrderValue: 0,
        applicableCategory: 'all'
      };
    }

    let discountAmount = 0;
    let discountedShipping = shippingCost;
    
    // Si el cupón está restringido a ciertos productos
    if (coupon.applyTo !== 'all') {
      // Calcular el subtotal de solo los productos aplicables
      const applicableSubtotal = items.reduce((sum, item) => {
        if (item.category === coupon.applyTo) {
          const itemPrice = item.price || 0;
          const itemQuantity = item.quantity || 1;
          return sum + (itemPrice * itemQuantity);
        }
        return sum;
      }, 0);
      
      
      // Calcular el descuento solo sobre productos aplicables
      switch (coupon.type) {
        case 'percentage':
          discountAmount = (coupon.value / 100) * applicableSubtotal;
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
          break;
        
        case 'fixed':
          discountAmount = Math.min(coupon.value, applicableSubtotal);
          break;
          
        default:
          break;
      }
    } else {
      // Descuento sobre el total (comportamiento normal)
      switch (coupon.type) {
        case 'percentage':
          discountAmount = (coupon.value / 100) * subTotal;
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
          break;
          
        case 'fixed':
          discountAmount = Math.min(coupon.value, subTotal);
          break;
          
        case 'shipping':
          // Envío gratis o descuento en envío
          discountedShipping = coupon.value === 100 ? 0 : shippingCost * (1 - (coupon.value / 100));
          break;
          
        default:
          break;
      }
    }
    
    return {
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      discountedShipping: parseFloat(discountedShipping.toFixed(2)),
      originalShipping: shippingCost,
      discountType: coupon.type,
      discountDescription: coupon.description,
      couponCode: coupon.code,
      couponId: coupon.id,
      minOrderValue: coupon.minOrderValue,
      applicableCategory: coupon.applyTo
    };
  }, []);

  // Calcular el total final con descuento
  const calculateFinalTotal = useCallback((subTotal, discountInfo) => {
    const discountedSubtotal = subTotal - discountInfo.discountAmount;
    return discountedSubtotal + discountInfo.discountedShipping;
  }, []);

  // Actualizar el descuento cuando cambia el subtotal, items o envío
  useEffect(() => {
    if (appliedCoupon && appliedCoupon.isValid) {
      const newDiscount = calculateDiscount(
        appliedCoupon.coupon,
        currentCartItems,
        subtotal,
        originalShipping
      );
      
      // Evitar actualizaciones innecesarias
      if (
        newDiscount.discountAmount !== discount.discountAmount ||
        newDiscount.discountedShipping !== discount.discountedShipping
      ) {
        setDiscount(newDiscount);
        
        // Notificar al componente padre si hay cambios
        if (onDiscountApplied) {
          const finalTotal = calculateFinalTotal(subtotal, newDiscount);
          onDiscountApplied({
            ...newDiscount,
            total: finalTotal
          });
        }
      }
    } else if (
      discount.discountAmount !== 0 ||
      discount.discountedShipping !== originalShipping ||
      discount.couponCode !== null
    ) {
      // Reiniciar el descuento si no hay cupón aplicado
      const resetDiscount = {
        discountAmount: 0,
        discountedShipping: originalShipping,
        originalShipping: originalShipping,
        discountType: null,
        discountDescription: '',
        couponCode: null,
        couponId: null,
        minOrderValue: 0,
        applicableCategory: 'all'
      };
      
      setDiscount(resetDiscount);
      
      // Notificar al componente padre del reinicio
      if (onDiscountApplied) {
        onDiscountApplied({
          ...resetDiscount,
          total: subtotal + originalShipping
        });
      }
    }
  }, [
    appliedCoupon, 
    subtotal, 
    originalShipping, 
    currentCartItems, 
    calculateDiscount, 
    calculateFinalTotal, 
    discount, 
    onDiscountApplied
  ]);

  // Manejar cambio en el código del cupón
  const handleCouponChange = useCallback((event) => {
    setCouponCode(event.target.value);
    // Limpiar mensajes de validación al cambiar el cupón
    if (validationStatus) {
      setValidationStatus(null);
      setValidationMessage('');
    }
  }, [validationStatus]);

  // Aplicar cupón
  const applyCoupon = useCallback(async () => {
    console.log('Applying Coupon Debug:');
    console.log('Subtotal:', subtotal);
    console.log('Cart Items:', currentCartItems);
    console.log('Coupon Code:', couponCode);

    if (!couponCode.trim()) {
      setValidationStatus('error');
      setValidationMessage('Please enter a coupon code');
      return;
    }

    setIsValidating(true);
    setValidationStatus(null);
    setValidationMessage('');

    try {
      // Construir objeto con detalles de la orden para validación
      const orderDetails = {
        subtotal,
        items: currentCartItems,
        hasOrdered: userHasOrderedOverride
      };

      // Validar el cupón
      const validation = await validateCoupon(couponCode, orderDetails);
      console.log('Validation Result:', validation);

      if (validation.isValid) {
        setAppliedCoupon(validation);
        setValidationStatus('success');
        setValidationMessage(validation.message);
        
        // Calcular el descuento
        const newDiscount = calculateDiscount(
          validation.coupon,
          currentCartItems,
          subtotal,
          originalShipping
        );
        
        console.log('New Discount:', newDiscount);
        setDiscount(newDiscount);
        
        // Notificar al componente padre
        if (onDiscountApplied) {
          const finalTotal = calculateFinalTotal(subtotal, newDiscount);
          onDiscountApplied({
            ...newDiscount,
            total: finalTotal
          });
        }
      } else {
        setAppliedCoupon(null);
        setValidationStatus('error');
        setValidationMessage(validation.message);
        
        // Reiniciar el descuento
        const resetDiscount = {
          discountAmount: 0,
          discountedShipping: originalShipping,
          originalShipping: originalShipping,
          discountType: null,
          discountDescription: '',
          couponCode: null,
          couponId: null,
          minOrderValue: 0,
          applicableCategory: 'all'
        };
        
        setDiscount(resetDiscount);
        
        // Notificar al componente padre
        if (onDiscountApplied) {
          onDiscountApplied({
            ...resetDiscount,
            total: subtotal + originalShipping
          });
        }
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      setValidationStatus('error');
      setValidationMessage('An error occurred. Please try again.');
      
      // Reiniciar en caso de error
      setAppliedCoupon(null);
      
      const resetDiscount = {
        discountAmount: 0,
        discountedShipping: originalShipping,
        originalShipping: originalShipping,
        discountType: null,
        discountDescription: '',
        couponCode: null,
        couponId: null,
        minOrderValue: 0,
        applicableCategory: 'all'
      };
      
      setDiscount(resetDiscount);
      
      // Notificar al componente padre
      if (onDiscountApplied) {
        onDiscountApplied({
          ...resetDiscount,
          total: subtotal + originalShipping
        });
      }
    } finally {
      setIsValidating(false);
    }
  }, [
    couponCode, 
    subtotal, 
    currentCartItems, 
    userHasOrderedOverride, 
    originalShipping, 
    calculateDiscount, 
    calculateFinalTotal, 
    onDiscountApplied
  ]);

  const removeCoupon = useCallback(() => {
    console.log('useCoupon - Removiendo cupón');
    
    // Limpiar estados inmediatamente
    setCouponCode('');
    setAppliedCoupon(null);
    setValidationStatus(null);
    setValidationMessage('');
    
    // Calcular shipping correcto basado en el subtotal actual
    const currentShipping = subtotal > 50 ? 0 : 5;
    
    // Crear objeto de reset
    const resetDiscount = {
      discountAmount: 0,
      discountedShipping: currentShipping,
      originalShipping: currentShipping,
      discountType: null,
      discountDescription: '',
      couponCode: null,
      couponId: null,
      applicableCategory: 'all',
      couponRemoved: true
    };
    
    // Actualizar estado de descuento
    setDiscount(resetDiscount);
    
    // Notificar al componente padre de manera explícita
    if (onDiscountApplied) {
      console.log('useCoupon - Notificando eliminación de cupón:', {
        ...resetDiscount,
        total: subtotal + currentShipping
      });
      
      onDiscountApplied({
        ...resetDiscount,
        total: subtotal + currentShipping
      });
    }
  }, [subtotal, onDiscountApplied]);

  return {
    couponCode,
    appliedCoupon,
    discount,
    validationMessage,
    validationStatus,
    isValidating,
    handleCouponChange,
    applyCoupon,
    removeCoupon,
    calculateFinalTotal: (customSubtotal = subtotal) => calculateFinalTotal(customSubtotal, discount)
  };
};

export default useCoupon;