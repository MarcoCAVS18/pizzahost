import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from 'firebase/firebase';

/**
 * Uploads the invoice PDF to Firebase Storage.
 * @param {string} orderNumber - Order number used for the file name.
 * @param {string} pdfDataUrl - PDF file in Data URL format.
 * @returns {Promise<string>} - Public URL of the uploaded PDF.
 */
const uploadInvoicePdf = async (orderNumber, pdfDataUrl) => {
  if (!pdfDataUrl) throw new Error('Missing PDF data to upload');

  const response = await fetch(pdfDataUrl);
  const blob = await response.blob();

  const storage = getStorage();
  const storageRef = ref(storage, `invoices/${orderNumber}.pdf`);
  await uploadBytes(storageRef, blob);

  return await getDownloadURL(storageRef);
};

/**
 * Prepares the template data for the email content.
 * @param {Object} orderData - Full order details.
 * @returns {Object} - Data formatted for the email template.
 */
const prepareEmailTemplateData = (orderData) => {
  const deliveryCode = orderData.orderNumber.substring(4, 10);

  const orderDate = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);
  const formattedDeliveryDate = estimatedDeliveryDate.toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let orderItemsHtml = '';
  orderData.items?.forEach(item => {
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
 * Sends the invoice and creates a document in the Firestore 'mail' collection.
 * @param {Object} orderData - Order data.
 * @param {string} pdfDataUrl - Invoice PDF in data URL format.
 * @returns {Promise<boolean>} - True if successful.
 */
const sendInvoiceEmail = async (orderData, pdfDataUrl) => {
  try {
    if (!orderData?.orderNumber || !orderData?.email) {
      console.error('Missing order number or email.');
      return false;
    }

    const pdfUrl = await uploadInvoicePdf(orderData.orderNumber, pdfDataUrl);
    const templateData = prepareEmailTemplateData(orderData);

    await addDoc(collection(db, 'mail'), {
      to: orderData.email,
      message: {
        subject: `Pepperoni Order Confirmation - #${orderData.orderNumber}`,
        template: {
          name: 'order-confirmation',
          data: templateData
        },
        attachments: [
          {
            filename: `Invoice-${orderData.orderNumber}.pdf`,
            path: pdfUrl
          }
        ]
      },
      timestamp: serverTimestamp()
    });

    console.log(`Email sent to ${orderData.email}`);
    return true;
  } catch (error) {
    console.error('Failed to send invoice email:', error);
    return false;
  }
};

export default {
  sendInvoiceEmail
};
