// src/utils/generateInvoice.js

/**
 * Generate invoice data structure (placeholder for future PDF generation)
 * 
 * @param {Object} orderData - Data for the invoice
 * @param {string} orderData.orderNumber - Unique order identifier
 * @param {Date} orderData.date - Order date
 * @param {Object} orderData.customerInfo - Customer information
 * @param {Array} orderData.items - Products purchased
 * @param {number} orderData.subtotal - Order subtotal
 * @param {number} orderData.tax - Tax amount
 * @param {number} orderData.shipping - Shipping cost
 * @param {number} orderData.total - Total order amount
 * @returns {Object} Invoice data structure
 */
export const generateInvoice = (orderData) => {
    if (!orderData) {
      throw new Error('Order data is required to generate an invoice');
    }
  
    // Format currency
    const formatCurrency = (amount) => {
      return typeof amount === 'number' ? amount.toFixed(2) : '0.00';
    };
  
    // Generate a unique invoice number based on order number
    const invoiceNumber = `INV-${orderData.orderNumber || Date.now()}`;
    
    // Format date
    const formattedDate = orderData.date instanceof Date 
      ? orderData.date.toLocaleDateString('en-AU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : new Date().toLocaleDateString('en-AU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
  
    // Create invoice data structure
    const invoiceData = {
      invoiceNumber,
      orderNumber: orderData.orderNumber,
      date: formattedDate,
      customer: {
        name: `${orderData.customerInfo?.fullName || ''} ${orderData.customerInfo?.lastName || ''}`.trim(),
        email: orderData.customerInfo?.email || '',
        address: orderData.customerInfo?.address || '',
        city: orderData.customerInfo?.city || '',
        state: orderData.customerInfo?.state || '',
        postalCode: orderData.customerInfo?.postalCode || '',
        country: orderData.customerInfo?.country || 'Australia',
        phone: orderData.customerInfo?.phone || ''
      },
      items: Array.isArray(orderData.items) ? orderData.items.map(item => ({
        name: item.name || 'Unknown Product',
        quantity: item.quantity || 1,
        price: formatCurrency(item.price || 0),
        total: formatCurrency((item.price || 0) * (item.quantity || 1))
      })) : [],
      subtotal: formatCurrency(orderData.subtotal || 0),
      tax: formatCurrency(orderData.tax || 0),
      shipping: formatCurrency(orderData.shipping || 0),
      total: formatCurrency(orderData.total || 0),
      paymentMethod: orderData.paymentMethod || 'Credit Card',
      notes: 'Thank you for your order!',
      // Placeholder for future implementation of PDF generation
      pdfUrl: null 
    };
  
    console.log('Invoice generated:', invoiceNumber);
    
    return invoiceData;
  };
  
  export default generateInvoice;