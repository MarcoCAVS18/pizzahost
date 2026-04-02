// src/components/features/checkout/PaymentForm.jsx
import React, { useState, useEffect } from 'react';
import Button from '../../ui/Button';
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';
import { SiCashapp } from 'react-icons/si'; // Using a different icon that exists in the library
import BillingAddressForm from './BillingAddressForm';

const PaymentForm = ({ onSubmit, onBack, total, email = '' }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [confirmEmail, setConfirmEmail] = useState(email || '');
  const [emailError, setEmailError] = useState('');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Update email when the prop changes
  useEffect(() => {
    if (email && !confirmEmail) {
      setConfirmEmail(email);
    }
  }, [email, confirmEmail]);

  const validateEmail = (value) => {
    if (!value.trim()) return 'Email is required for order confirmation';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const validateCard = () => {
    const newErrors = {};
    
    if (paymentMethod !== 'credit-card') return true;
    
    // Only validate card details if credit card is selected
    if (!cardDetails.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!cardDetails.cardHolder.trim()) {
      newErrors.cardHolder = 'Cardholder name is required';
    }
    
    if (!cardDetails.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Use MM/YY format';
    } else {
      // Validate that card is not expired
      const [month, year] = cardDetails.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
      const today = new Date();
      if (expiryDate < today) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    if (!cardDetails.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setConfirmEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    const emailValidationError = validateEmail(confirmEmail);
    setEmailError(emailValidationError);
    
    // Validate card details if credit card is selected
    const isCardValid = validateCard();
    
    if (emailValidationError || !isCardValid) {
      return;
    }
    
    // Simulate payment processing
    setIsProcessing(true);
    
    setTimeout(() => {
      const paymentData = {
        method: paymentMethod,
        sameAsShipping,
        details: paymentMethod === 'credit-card' ? cardDetails : {},
        timestamp: new Date().toISOString()
      };
      
      onSubmit(paymentData, confirmEmail);
      setIsProcessing(false);
    }, 1500);
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="py-4">
      <h2 className="text-xl font-oldstyle italic font-semibold mb-4">Select Payment Method</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        <button
          type="button"
          onClick={() => handlePaymentMethodChange('credit-card')}
          className={`py-4 px-2 sm:px-4 rounded-lg flex flex-col items-center justify-center transition-colors ${
            paymentMethod === 'credit-card' ? 'bg-darkRed/10 border-2 border-darkRed' : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <FaCreditCard className={`text-2xl mb-2 ${paymentMethod === 'credit-card' ? 'text-darkRed' : 'text-gray-600'}`} />
          <span className={`text-sm font-serif ${paymentMethod === 'credit-card' ? 'text-darkRed font-semibold' : 'text-gray-600'}`}>Credit Card</span>
        </button>
        
        <button
          type="button"
          onClick={() => handlePaymentMethodChange('paypal')}
          className={`py-4 px-2 sm:px-4 rounded-lg flex flex-col items-center justify-center transition-colors ${
            paymentMethod === 'paypal' ? 'bg-darkRed/10 border-2 border-darkRed' : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <FaPaypal className={`text-2xl mb-2 ${paymentMethod === 'paypal' ? 'text-darkRed' : 'text-gray-600'}`} />
          <span className={`text-sm font-serif ${paymentMethod === 'paypal' ? 'text-darkRed font-semibold' : 'text-gray-600'}`}>PayPal</span>
        </button>
        
        <button
          type="button"
          onClick={() => handlePaymentMethodChange('apple-pay')}
          className={`py-4 px-2 sm:px-4 rounded-lg flex flex-col items-center justify-center transition-colors ${
            paymentMethod === 'apple-pay' ? 'bg-darkRed/10 border-2 border-darkRed' : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <FaApplePay className={`text-2xl mb-2 ${paymentMethod === 'apple-pay' ? 'text-darkRed' : 'text-gray-600'}`} />
          <span className={`text-sm font-serif ${paymentMethod === 'apple-pay' ? 'text-darkRed font-semibold' : 'text-gray-600'}`}>Apple Pay</span>
        </button>

        <button
          type="button"
          onClick={() => handlePaymentMethodChange('google-pay')}
          className={`py-4 px-2 sm:px-4 rounded-lg flex flex-col items-center justify-center transition-colors ${
            paymentMethod === 'google-pay' ? 'bg-darkRed/10 border-2 border-darkRed' : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <FaGooglePay className={`text-2xl mb-2 ${paymentMethod === 'google-pay' ? 'text-darkRed' : 'text-gray-600'}`} />
          <span className={`text-sm font-serif ${paymentMethod === 'google-pay' ? 'text-darkRed font-semibold' : 'text-gray-600'}`}>Google Pay</span>
        </button>
        
        <button
          type="button"
          onClick={() => handlePaymentMethodChange('afterpay')}
          className={`py-4 px-2 sm:px-4 rounded-lg flex flex-col items-center justify-center transition-colors ${
            paymentMethod === 'afterpay' ? 'bg-darkRed/10 border-2 border-darkRed' : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <SiCashapp className={`text-2xl mb-2 ${paymentMethod === 'afterpay' ? 'text-darkRed' : 'text-gray-600'}`} />
          <span className={`text-sm font-serif ${paymentMethod === 'afterpay' ? 'text-darkRed font-semibold' : 'text-gray-600'}`}>AfterPay</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email for confirmation */}
        <div className="mb-4">
          <label className="block text-sm font-serif text-gray-600 mb-1">
            Email for order confirmation <span className="text-darkRed">*</span>
          </label>
          <input
            type="email"
            value={confirmEmail}
            onChange={handleEmailChange}
            placeholder="your.email@example.com"
            className={`mt-1 block w-full px-4 py-2 border rounded-md bg-transparent font-serif ${
              emailError ? 'border-darkRed' : 'border-gray-300'
            }`}
          />
          {emailError && (
            <p className="mt-1 text-xs text-red-500 font-serif">{emailError}</p>
          )}
        </div>
        
        {/* Credit Card Form */}
        {paymentMethod === 'credit-card' && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <h3 className="font-serif font-semibold mb-3">Credit Card Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-serif text-gray-600 mb-1">
                  Card Number <span className="text-darkRed">*</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={(e) => {
                    e.target.value = formatCardNumber(e.target.value);
                    handleCardInputChange(e);
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md bg-transparent font-serif ${
                    errors.cardNumber ? 'border-darkRed' : 'border-gray-300'
                  }`}
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-xs text-red-500 font-serif">{errors.cardNumber}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-serif text-gray-600 mb-1">
                  Cardholder Name <span className="text-darkRed">*</span>
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={cardDetails.cardHolder}
                  onChange={handleCardInputChange}
                  placeholder="Your name"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md bg-transparent font-serif ${
                    errors.cardHolder ? 'border-darkRed' : 'border-gray-300'
                  }`}
                />
                {errors.cardHolder && (
                  <p className="mt-1 text-xs text-red-500 font-serif">{errors.cardHolder}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-serif text-gray-600 mb-1">
                    Expiry Date <span className="text-darkRed">*</span>
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={`mt-1 block w-full px-4 py-2 border rounded-md bg-transparent font-serif ${
                      errors.expiryDate ? 'border-darkRed' : 'border-gray-300'
                    }`}
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-xs text-red-500 font-serif">{errors.expiryDate}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-serif text-gray-600 mb-1">
                    CVV <span className="text-darkRed">*</span>
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    placeholder="123"
                    maxLength="4"
                    className={`mt-1 block w-full px-4 py-2 border rounded-md bg-transparent font-serif ${
                      errors.cvv ? 'border-darkRed' : 'border-gray-300'
                    }`}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-xs text-red-500 font-serif">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* PayPal */}
        {paymentMethod === 'paypal' && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 text-center">
            <p className="font-serif text-gray-600 mb-2">
              You will be redirected to PayPal to complete your payment after clicking "Place Order"
            </p>
            <div className="flex justify-center">
              <FaPaypal className="text-5xl text-blue-600" />
            </div>
          </div>
        )}
        
        {/* Apple Pay */}
        {paymentMethod === 'apple-pay' && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 text-center">
            <p className="font-serif text-gray-600 mb-2">
              Complete your purchase with Apple Pay
            </p>
            <div className="flex justify-center">
              <FaApplePay className="text-5xl text-black" />
            </div>
          </div>
        )}

        {/* Google Pay */}
        {paymentMethod === 'google-pay' && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 text-center">
            <p className="font-serif text-gray-600 mb-2">
              Complete your purchase with Google Pay
            </p>
            <div className="flex justify-center">
              <FaGooglePay className="text-5xl text-blue-500" />
            </div>
          </div>
        )}

        {/* AfterPay */}
        {paymentMethod === 'afterpay' && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 text-center">
            <p className="font-serif text-gray-600 mb-2">
              Pay in 4 interest-free installments
            </p>
            <p className="text-xs text-gray-500 mb-2">
              First payment today, then every 2 weeks
            </p>
            <div className="flex justify-center">
              <SiCashapp className="text-4xl text-green-600" />
            </div>
          </div>
        )}
        
        {/* Billing address */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="sameAsShipping"
              checked={sameAsShipping}
              onChange={() => setSameAsShipping(!sameAsShipping)}
              className="mr-2"
            />
            <label htmlFor="sameAsShipping" className="text-sm font-serif text-gray-600">
              Billing address same as shipping address
            </label>
          </div>
          
          {!sameAsShipping && (
            <BillingAddressForm />
          )}
        </div>
        
        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <h3 className="font-serif font-semibold mb-3">Order Summary</h3>
          
          <div className="space-y-2 mb-3">
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Subtotal</span>
              <span className="font-medium">${parseFloat(total).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Tax</span>
              <span className="font-medium">${(parseFloat(total) * 0.1).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-300 pt-2">
            <div className="flex justify-between">
              <span className="font-serif font-bold">Total</span>
              <span className="font-bold text-darkRed">
                ${(parseFloat(total) * 1.1).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            text="Back to Shipping"
            onClick={onBack}
            size="medium"
            textColor="text-gray-700"
            bgColor="bg-gray-200"
            className="hover:bg-gray-300"
          />
          
          <Button
            text={isProcessing ? "Processing..." : "Place Order"}
            type="submit"
            size="medium"
            textColor="text-white"
            bgColor="bg-darkRed"
            className="hover:bg-lightRed"
            disabled={isProcessing}
          />
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;