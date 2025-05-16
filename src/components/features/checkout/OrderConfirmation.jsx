// src/components/features/checkout/OrderConfirmation.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaCheckCircle, 
  FaEnvelope, 
  FaFilePdf,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaSpinner
} from 'react-icons/fa';
import Button from '../../ui/Button';
import { generateInvoice } from '../../../utils/generateInvoice';

const OrderConfirmation = ({ orderData, onContinueShopping }) => {
  const [generating, setGenerating] = useState(false);
  
  // Store order data in a state variable to ensure it's available after cart is cleared
  const [storedOrderData, setStoredOrderData] = useState(null);
  
  // When component mounts, store the order data
  useEffect(() => {
    if (orderData && !storedOrderData) {
      setStoredOrderData({...orderData});
    }
  }, [orderData, storedOrderData]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getPaymentMethodName = (method) => {
    switch(method) {
      case 'credit-card': return 'Credit Card';
      case 'paypal': return 'PayPal';
      case 'apple-pay': return 'Apple Pay';
      case 'afterpay': return 'AfterPay';
      case 'google-pay': return 'Google Pay';
      default: return method || 'Unknown';
    }
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 3); // Add 3 days for delivery
    
    return new Intl.DateTimeFormat('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(deliveryDate);
  };

  // Generate and download the invoice
  const handleDownloadInvoice = () => {
    if (!storedOrderData) return;
    
    setGenerating(true);
    
    // Small delay to ensure the UI updates before the potentially heavy processing
    setTimeout(() => {
      try {
        console.log("Preparing data for invoice:", storedOrderData);
        
        // Calculate the subtotal, tax and total correctly
        const subtotal = typeof storedOrderData.total === 'number' ? storedOrderData.total : 0;
        const tax = subtotal * 0.1; // 10% tax
        const shipping = 0; // Free shipping
        const total = subtotal + tax; // Total including tax
        
        // Prepare formatted items for the invoice
        const formattedItems = Array.isArray(storedOrderData.items) ? storedOrderData.items.map(item => {
          // Ensure each item has the necessary fields
          return {
            name: item.name || 'Unnamed Product',
            quantity: item.quantity || 1,
            price: typeof item.price === 'number' ? item.price : 
                   typeof item.basePrice === 'number' ? item.basePrice : 0,
            // Handle custom products
            isCustom: item.isCustom || false,
            flavors: item.flavors,
            selectedSize: item.selectedSize || 'MEDIUM'
          };
        }) : [];
        
        console.log("Calculated subtotal:", subtotal);
        console.log("Formatted items:", formattedItems);
        
        // Create data for the invoice with correct company information
        const invoiceData = {
          orderNumber: storedOrderData.orderNumber,
          date: new Date(),
          customerInfo: storedOrderData.shipping,
          email: storedOrderData.email,
          items: formattedItems,
          subtotal: subtotal,
          tax: tax,
          shipping: shipping,
          total: total,
          companyInfo: {
            name: 'Pepperoni',
            address: '103 Frank Street',
            city: 'Labrador',
            state: 'Queensland',
            postalCode: '4215',
            country: 'Australia',
            phone: '+61 7 3000 4000',
            email: 'support@pepperoni.com',
            website: 'www.pepperoni.com'
          }
        };
        
        console.log("Data prepared for generateInvoice:", invoiceData);
        
        // Generate the invoice
        const invoice = generateInvoice(invoiceData);
        console.log("Invoice generated:", invoice);
        
        // If we successfully generated the PDF, create a URL for download
        if (invoice && invoice.pdfDataUrl) {
          // Create element for download
          const link = document.createElement('a');
          link.href = invoice.pdfDataUrl;
          link.download = `Invoice-${storedOrderData.orderNumber}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          console.log("Invoice downloaded successfully");
        } else {
          console.error("Could not generate PDF URL");
          alert("Could not generate invoice. Please try again later.");
        }
      } catch (error) {
        console.error('Error generating invoice:', error);
        alert('Sorry, there was a problem generating your invoice. Please try again later.');
      } finally {
        setGenerating(false);
      }
    }, 100);
  };
  
  // Handle continue shopping button click
  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  // Render loading state if no order data
  if (!storedOrderData) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-darkRed text-2xl" />
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <FaCheckCircle className="text-green-500 text-4xl" />
        </div>
      </div>
      
      <h2 className="text-2xl font-oldstyle italic font-semibold mb-4">Order Confirmed!</h2>
      
      <p className="text-gray-600 font-serif mb-2">
        Thank you for your order. We've sent your confirmation to <strong>{storedOrderData.email}</strong>
      </p>
      
      {/* Delivery confirmation code */}
      <div className="bg-darkRed/10 border border-darkRed rounded-lg p-4 max-w-md mx-auto mb-6">
        <h3 className="font-serif font-semibold text-darkRed mb-2">Your delivery code</h3>
        <div className="bg-white py-3 px-6 rounded-md border border-darkRed/20 font-mono text-2xl font-bold">
          {storedOrderData.orderNumber.substring(4, 10)}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Please provide this code to the delivery person to receive your order
        </p>
      </div>
      
      <p className="text-gray-600 font-serif mb-8">
        We've sent your invoice to <strong>{storedOrderData.email}</strong>
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 text-left">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif font-semibold">Order Number</h3>
            <p className="text-darkRed font-mono text-lg">{storedOrderData.orderNumber}</p>
          </div>
          <div className="text-right">
            <h3 className="font-serif font-semibold">Order Date</h3>
            <p>{formatDate(new Date())}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-4">
          <h3 className="font-serif font-semibold mb-2">Order Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Payment Method</span>
              <span className="font-medium">{getPaymentMethodName(storedOrderData.payment?.method)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Subtotal</span>
              <span className="font-medium">${storedOrderData.total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Tax (10%)</span>
              <span className="font-medium">${(storedOrderData.total * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            
            <div className="flex justify-between font-semibold text-lg">
              <span className="font-serif">Total</span>
              <span className="text-darkRed">${(storedOrderData.total * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-4">
          <h3 className="font-serif font-semibold mb-2">Shipping Address</h3>
          {storedOrderData.shipping && (
            <address className="not-italic">
              <p>{storedOrderData.shipping.fullName} {storedOrderData.shipping.lastName}</p>
              <p>{storedOrderData.shipping.address}</p>
              <p>{storedOrderData.shipping.city}, {storedOrderData.shipping.state} {storedOrderData.shipping.postalCode}</p>
              <p>{storedOrderData.shipping.country || 'Australia'}</p>
              <p>Phone: {storedOrderData.shipping.phone}</p>
            </address>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-serif font-semibold mb-2">Estimated Delivery</h3>
          <p className="text-darkRed font-medium">{getEstimatedDelivery()}</p>
        </div>
      </div>
      
      {/* Contact section for invoice issues */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 text-left max-w-2xl mx-auto">
        <h3 className="font-serif font-semibold text-center mb-4">Haven't received your invoice?</h3>
        <p className="text-gray-600 font-serif mb-4 text-center">
          Don't worry, check your spam folder or contact us through one of these channels:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-darkRed/10 flex items-center justify-center text-darkRed">
              <FaEnvelope />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-sm">Email</h4>
              <p className="text-sm">support@pepperoni.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-darkRed/10 flex items-center justify-center text-darkRed">
              <FaPhone />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-sm">Phone</h4>
              <p className="text-sm">+61 7 3000 4000</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-darkRed/10 flex items-center justify-center text-darkRed">
              <FaWhatsapp />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-sm">WhatsApp</h4>
              <p className="text-sm">+61 4 5678 9000</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-darkRed/10 flex items-center justify-center text-darkRed">
              <FaInstagram />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-sm">Instagram</h4>
              <p className="text-sm">@pepperoni</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <Button
          text={generating ? "Generating..." : "Download Invoice"}
          onClick={handleDownloadInvoice}
          size="medium"
          textColor="text-darkRed"
          bgColor="bg-transparent"
          hoverColor="hover:bg-darkRed/10"
          className="border border-darkRed flex items-center justify-center gap-2"
          disabled={generating}
        >
          {generating ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            <FaFilePdf className="mr-2" />
          )}
        </Button>
        
        <Button
          text="Continue Shopping"
          onClick={handleContinueShopping}
          size="medium"
          textColor="text-white"
          bgColor="bg-darkRed"
          className="hover:bg-lightRed"
        />
      </div>
    </div>
  );
};

export default OrderConfirmation;