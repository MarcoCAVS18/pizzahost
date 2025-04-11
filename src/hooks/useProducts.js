// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { 
  getAllProducts, 
  getProductsByCategory, 
  getSizes,
  getPizzaToppings
} from '../services/productService';

// Valores por defecto en caso de error
const DEFAULT_PIZZA_SIZES = {
  SMALL: { name: 'Small', price: 15.50 },
  MEDIUM: { name: 'Medium', price: 20.00 },
  LARGE: { name: 'Large', price: 32.00 },
  XLARGE: { name: 'Extra Large', price: 42.00 }
};

const DEFAULT_PASTA_SIZES = {
  REGULAR: { name: 'Regular', price: 17.50 },
  LARGE: { name: 'Large', price: 22.00 }
};

const DEFAULT_PIZZA_TOPPINGS = [
  { id: 'topping-extra-cheese', name: 'Extra Cheese', price: 1.50, category: 'cheese' },
  { id: 'topping-pepperoni', name: 'Pepperoni', price: 2.00, category: 'meat' },
  { id: 'topping-mushrooms', name: 'Mushrooms', price: 1.25, category: 'vegetable' },
  { id: 'topping-olives', name: 'Olives', price: 1.00, category: 'vegetable' }
];

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [pizzaSizes, setPizzaSizes] = useState(DEFAULT_PIZZA_SIZES); // Inicializar con valores predeterminados
  const [pastaSizes, setPastaSizes] = useState(DEFAULT_PASTA_SIZES); // Inicializar con valores predeterminados
  const [pizzaToppings, setPizzaToppings] = useState(DEFAULT_PIZZA_TOPPINGS); // Inicializar con valores predeterminados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar todos los productos
  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await getAllProducts();
      setProducts(allProducts);
      return allProducts;
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos por categoría
  const loadProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const categoryProducts = await getProductsByCategory(category);
      return categoryProducts;
    } catch (err) {
      console.error(`Error cargando productos de categoría ${category}:`, err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Cargar metadata
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        // Cargar tamaños de pizza con manejo de errores mejorado
        try {
          const pizzaSizesData = await getSizes('pizza');
          if (pizzaSizesData && typeof pizzaSizesData === 'object') {
            setPizzaSizes(pizzaSizesData);
          } else {
            console.warn('Formato inválido para pizzaSizes, usando valores predeterminados');
          }
        } catch (e) {
          console.warn('Error cargando tamaños de pizza, usando valores predeterminados:', e);
        }

        // Cargar tamaños de pasta con manejo de errores mejorado
        try {
          const pastaSizesData = await getSizes('pasta');
          if (pastaSizesData && typeof pastaSizesData === 'object') {
            setPastaSizes(pastaSizesData);
          } else {
            console.warn('Formato inválido para pastaSizes, usando valores predeterminados');
          }
        } catch (e) {
          console.warn('Error cargando tamaños de pasta, usando valores predeterminados:', e);
        }

        // Cargar toppings con manejo de errores mejorado
        try {
          const pizzaToppingsData = await getPizzaToppings();
          if (Array.isArray(pizzaToppingsData) && pizzaToppingsData.length > 0) {
            setPizzaToppings(pizzaToppingsData);
          } else {
            console.warn('Formato inválido para pizzaToppings, usando valores predeterminados');
          }
        } catch (e) {
          console.warn('Error cargando toppings, usando valores predeterminados:', e);
        }

      } catch (err) {
        console.error('Error general cargando metadatos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMetadata();
  }, []);

  return { 
    products, 
    pizzaSizes, 
    pastaSizes, 
    pizzaToppings, 
    loading, 
    error,
    loadAllProducts,
    loadProductsByCategory
  };
};

export default useProducts;