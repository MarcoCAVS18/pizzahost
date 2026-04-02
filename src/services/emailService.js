// src/utils/emailService.js - Adaptado para usar el template de SendGrid
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

/**
 * Envía un email de confirmación de pedido con la factura adjunta usando el template de SendGrid
 * 
 * @param {Object} orderData - Datos del pedido
 * @param {string} orderData.orderNumber - Número de pedido
 * @param {Object} orderData.shipping - Información de envío
 * @param {string} orderData.email - Email del cliente
 * @param {Array} orderData.items - Productos comprados
 * @param {number} orderData.total - Total de la orden
 * @param {string} pdfDataUrl - URL de datos del PDF de la factura
 * @returns {Promise<boolean>} - True si se envió correctamente
 */
export const sendOrderConfirmationEmail = async (orderData, pdfDataUrl) => {
  try {
    if (!orderData || !orderData.orderNumber || !orderData.email) {
      console.error('Datos de orden incompletos para el envío de email');
      return false;
    }

    // Preparar los datos para el template de SendGrid
    const templateData = prepareTemplateData(orderData);
    
    // Subir el PDF a Firebase Storage para adjuntarlo
    const pdfUrl = await uploadInvoicePdf(orderData.orderNumber, pdfDataUrl);
    
    // Crear un documento en la colección 'mail' para ser procesado por Firebase Functions
    await addDoc(collection(db, 'mail'), {
      to: orderData.email,
      template: {
        name: 'order-confirmation',
        id: 'd-52be304896e447b19869dce6a232ffa1',
        data: templateData
      },
      attachments: [
        {
          filename: `Invoice-${orderData.orderNumber}.pdf`,
          path: pdfUrl
        }
      ],
      timestamp: serverTimestamp()
    });
    
    console.log(`Email de confirmación enviado a ${orderData.email} con factura adjunta`);
    return true;
  } catch (error) {
    console.error('Error al enviar email de confirmación de pedido:', error);
    return false;
  }
};

/**
 * Prepara los datos para el template de SendGrid
 * @param {Object} orderData - Datos del pedido
 * @returns {Object} - Datos formateados para el template de SendGrid
 */
const prepareTemplateData = (orderData) => {
  // Obtener código de entrega (últimos 6 dígitos del número de orden)
  const deliveryCode = orderData.orderNumber.substring(4, 10);
  
  // Calcular impuesto y total
  const subtotal = typeof orderData.total === 'number' ? orderData.total : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  // Formatear fechas
  const orderDate = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Fecha estimada de entrega (3 días después)
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);
  const formattedDeliveryDate = estimatedDeliveryDate.toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Formatear los items para la tabla del email
  const formattedItems = Array.isArray(orderData.items) ? orderData.items.map(item => {
    return {
      name: item.isCustom && item.flavors 
        ? `Custom Pizza (${item.flavors.left.name} & ${item.flavors.right.name})` 
        : item.name || 'Product',
      size: item.selectedSize || '',
      quantity: item.quantity || 1,
      price: (item.totalPrice || 0).toFixed(2)
    };
  }) : [];
  
  // Datos para el template de SendGrid
  return {
    customer_name: orderData.shipping?.fullName || '',
    customer_lastname: orderData.shipping?.lastName || '',
    order_number: orderData.orderNumber,
    order_date: orderDate,
    delivery_code: deliveryCode,
    items: formattedItems,
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    shipping: 'Free',
    total: total.toFixed(2),
    customer_address: orderData.shipping?.address || '',
    customer_city: orderData.shipping?.city || '',
    customer_state: orderData.shipping?.state || '',
    customer_postal_code: orderData.shipping?.postalCode || '',
    customer_country: orderData.shipping?.country || 'Australia',
    customer_phone: orderData.shipping?.phone || '',
    estimated_delivery_date: formattedDeliveryDate
  };
};

/**
 * Sube el PDF de la factura a Firebase Storage
 * @param {string} orderNumber - Número de orden
 * @param {string} pdfDataUrl - URL de datos del PDF
 * @returns {Promise<string>} - URL pública del PDF
 */
const uploadInvoicePdf = async (orderNumber, pdfDataUrl) => {
  if (!pdfDataUrl) {
    throw new Error('No se proporcionó PDF para subir');
  }
  
  try {
    // Convertir dataURL a Blob
    const response = await fetch(pdfDataUrl);
    const blob = await response.blob();
    
    // Subir a Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `invoices/${orderNumber}.pdf`);
    
    await uploadBytes(storageRef, blob);
    
    // Obtener URL pública
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error subiendo la factura a Firebase Storage:', error);
    throw error;
  }
};

/**
 * Integra con OrderConfirmation.jsx para enviar automáticamente el email cuando se genere la factura
 * @param {Object} orderData - Datos del pedido completo 
 * @param {Object} invoiceData - Datos de la factura generada
 * @returns {Promise<boolean>} - True si se envió correctamente
 */
export const sendOrderConfirmationWithInvoice = async (orderData, invoiceData) => {
  // Verificar que tenemos la URL de datos del PDF
  if (!invoiceData || !invoiceData.pdfDataUrl) {
    console.error('No se pudo enviar el email: falta el PDF de la factura');
    return false;
  }
  
  return await sendOrderConfirmationEmail(orderData, invoiceData.pdfDataUrl);
};

export default {
  sendOrderConfirmationEmail,
  sendOrderConfirmationWithInvoice
};