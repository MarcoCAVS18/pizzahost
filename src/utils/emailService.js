// src/utils/emailService.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

/**
 * Envía un email de confirmación de pedido con la factura adjunta
 * 
 * @param {Object} orderData - Datos del pedido
 * @param {string} orderData.orderNumber - Número de pedido
 * @param {Object} orderData.customerInfo - Información del cliente
 * @param {string} orderData.email - Email del cliente
 * @param {Array} orderData.items - Productos comprados
 * @param {number} orderData.subtotal - Subtotal de la orden
 * @param {number} orderData.tax - Monto de impuestos
 * @param {number} orderData.shipping - Costo de envío
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

    // Crear datos para la plantilla de email
    const emailTemplateData = prepareEmailTemplateData(orderData);
    
    // Guardar el PDF en Firebase Storage
    const pdfUrl = await uploadInvoicePdf(orderData.orderNumber, pdfDataUrl);
    
    // Crear registro en Firestore para ser procesado por la Cloud Function
    await addDoc(collection(db, 'mail'), {
      to: orderData.email,
      message: {
        subject: `Pepperoni Order Confirmation - #${orderData.orderNumber}`,
        templateData: emailTemplateData,
        template: 'order-confirmation',
        attachments: [
          {
            filename: `Invoice-${orderData.orderNumber}.pdf`,
            path: pdfUrl
          }
        ]
      },
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
 * Prepara los datos para la plantilla del email
 * @param {Object} orderData - Datos del pedido
 * @returns {Object} - Datos formateados para la plantilla
 */
const prepareEmailTemplateData = (orderData) => {
  // Obtener el código de entrega (últimos 6 dígitos del número de orden)
  const deliveryCode = orderData.orderNumber.substring(4, 10);
  
  // Formatear la fecha de pedido
  const orderDate = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Calcular fecha estimada de entrega (3 días después)
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);
  const formattedDeliveryDate = estimatedDeliveryDate.toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Formatear elementos del pedido para la tabla
  let orderItemsHtml = '';
  if (Array.isArray(orderData.items)) {
    orderData.items.forEach(item => {
      const itemName = item.name || (item.isCustom ? 'Custom Pizza' : 'Product');
      const sizeInfo = item.selectedSize ? ` - ${item.selectedSize}` : '';
      
      orderItemsHtml += `
        <tr>
          <td>${itemName}${sizeInfo}</td>
          <td>${item.quantity}</td>
          <td>$${(item.totalPrice || 0).toFixed(2)}</td>
        </tr>
      `;
    });
  }
  
  // Información de envío formateada
  const shipping = orderData.shipping === 0 ? 'Free' : `$${orderData.shipping.toFixed(2)}`;
  
  return {
    CUSTOMER_NAME: orderData.customerInfo?.fullName || '',
    CUSTOMER_LASTNAME: orderData.customerInfo?.lastName || '',
    ORDER_NUMBER: orderData.orderNumber,
    ORDER_DATE: orderDate,
    DELIVERY_CODE: deliveryCode,
    ORDER_ITEMS: orderItemsHtml,
    SUBTOTAL: orderData.subtotal.toFixed(2),
    TAX: orderData.tax.toFixed(2),
    SHIPPING: shipping,
    TOTAL: orderData.total.toFixed(2),
    CUSTOMER_ADDRESS: orderData.customerInfo?.address || '',
    CUSTOMER_CITY: orderData.customerInfo?.city || '',
    CUSTOMER_STATE: orderData.customerInfo?.state || '',
    CUSTOMER_POSTAL_CODE: orderData.customerInfo?.postalCode || '',
    CUSTOMER_PHONE: orderData.customerInfo?.phone || '',
    ESTIMATED_DELIVERY_DATE: formattedDeliveryDate
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