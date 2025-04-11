// src/services/couponService.js
import { db } from './firebase';
import { 
  collection, 
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  setDoc
} from 'firebase/firestore';

/**
 * Obtiene todos los cupones disponibles (solo para admin)
 * @returns {Promise<Array>} Lista de cupones
 */
export const getAllCoupons = async () => {
  try {
    const couponsCollection = collection(db, 'coupons');
    const couponsSnapshot = await getDocs(couponsCollection);
    
    return couponsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error al obtener cupones:', error);
    throw error;
  }
};

/**
 * Verifica si un cupón es válido
 * @param {string} code - Código del cupón
 * @param {Object} orderDetails - Detalles de la orden actual
 * @param {string} userId - ID del usuario (opcional)
 * @returns {Promise<Object>} Información del cupón y si es válido
 */
export const validateCoupon = async (code, orderDetails = {}, userId = null) => {
  try {
    // Normalizar el código (mayúsculas, sin espacios)
    const normalizedCode = code.trim().toUpperCase();
    console.log("Buscando cupón con código:", normalizedCode);
    
    // Buscar el cupón por código
    const couponsRef = collection(db, 'coupons');
    console.log("Referencia de colección:", couponsRef);
    
    const q = query(couponsRef, where('code', '==', normalizedCode));
    console.log("Query creada:", q);
    
    const querySnapshot = await getDocs(q);
    console.log("Resultados de la consulta:", querySnapshot.size);
    
    // Si no hay resultados, el cupón no existe
    if (querySnapshot.empty) {
      console.log("No se encontraron cupones con el código:", normalizedCode);
      return {
        isValid: false,
        message: 'This coupon code does not exist',
        coupon: null
      };
    }
    
    // Obtener datos del cupón
    const couponDoc = querySnapshot.docs[0];
    console.log("Documento de cupón encontrado:", couponDoc.id);
    const coupon = {
      id: couponDoc.id,
      ...couponDoc.data()
    };
    console.log("Datos del cupón:", coupon);
    
    // Verificar si el cupón está activo
    if (!coupon.isActive) {
      return {
        isValid: false,
        message: 'This coupon is no longer active',
        coupon
      };
    }
    
    // Verificar la fecha de expiración
    const now = new Date();
    const expireDate = new Date(coupon.expireDate);
    if (now > expireDate) {
      return {
        isValid: false,
        message: 'This coupon has expired',
        coupon
      };
    }
    
    // Verificar límite de uso
    if (coupon.currentUsage >= coupon.usageLimit) {
      return {
        isValid: false,
        message: 'This coupon has reached its usage limit',
        coupon
      };
    }
    
    // Verificar valor mínimo de orden
    const orderTotal = orderDetails.subtotal || 0;
    if (orderTotal < coupon.minOrderValue) {
      return {
        isValid: false,
        message: `This coupon requires a minimum order of $${coupon.minOrderValue}`,
        coupon
      };
    }
    
    // Verificar restricción de productos si aplica
    if (coupon.applyTo !== 'all' && orderDetails.items) {
      const hasValidItem = orderDetails.items.some(item => 
        item.category === coupon.applyTo
      );
      
      if (!hasValidItem) {
        return {
          isValid: false,
          message: `This coupon only applies to ${coupon.applyTo} items`,
          coupon
        };
      }
    }
    
    // Verificar restricción de usuario si aplica
    if (coupon.userRestriction === 'new' && orderDetails.hasOrdered) {
      return {
        isValid: false,
        message: 'This coupon is only valid for first-time customers',
        coupon
      };
    }
    
    // Si pasa todas las validaciones, el cupón es válido
    return {
      isValid: true,
      message: 'Coupon applied successfully',
      coupon
    };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return {
      isValid: false,
      message: 'An error occurred while validating the coupon',
      coupon: null,
      error
    };
  }
};

