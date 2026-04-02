// src/utils/initializeFirestoreMetadata.js
import { db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Función para inicializar los documentos de metadatos en Firestore
 * Esta función debe ejecutarse una vez para configurar los datos iniciales
 */
export const initializeFirestoreMetadata = async () => {
  try {
    console.log('Inicializando metadatos en Firestore...');
    
    // Inicializar tamaños de pizza
    await setDoc(doc(db, 'metadata', 'pizzaSizes'), {
      sizes: {
        SMALL: { name: 'Small', price: 15.50 },
        MEDIUM: { name: 'Medium', price: 20.00 },
        LARGE: { name: 'Large', price: 32.00 },
        XLARGE: { name: 'Extra Large', price: 42.00 }
      }
    });
    console.log('Tamaños de pizza inicializados.');
    
    // Inicializar tamaños de pasta
    await setDoc(doc(db, 'metadata', 'pastaSizes'), {
      sizes: {
        REGULAR: { name: 'Regular', price: 17.50 },
        LARGE: { name: 'Large', price: 22.00 }
      }
    });
    console.log('Tamaños de pasta inicializados.');
    
    // Inicializar toppings de pizza
    await setDoc(doc(db, 'metadata', 'pizzaToppings'), {
      toppings: [
        { id: 'topping-extra-cheese', name: 'Extra Cheese', price: 1.50, category: 'cheese' },
        { id: 'topping-pepperoni', name: 'Pepperoni', price: 2.00, category: 'meat' },
        { id: 'topping-mushrooms', name: 'Mushrooms', price: 1.25, category: 'vegetable' },
        { id: 'topping-olives', name: 'Olives', price: 1.00, category: 'vegetable' },
        { id: 'topping-bell-peppers', name: 'Bell Peppers', price: 1.00, category: 'vegetable' },
        { id: 'topping-onions', name: 'Onions', price: 0.75, category: 'vegetable' },
        { id: 'topping-ham', name: 'Ham', price: 1.75, category: 'meat' },
        { id: 'topping-bacon', name: 'Bacon', price: 1.75, category: 'meat' },
        { id: 'topping-pineapple', name: 'Pineapple', price: 1.25, category: 'fruit' }
      ]
    });
    console.log('Toppings de pizza inicializados.');
    
    return { success: true, message: 'Todos los metadatos han sido inicializados correctamente.' };
  } catch (error) {
    console.error('Error inicializando metadatos:', error);
    return {
      success: false,
      message: 'Error al inicializar metadatos: ' + error.message,
      error
    };
  }
};

/**
 * Componente sencillo para usar en desarrollo y poder inicializar los metadatos
 */
export const MetadataInitializer = () => {
  const handleInitialize = async () => {
    const result = await initializeFirestoreMetadata();
    if (result.success) {
      alert('Metadata inicializada correctamente. Refresca la página.');
    } else {
      alert('Error: ' + result.message);
    }
  };
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      padding: '10px',
      background: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <button 
        onClick={handleInitialize}
        style={{
          padding: '8px 16px',
          background: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Inicializar Metadatos
      </button>
      <p style={{ fontSize: '12px', marginTop: '5px' }}>
        Sólo para desarrollo
      </p>
    </div>
  );
};

export default MetadataInitializer;