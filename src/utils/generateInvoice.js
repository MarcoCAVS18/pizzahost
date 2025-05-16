// src/utils/generateInvoice.js
import { jsPDF } from 'jspdf';
import logoBase64 from './logoBase64'; 

// Company info
const COMPANY_INFO = {
  name: 'Pepperoni',
  address: '103 Frank Street',
  city: 'Gold Coast',
  state: 'Queensland',
  postalCode: '4000',
  country: 'Australia',
  phone: '+61 7 3000 4000',
  email: 'support@pizzapro.com',
  website: 'www.pizzapro.com',
  abn: '12 345 678 901',
  taxId: 'TAX-4321-ABCD'
};

/**
 * Generate invoice PDF from order data without using autotable plugin
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
 * @returns {Object} Invoice data including PDF as data URL
 */
export const generateInvoice = (orderData) => {
  if (!orderData) {
    throw new Error('Order data is required to generate an invoice');
  }

  try {
    console.log("generateInvoice recibió:", orderData);
    
    // Format currency
    const formatCurrency = (amount) => {
      return typeof amount === 'number' 
        ? '$' + amount.toFixed(2) 
        : '$0.00';
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

    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Add logo
    doc.addImage(logoBase64, 'PNG', 15, 15, 50, 25);
    
    // Add company info
    doc.setFontSize(20);
    doc.setTextColor(187, 30, 16); // darkRed color
    doc.text('PizzaPro', 15, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(COMPANY_INFO.address, 15, 32);
    doc.text(`${COMPANY_INFO.city}, ${COMPANY_INFO.state} ${COMPANY_INFO.postalCode}`, 15, 37);
    doc.text(`${COMPANY_INFO.country}`, 15, 42);
    doc.text(`Phone: ${COMPANY_INFO.phone}`, 15, 47);
    doc.text(`Email: ${COMPANY_INFO.email}`, 15, 52);
    doc.text(`ABN: ${COMPANY_INFO.abn}`, 15, 57);
    
    // Add invoice title
    doc.setFontSize(24);
    doc.setTextColor(50, 50, 50);
    doc.text('INVOICE', 150, 30, { align: 'right' });
    
    // Add invoice details
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Invoice Number: ${invoiceNumber}`, 150, 40, { align: 'right' });
    doc.text(`Order Number: ${orderData.orderNumber}`, 150, 45, { align: 'right' });
    doc.text(`Date: ${formattedDate}`, 150, 50, { align: 'right' });
    
    // Add line
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 65, 195, 65);
    
    // Add billing info
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('Bill To:', 15, 75);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    if (orderData.customerInfo) {
      const customer = orderData.customerInfo;
      doc.text(`${customer.fullName || ''} ${customer.lastName || ''}`, 15, 82);
      doc.text(customer.address || '', 15, 87);
      doc.text(`${customer.city || ''}, ${customer.state || ''} ${customer.postalCode || ''}`, 15, 92);
      doc.text(customer.country || 'Australia', 15, 97);
      doc.text(`Phone: ${customer.phone || ''}`, 15, 102);
      doc.text(`Email: ${orderData.email || customer.email || ''}`, 15, 107);
    } else {
      doc.text('Customer information not available', 15, 82);
    }
    
    // Add items table header manually (no autotable)
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('Order Items:', 15, 120);
    
    // Table header
    let startY = 125;
    const colWidths = [90, 25, 30, 30]; // Item, Quantity, Price, Total
    const margins = [15, 105, 130, 160, 190]; // Starting X positions for each column
    const lineHeight = 7;
    
    // Create header row
    doc.setFillColor(187, 30, 16); // darkRed
    doc.rect(15, startY, 180, 8, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Item', margins[0] + 2, startY + 5.5);
    doc.text('Quantity', margins[1] + 2, startY + 5.5);
    doc.text('Price', margins[2] + 2, startY + 5.5);
    doc.text('Total', margins[3] + 2, startY + 5.5);
    
    // Move down for table data
    startY += 8;
    
    // Format items for the table
    const tableItems = Array.isArray(orderData.items) 
      ? orderData.items.map(item => {
          // Ensure we have the required properties and they are numbers
          const price = typeof item.price === 'number' ? item.price : 
                       typeof item.basePrice === 'number' ? item.basePrice : 0;
          
          const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
          const totalPrice = price * quantity;
          
          // Format special for custom pizzas
          let itemName = item.name || 'Unknown Product';
          if (item.isCustom && item.flavors) {
            itemName = `Custom Pizza (${item.flavors.left.name} & ${item.flavors.right.name})`;
          }
          
          // Get size if available
          const size = item.selectedSize ? ` - ${item.selectedSize}` : '';
          
          return [
            `${itemName}${size}`,
            quantity,
            formatCurrency(price),
            formatCurrency(totalPrice)
          ];
        })
      : [];
      
    console.log("Elementos formateados para la tabla:", tableItems);
    
    // Add table rows
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    
    let rowCount = 0;
    for (const row of tableItems) {
      // Add striped background for even rows
      if (rowCount % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(15, startY, 180, lineHeight, 'F');
      }
      
      // Add text for each cell
      doc.text(row[0].toString().substring(0, 35), margins[0] + 2, startY + 5); // Item name (truncate if too long)
      doc.text(row[1].toString(), margins[1] + 2, startY + 5); // Quantity
      
      // Right align price and total
      doc.text(row[2].toString(), margins[3] - 2, startY + 5, { align: 'right' }); // Price
      doc.text(row[3].toString(), margins[4] - 2, startY + 5, { align: 'right' }); // Total
      
      // Move to next row
      startY += lineHeight;
      rowCount++;
    }
    
    // Final Y position after the table
    const finalY = startY + 10;
    
    // Add summary
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    // Helper for summary lines
    const addSummaryLine = (label, value, y, isBold = false) => {
      if (isBold) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }
      
      doc.text(label, 130, y);
      doc.text(value, 180, y, { align: 'right' });
    };
    
    // Ensure we have the numeric values for summary
    const subtotal = typeof orderData.subtotal === 'number' ? orderData.subtotal : 0;
    const tax = typeof orderData.tax === 'number' ? orderData.tax : 0;
    const shipping = typeof orderData.shipping === 'number' ? orderData.shipping : 0;
    const total = typeof orderData.total === 'number' ? orderData.total : (subtotal + tax + shipping);
    
    addSummaryLine('Subtotal:', formatCurrency(subtotal), finalY);
    addSummaryLine('Tax (10%):', formatCurrency(tax), finalY + 6);
    addSummaryLine('Shipping:', shipping === 0 ? 'Free' : formatCurrency(shipping), finalY + 12);
    
    // Add line before total
    doc.setDrawColor(200, 200, 200);
    doc.line(130, finalY + 15, 180, finalY + 15);
    
    // Add total
    doc.setTextColor(187, 30, 16); // darkRed color
    addSummaryLine('Total:', formatCurrency(total), finalY + 20, true);
    
    // Add footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Thank you for your order!', 105, 270, { align: 'center' });
    doc.text(`Invoice generated on ${new Date().toLocaleDateString('en-AU')}`, 105, 275, { align: 'center' });
    doc.text(`${COMPANY_INFO.website} | ${COMPANY_INFO.email} | ${COMPANY_INFO.phone}`, 105, 280, { align: 'center' });
    
    // Save PDF as data URL
    const pdfDataUrl = doc.output('datauristring');
    
    // Return invoice data and PDF URL
    return {
      invoiceNumber,
      orderNumber: orderData.orderNumber,
      date: formattedDate,
      customer: {
        name: orderData.customerInfo 
          ? `${orderData.customerInfo.fullName || ''} ${orderData.customerInfo.lastName || ''}`.trim()
          : '',
        email: orderData.email || (orderData.customerInfo ? orderData.customerInfo.email : '') || '',
        address: orderData.customerInfo ? orderData.customerInfo.address || '' : '',
        city: orderData.customerInfo ? orderData.customerInfo.city || '' : '',
        state: orderData.customerInfo ? orderData.customerInfo.state || '' : '',
        postalCode: orderData.customerInfo ? orderData.customerInfo.postalCode || '' : '',
        country: orderData.customerInfo ? orderData.customerInfo.country || 'Australia' : 'Australia',
        phone: orderData.customerInfo ? orderData.customerInfo.phone || '' : ''
      },
      items: tableItems.map((row, index) => ({
        name: row[0],
        quantity: row[1],
        price: row[2],
        total: row[3],
        originalItem: index < orderData.items.length ? orderData.items[index] : null
      })),
      subtotal: formatCurrency(subtotal),
      tax: formatCurrency(tax),
      shipping: shipping === 0 ? 'Free' : formatCurrency(shipping),
      total: formatCurrency(total),
      pdfDataUrl
    };
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw new Error(`Failed to generate invoice: ${error.message}`);
  }
};

/**
 * Generate a simple placeholder version of invoice data (without PDF)
 * for use when PDF generation is not possible or needed
 */
export const generateInvoiceData = (orderData) => {
  if (!orderData) {
    throw new Error('Order data is required to generate invoice data');
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
  return {
    invoiceNumber,
    orderNumber: orderData.orderNumber,
    date: formattedDate,
    customer: {
      name: orderData.customerInfo 
        ? `${orderData.customerInfo.fullName || ''} ${orderData.customerInfo.lastName || ''}`.trim()
        : '',
      email: orderData.email || (orderData.customerInfo ? orderData.customerInfo.email : '') || '',
      address: orderData.customerInfo ? orderData.customerInfo.address || '' : '',
      city: orderData.customerInfo ? orderData.customerInfo.city || '' : '',
      state: orderData.customerInfo ? orderData.customerInfo.state || '' : '',
      postalCode: orderData.customerInfo ? orderData.customerInfo.postalCode || '' : '',
      country: orderData.customerInfo ? orderData.customerInfo.country || 'Australia' : 'Australia',
      phone: orderData.customerInfo ? orderData.customerInfo.phone || '' : ''
    },
    items: Array.isArray(orderData.items) ? orderData.items.map(item => {
      const price = typeof item.price === 'number' ? item.price : 
                   typeof item.basePrice === 'number' ? item.basePrice : 0;
      const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
      return {
        name: item.name || 'Unknown Product',
        quantity: quantity,
        price: formatCurrency(price),
        total: formatCurrency(price * quantity)
      };
    }) : [],
    subtotal: formatCurrency(orderData.subtotal || 0),
    tax: formatCurrency(orderData.tax || 0),
    shipping: formatCurrency(orderData.shipping || 0),
    total: formatCurrency(orderData.total || 0),
    company: COMPANY_INFO
  };
};

export default generateInvoice;