/**
 * Calcula el descuento a aplicar con el cupón
 * @param {Object} coupon - Datos del cupón
 * @param {number} subtotal - Subtotal de la orden
 * @param {number} shippingCost - Costo de envío
 * @returns {Object} Detalles del descuento
 */
export const calculateDiscount = (coupon, subtotal, shippingCost = 0) => {
  console.log('Calculate Discount Input:', {
    coupon,
    subtotal,
    shippingCost
  });

  if (!coupon) {
    console.log('No coupon provided');
    return {
      discountAmount: 0,
      discountedShipping: shippingCost,
      discountType: null,
      discountDescription: ''
    };
  }

  let discountAmount = 0;
  let discountedShipping = shippingCost;
  
  switch (coupon.type) {
    case 'percentage':
      console.log('Percentage Discount Details:', {
        value: coupon.value,
        subtotal,
        maxDiscount: coupon.maxDiscount
      });
      
      // Descuento porcentual sobre el subtotal
      discountAmount = (coupon.value / 100) * subtotal;
      
      // Aplicar límite máximo de descuento si existe
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
      break;
      
    // ... resto del código igual
  }
  
  console.log('Calculated Discount:', {
    discountAmount,
    discountedShipping,
    discountType: coupon.type,
    discountDescription: coupon.description
  });

  return {
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    discountedShipping: parseFloat(discountedShipping.toFixed(2)),
    discountType: coupon.type,
    discountDescription: coupon.description
  };
};

/**
 * Incrementa el contador de uso del cupón
 * @param {string} couponId - ID del documento del cupón
 * @returns {Promise<boolean>} Éxito de la operación
 */
export const incrementCouponUsage = async (couponId) => {
  try {
    const couponRef = doc(db, 'coupons', couponId);
    await updateDoc(couponRef, {
      currentUsage: increment(1)
    });
    return true;
  } catch (error) {
    console.error('Error incrementing coupon usage:', error);
    return false;
  }
};

/**
 * Inicializa la colección de cupones con datos de muestra
 * Solo para desarrollo, usado una vez para crear los cupones iniciales
 */
export const initializeCoupons = async () => {
  try {
    const couponsCollection = collection(db, 'coupons');
    
    // Datos de ejemplo para los cupones
    const sampleCoupons = [
      {
        code: "WELCOME15",
        type: "percentage",
        value: 15,
        minOrderValue: 20,
        maxDiscount: 50,
        expireDate: "2025-06-30T23:59:59",
        isActive: true,
        usageLimit: 100,
        currentUsage: 0,
        description: "15% off on your first order above $20",
        applyTo: "all",
        userRestriction: "new"
      },
      {
        code: "FREESHIP",
        type: "shipping",
        value: 100,
        minOrderValue: 30,
        maxDiscount: null,
        expireDate: "2025-05-31T23:59:59",
        isActive: true,
        usageLimit: 200,
        currentUsage: 0,
        description: "Free shipping on orders above $30",
        applyTo: "all",
        userRestriction: "all"
      },
      {
        code: "PIZZAMANIA",
        type: "fixed",
        value: 10,
        minOrderValue: 25,
        maxDiscount: 10,
        expireDate: "2025-04-30T23:59:59",
        isActive: true,
        usageLimit: 150,
        currentUsage: 0,
        description: "$10 off on any pizza order above $25",
        applyTo: "pizza",
        userRestriction: "all"
      }
    ];
    
    // Crear documentos para cada cupón
    for (const couponData of sampleCoupons) {
      const docRef = doc(couponsCollection, couponData.code);
      await setDoc(docRef, couponData);
      console.log(`Cupón ${couponData.code} creado`);
    }
    
    return { success: true, message: 'Todos los cupones han sido inicializados correctamente.' };
  } catch (error) {
    console.error('Error inicializando cupones:', error);
    return {
      success: false,
      message: 'Error al inicializar cupones: ' + error.message,
      error
    };
  }
};