// src/components/features/checkout/CheckoutContainer.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useAuth } from '../../../context/AuthContext';
import { getUserShippingInfo } from '../../../services/userService';
import { AnimationProvider } from '../../../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../../../context/ScrollAnimation/ScrollAnimation';
import ShippingDetails from './ShippingDetails';
import PaymentForm from './PaymentForm';
import OrderConfirmation from './OrderConfirmation';
import { generateInvoice } from '../../../utils/generateInvoice';

const CheckoutContainer = () => {
  // State for checkout steps
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    shipping: null,
    payment: null,
    email: '',
    orderNumber: '',
    total: 0,
    invoiceUrl: ''
  });
  const [userShippingInfo, setUserShippingInfo] = useState(null);
  // Add a flag to prevent automatic redirect after order completion
  const [orderCompleted, setOrderCompleted] = useState(false);

  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if cart is empty and redirect if needed
  useEffect(() => {
    // Only redirect to menu if:
    // 1. Cart is empty (items.length === 0)
    // 2. We're not on the confirmation step (currentStep !== 3)
    // 3. Order is not completed (orderCompleted === false)
    // 4. Not first render
    if (items.length === 0 && currentStep !== 3 && !orderCompleted) {
      // Add delay to prevent immediate redirect on first render
      const timer = setTimeout(() => {
        navigate('/menu');
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [items, navigate, currentStep, orderCompleted]);

  // Generate a random order number when component mounts
  useEffect(() => {
    const generateOrderNumber = () => {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `ORD-${timestamp}-${random}`;
    };

    setOrderData(prev => ({
      ...prev,
      orderNumber: generateOrderNumber(),
      total: parseFloat(total)
    }));
  }, [total]);

  // Fetch user shipping info if available
  useEffect(() => {
    const fetchShippingInfo = async () => {
      if (user?.uid) {
        try {
          const data = await getUserShippingInfo(user.uid);
          if (data) {
            setUserShippingInfo({
              ...data,
              email: user.email || data.email || ''
            });
          }
        } catch (error) {
          console.error('Failed to fetch user shipping info:', error);
        }
      }
    };

    fetchShippingInfo();
  }, [user]);

  // Handle shipping details submission
  const handleShippingSubmit = (shippingData) => {
    setOrderData(prev => ({
      ...prev,
      shipping: shippingData,
      email: shippingData.email || prev.email
    }));
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  // Handle payment details submission
  const handlePaymentSubmit = (paymentData, email) => {
    try {
      // Mark order as completed to prevent redirect
      setOrderCompleted(true);
      
      // Generate invoice data (but not actual PDF yet)
      const invoiceData = generateInvoice({
        orderNumber: orderData.orderNumber,
        date: new Date(),
        customerInfo: orderData.shipping,
        items,
        subtotal: parseFloat(total),
        tax: parseFloat(total) * 0.1,
        shipping: orderData.shipping?.address ? 0 : 5,
        total: parseFloat(total) * 1.1
      });

      setOrderData(prev => ({
        ...prev,
        payment: paymentData,
        email: email || prev.email,
        invoiceData
      }));
      
      // First set the current step to 3 (confirmation)
      setCurrentStep(3);
      
      // After a short delay to ensure the step change is processed,
      // clear the cart
      setTimeout(() => {
        clearCart();
      }, 300);
      
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error processing order:', error);
      // Handle error appropriately
    }
  };

  // Handle continuing shopping after order completion
  const handleContinueShopping = () => {
    // User has explicitly chosen to continue shopping
    // We can safely navigate to menu now
    navigate('/menu');
  };

  const renderStepProgress = () => (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentStep >= 1 ? 'bg-darkRed text-white' : 'bg-gray-300 text-gray-600'
        }`}>1</div>
        <div className="ml-2 text-sm font-oldstyle">Shipping</div>
      </div>
      <div className={`flex-grow mx-2 h-1 ${currentStep >= 2 ? 'bg-darkRed' : 'bg-gray-300'}`}></div>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentStep >= 2 ? 'bg-darkRed text-white' : 'bg-gray-300 text-gray-600'
        }`}>2</div>
        <div className="ml-2 text-sm font-oldstyle">Payment</div>
      </div>
      <div className={`flex-grow mx-2 h-1 ${currentStep >= 3 ? 'bg-darkRed' : 'bg-gray-300'}`}></div>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentStep >= 3 ? 'bg-darkRed text-white' : 'bg-gray-300 text-gray-600'
        }`}>3</div>
        <div className="ml-2 text-sm font-oldstyle">Confirmation</div>
      </div>
    </div>
  );

  return (
    <AnimationProvider>
      <div className="bg-beige min-h-screen py-8 pt-28">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollAnimation delay={0}>
            <h1 className="text-3xl font-oldstyle italic font-bold text-darkRed mb-4 text-center">
              {currentStep === 1 ? 'Shipping Details' : 
               currentStep === 2 ? 'Payment Information' : 
               'Order Confirmation'}
            </h1>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            {renderStepProgress()}
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <div className="bg-darkBeige rounded-2xl shadow-2xl p-6 mb-8">
              {currentStep === 1 && (
                <ShippingDetails 
                  onSubmit={handleShippingSubmit} 
                  existingShippingInfo={userShippingInfo}
                />
              )}
              
              {currentStep === 2 && (
                <PaymentForm 
                  onSubmit={handlePaymentSubmit} 
                  total={total}
                  email={orderData.email}
                  onBack={() => setCurrentStep(1)} 
                />
              )}
              
              {currentStep === 3 && (
                <OrderConfirmation 
                  orderData={orderData}
                  onContinueShopping={handleContinueShopping}
                />
              )}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </AnimationProvider>
  );
};

export default CheckoutContainer;