// src/utils/initializeFirestoreCoupons.js
import { db } from '../services/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';

/**
 * Inicializa la colección de cupones con datos de muestra
 * @returns {Promise<Object>} Resultado de la operación
 */
const initializeFirestoreCoupons = async () => {
  try {
    console.log("Iniciando creación de cupones de prueba...");
    
    // Obtener referencia a la colección
    const couponsCollection = collection(db, 'coupons');
    
    // Datos para tres cupones de ejemplo
    const couponData = [
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
    
    // Crear un cupón a la vez, con manejo de errores individual
    for (const coupon of couponData) {
      try {
        console.log(`Intentando crear cupón: ${coupon.code}`);
        const docRef = doc(couponsCollection, coupon.code);
        await setDoc(docRef, coupon);
        console.log(`✅ Cupón ${coupon.code} creado correctamente`);
      } catch (error) {
        console.error(`❌ Error al crear cupón ${coupon.code}:`, error);
      }
    }
    
    console.log("Proceso de creación de cupones finalizado");
    return {
      success: true,
      message: "Todos los cupones han sido inicializados correctamente."
    };
  } catch (error) {
    console.error("Error general en la inicialización de cupones:", error);
    return {
      success: false,
      message: "Error al inicializar cupones: " + error.message,
      error
    };
  }
};

/**
 * Componente para inicializar cupones en desarrollo
 */
const CouponInitializer = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [result, setResult] = useState(null);

  const handleInitialize = async () => {
    if (isInitializing) return;
    
    setIsInitializing(true);
    try {
      const initResult = await initializeFirestoreCoupons();
      setResult(initResult);
      
      if (initResult.success) {
        alert('Coupons initialized successfully! ' + initResult.message);
      } else {
        alert('Error initializing coupons: ' + initResult.message);
      }
    } catch (error) {
      console.error('Error initializing coupons:', error);
      setResult({
        success: false,
        message: `Unexpected error: ${error.message}`
      });
      alert('Unexpected error initializing coupons: ' + error.message);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Coupon Management</h3>
      <p className="text-sm text-gray-600 mb-4">
        Initialize sample coupon codes in Firestore. Only for development.
      </p>
      
      <button
        onClick={handleInitialize}
        disabled={isInitializing}
        className={`px-4 py-2 rounded-md text-white ${
          isInitializing ? 'bg-gray-400 cursor-not-allowed' : 'bg-darkRed hover:bg-lightRed'
        }`}
      >
        {isInitializing ? 'Initializing...' : 'Initialize Coupons'}
      </button>
      
      {result && (
        <div className={`mt-4 p-3 rounded-md ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <p className="text-sm">{result.message}</p>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-bold text-sm mb-2">Available Coupon Codes:</h4>
        <ul className="space-y-1 text-sm">
          <li><code className="bg-gray-100 px-2 py-1 rounded">WELCOME15</code> - 15% off first order (min $20)</li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">FREESHIP</code> - Free shipping (min $30)</li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">PIZZAMANIA</code> - $10 off pizza orders (min $25)</li>
        </ul>
      </div>
    </div>
  );
};

export default CouponInitializer;