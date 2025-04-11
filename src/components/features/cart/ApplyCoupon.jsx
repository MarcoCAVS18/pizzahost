import React from 'react';
import { useCoupon } from '../../../hooks/useCoupon';
import { TicketIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ApplyCoupon = ({ onDiscountApplied }) => {
  const {
    couponCode,
    appliedCoupon,
    discount,
    validationMessage,
    validationStatus,
    isValidating,
    handleCouponChange,
    applyCoupon,
    removeCoupon
  } = useCoupon();

  // Efecto para notificar cambios de descuento
  React.useEffect(() => {
    if (appliedCoupon && appliedCoupon.isValid) {
      console.log('ApplyCoupon - Notificando descuento:', {
        discountAmount: discount.discountAmount,
        discountedShipping: discount.discountedShipping,
        couponCode: couponCode,
        couponId: appliedCoupon.coupon?.id || null
      });
      
      onDiscountApplied({
        discountAmount: discount.discountAmount,
        discountedShipping: discount.discountedShipping,
        couponCode: couponCode,
        couponId: appliedCoupon.coupon?.id || null
      });
    }
  }, [appliedCoupon, discount, couponCode, onDiscountApplied]);

  const handleApplyCoupon = async () => {
    console.log('ApplyCoupon - Antes de aplicar cupón:', {
      couponCode,
      discount
    });
    
    await applyCoupon();
    
    console.log('ApplyCoupon - Después de aplicar cupón:', {
      couponCode,
      appliedCoupon,
      discount
    });
  };

// En ApplyCoupon.jsx

const handleRemoveCoupon = () => {
  console.log('ApplyCoupon - Antes de remover cupón:', {
    couponCode,
    appliedCoupon,
    discount,
    discountedShipping: discount.discountedShipping
  });
  
  // Llamar a la función removeCoupon
  removeCoupon();
  
  // Notificar explícitamente al componente padre
  if (onDiscountApplied) {
    const subtotal = parseFloat(discount.subtotal || 0);
    const shipping = subtotal > 50 ? 0 : 5;
    
    console.log('ApplyCoupon - Notificando reset manual:', {
      discountAmount: 0,
      discountedShipping: shipping,
      originalShipping: shipping,
      couponCode: null,
      couponId: null,
      couponRemoved: true,
      total: subtotal + shipping
    });
    
    onDiscountApplied({
      discountAmount: 0,
      discountedShipping: shipping,
      originalShipping: shipping,
      couponCode: null,
      couponId: null,
      couponRemoved: true,
      total: subtotal + shipping
    });
  }
  
  // Verificar cambios después
  setTimeout(() => {
    console.log('ApplyCoupon - Después de remover cupón:', {
      couponCode,
      appliedCoupon,
      discount,
      discountedShipping: discount.discountedShipping
    });
  }, 200);
};

  return (
    <div className="mb-4">
      <div className="relative flex items-center">
        {/* Coupon Input */}
        <div className="relative flex-grow mr-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={handleCouponChange}
            className={`
              w-full pl-10 pr-12 py-3 
              border rounded-lg 
              transition-all duration-300
              ${appliedCoupon 
                ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                : 'bg-white hover:border-darkRed focus:border-darkRed focus:ring-2 focus:ring-darkRed/20'}
            `}
            disabled={isValidating || appliedCoupon}
          />
          {/* Ticket Icon */}
          <TicketIcon 
            className={`
              absolute left-3 top-1/2 -translate-y-1/2 
              w-5 h-5 
              ${appliedCoupon 
                ? 'text-gray-400' 
                : 'text-gray-500'}
            `}
          />
        </div>

        {/* Apply/Remove Button */}
        {!appliedCoupon ? (
          <button 
            onClick={handleApplyCoupon}
            disabled={isValidating || !couponCode.trim()}
            className={`
              px-4 py-3 rounded-lg 
              flex items-center justify-center
              transition-all duration-300
              ${isValidating || !couponCode.trim() 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-darkRed text-white hover:bg-lightRed active:scale-95'}
            `}
          >
            {isValidating ? "Validating..." : "Apply"}
          </button>
        ) : (
          <button 
            onClick={handleRemoveCoupon}
            className="
              p-3 rounded-lg 
              bg-red-50 text-red-600 
              hover:bg-red-100 
              transition-all duration-300
              flex items-center justify-center
              active:scale-95
            "
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Validation Message */}
      {validationMessage && (
        <div className={`
          mt-2 px-3 py-2 rounded-lg text-sm
          ${validationStatus === 'success' 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-darkRed'}
        `}>
          {validationMessage}
        </div>
      )}
    </div>
  );
};

export default ApplyCoupon;