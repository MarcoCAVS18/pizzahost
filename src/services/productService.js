// src/services/productService.js
import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';

/**
 * Obtiene todos los productos de la colección
 * @returns {Promise<Array>} Lista de productos
 */
export const getAllProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    
    return productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

/**
 * Obtiene un producto específico por su ID
 * @param {string} productId - ID del producto a buscar
 * @returns {Promise<Object>} Datos del producto
 */
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);
    
    if (!productSnapshot.exists()) {
      throw new Error(`Producto con ID ${productId} no encontrado`);
    }
    
    return {
      id: productSnapshot.id,
      ...productSnapshot.data()
    };
  } catch (error) {
    console.error(`Error al obtener producto ${productId}:`, error);
    throw error;
  }
};

/**
 * Obtiene productos filtrados por categoría
 * @param {string} category - Categoría a filtrar (pizza, pasta, etc.)
 * @returns {Promise<Array>} Lista de productos en la categoría
 */
export const getProductsByCategory = async (category) => {
  try {
    const productsQuery = query(
      collection(db, 'products'),
      where('category', '==', category),
      orderBy('name')
    );
    
    const productsSnapshot = await getDocs(productsQuery);
    
    return productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error al obtener productos de categoría ${category}:`, error);
    throw error;
  }
};

/**
 * Obtiene productos destacados
 * @param {number} count - Número máximo de productos a obtener
 * @returns {Promise<Array>} Lista de productos destacados
 */
export const getFeaturedProducts = async (count = 4) => {
  try {
    // Si tienes un campo 'featured' para productos destacados
    const featuredQuery = query(
      collection(db, 'products'),
      where('featured', '==', true),
      limit(count)
    );
    
    const productsSnapshot = await getDocs(featuredQuery);
    
    // Si no hay productos destacados, obtenemos algunos productos aleatorios
    if (productsSnapshot.empty) {
      const allProducts = await getAllProducts();
      return allProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
    }
    
    return productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error al obtener productos destacados:', error);
    // Alternativa: devolver una lista vacía en lugar de lanzar el error
    return [];
  }
};

/**
 * Busca productos por nombre o descripción
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Promise<Array>} Lista de productos que coinciden
 */
export const searchProducts = async (searchTerm) => {
  try {
    // Firestore no tiene búsqueda de texto completo nativa
    // Una opción es obtener todos los productos y filtrar en el cliente
    const products = await getAllProducts();
    
    const normalizedSearchTerm = searchTerm.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(normalizedSearchTerm) || 
      (product.description && product.description.toLowerCase().includes(normalizedSearchTerm))
    );
  } catch (error) {
    console.error(`Error al buscar productos con término "${searchTerm}":`, error);
    throw error;
  }
};

/**
 * Obtiene todas las categorías disponibles
 * @returns {Promise<Array>} Lista de categorías únicas
 */
export const getAllCategories = async () => {
  try {
    const products = await getAllProducts();
    const categoriesSet = new Set(products.map(product => product.category));
    return Array.from(categoriesSet);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

/**
 * Obtiene los tamaños disponibles para pizzas o pasta
 * @param {string} type - Tipo de producto (pizza, pasta)
 * @returns {Promise<Object>} Objeto con los tamaños
 */
export const getSizes = async (type) => {
  try {
    // Si tienes una colección metadata
    const sizesRef = doc(db, 'metadata', `${type}Sizes`);
    const sizesSnapshot = await getDoc(sizesRef);
    
    if (!sizesSnapshot.exists()) {
      throw new Error(`Tamaños para ${type} no encontrados`);
    }
    
    return sizesSnapshot.data().sizes;
  } catch (error) {
    console.error(`Error al obtener tamaños para ${type}:`, error);
    // Fallback a valores por defecto
    if (type === 'pizza') {
      return {
        SMALL: { name: 'Small', price: 15.50 },
        MEDIUM: { name: 'Medium', price: 20.00 },
        LARGE: { name: 'Large', price: 32.00 },
        XLARGE: { name: 'Extra Large', price: 42.00 }
      };
    } else if (type === 'pasta') {
      return {
        REGULAR: { name: 'Regular', price: 17.50 },
        LARGE: { name: 'Large', price: 22.00 }
      };
    }
    return {};
  }
};

/**
 * Obtiene los toppings disponibles para pizzas
 * @returns {Promise<Array>} Lista de toppings
 */
export const getPizzaToppings = async () => {
  try {
    const toppingsRef = doc(db, 'metadata', 'pizzaToppings');
    const toppingsSnapshot = await getDoc(toppingsRef);
    
    if (!toppingsSnapshot.exists()) {
      throw new Error('Toppings no encontrados');
    }
    
    return toppingsSnapshot.data().toppings;
  } catch (error) {
    console.error('Error al obtener toppings:', error);
    // Fallback a valores por defecto
    return [
      { id: 'topping-extra-cheese', name: 'Extra Cheese', price: 1.50, category: 'cheese' },
      { id: 'topping-pepperoni', name: 'Pepperoni', price: 2.00, category: 'meat' },
      { id: 'topping-mushrooms', name: 'Mushrooms', price: 1.25, category: 'vegetable' },
      { id: 'topping-olives', name: 'Olives', price: 1.00, category: 'vegetable' }
    ];
  }
};

/**
 * Obtiene productos similares a un producto dado
 * @param {string} productId - ID del producto de referencia
 * @param {number} count - Número de productos similares a obtener
 * @returns {Promise<Array>} Lista de productos similares
 */
export const getSimilarProducts = async (productId, count = 3) => {
  try {
    const product = await getProductById(productId);
    
    // Obtener productos de la misma categoría
    const sameCategory = await getProductsByCategory(product.category);
    
    // Filtrar el producto actual y limitar la cantidad
    return sameCategory
      .filter(p => p.id !== productId)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  } catch (error) {
    console.error(`Error al obtener productos similares para ${productId}:`, error);
    return [];
  }
};