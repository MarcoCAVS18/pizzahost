// src/components/features/checkout/OrderConfirmation.jsx
import React, { useState } from 'react';
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
    if (!orderData) return;
    
    setGenerating(true);
    
    // Small delay to ensure the UI updates before the potentially heavy processing
    setTimeout(() => {
      try {
        console.log("Preparando datos para la factura:", orderData);
        
        // Calcular el subtotal, impuestos y total correctamente
        const subtotal = typeof orderData.total === 'number' ? orderData.total : 0;
        const tax = subtotal * 0.1; // 10% de impuestos
        const shipping = 0; // Envío gratis
        const total = subtotal + tax; // Total incluyendo impuestos
        
        // Preparar elementos formateados para la factura
        const formattedItems = Array.isArray(orderData.items) ? orderData.items.map(item => {
          // Asegurar que cada ítem tenga los campos necesarios
          return {
            name: item.name || 'Producto sin nombre',
            quantity: item.quantity || 1,
            price: typeof item.price === 'number' ? item.price : 
                   typeof item.basePrice === 'number' ? item.basePrice : 0,
            // Manejar productos personalizados
            isCustom: item.isCustom || false,
            flavors: item.flavors,
            selectedSize: item.selectedSize || 'MEDIUM'
          };
        }) : [];
        
        console.log("Subtotal calculado:", subtotal);
        console.log("Items formateados:", formattedItems);
        
        // Crear datos para la factura
        const invoiceData = {
          orderNumber: orderData.orderNumber,
          date: new Date(),
          customerInfo: orderData.shipping,
          email: orderData.email,
          items: formattedItems,
          subtotal: subtotal,
          tax: tax,
          shipping: shipping,
          total: total
        };
        
        console.log("Datos preparados para generateInvoice:", invoiceData);
        
        // Generar la factura
        const invoice = generateInvoice(invoiceData);
        console.log("Factura generada:", invoice);
        
        // Si generamos correctamente el PDF, crear la URL para descarga
        if (invoice && invoice.pdfDataUrl) {
          // Crear elemento para descargar
          const link = document.createElement('a');
          link.href = invoice.pdfDataUrl;
          link.download = `Factura-${orderData.orderNumber}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          console.log("Factura descargada correctamente");
        } else {
          console.error("No se pudo generar la URL del PDF");
          alert("No se pudo generar la factura. Por favor, inténtalo de nuevo más tarde.");
        }
      } catch (error) {
        console.error('Error generando la factura:', error);
        alert('Lo sentimos, ha ocurrido un problema al generar la factura. Por favor, inténtalo de nuevo más tarde.');
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
  if (!orderData) {
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
      
      <h2 className="text-2xl font-oldstyle italic font-semibold mb-4">¡Pedido Confirmado!</h2>
      
      <p className="text-gray-600 font-serif mb-2">
        Gracias por tu pedido. Hemos enviado tu confirmación a <strong>{orderData.email}</strong>
      </p>
      
      {/* Delivery confirmation code */}
      <div className="bg-darkRed/10 border border-darkRed rounded-lg p-4 max-w-md mx-auto mb-6">
        <h3 className="font-serif font-semibold text-darkRed mb-2">Tu código de entrega</h3>
        <div className="bg-white py-3 px-6 rounded-md border border-darkRed/20 font-mono text-2xl font-bold">
          {orderData.orderNumber.substring(4, 10)}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Por favor, proporciona este código al repartidor para recibir tu pedido
        </p>
      </div>
      
      <p className="text-gray-600 font-serif mb-8">
        Hemos enviado tu factura a <strong>{orderData.email}</strong>
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 text-left">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif font-semibold">Número de Pedido</h3>
            <p className="text-darkRed font-mono text-lg">{orderData.orderNumber}</p>
          </div>
          <div className="text-right">
            <h3 className="font-serif font-semibold">Fecha del Pedido</h3>
            <p>{formatDate(new Date())}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-4">
          <h3 className="font-serif font-semibold mb-2">Detalles del Pedido</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Método de Pago</span>
              <span className="font-medium">{getPaymentMethodName(orderData.payment?.method)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Subtotal</span>
              <span className="font-medium">${orderData.total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Impuestos (10%)</span>
              <span className="font-medium">${(orderData.total * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-serif text-gray-600">Envío</span>
              <span className="font-medium">Gratis</span>
            </div>
            
            <div className="flex justify-between font-semibold text-lg">
              <span className="font-serif">Total</span>
              <span className="text-darkRed">${(orderData.total * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-4">
          <h3 className="font-serif font-semibold mb-2">Dirección de Envío</h3>
          {orderData.shipping && (
            <address className="not-italic">
              <p>{orderData.shipping.fullName} {orderData.shipping.lastName}</p>
              <p>{orderData.shipping.address}</p>
              <p>{orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.postalCode}</p>
              <p>{orderData.shipping.country || 'Australia'}</p>
              <p>Teléfono: {orderData.shipping.phone}</p>
            </address>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-serif font-semibold mb-2">Entrega Estimada</h3>
          <p className="text-darkRed font-medium">{getEstimatedDelivery()}</p>
        </div>
      </div>
      
      {/* Contact section for invoice issues */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 text-left max-w-2xl mx-auto">
        <h3 className="font-serif font-semibold text-center mb-4">¿No has recibido tu factura?</h3>
        <p className="text-gray-600 font-serif mb-4 text-center">
          No te preocupes, revisa tu carpeta de spam o contáctanos a través de uno de estos canales:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-darkRed/10 flex items-center justify-center text-darkRed">
              <FaEnvelope />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-sm">Email</h4>
              <p className="text-sm">support@pizzapro.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-darkRed/10 flex items-center justify-center text-darkRed">
              <FaPhone />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-sm">Teléfono</h4>
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
              <p className="text-sm">@pizzapro</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <Button
          text={generating ? "Generando..." : "Descargar Factura"}
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
          text="Continuar Comprando"
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