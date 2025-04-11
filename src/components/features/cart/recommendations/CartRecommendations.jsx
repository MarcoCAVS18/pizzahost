// components/features/cart/recommendations/CartRecommendations.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../../../../hooks/useCart';
import RecommendationCard from './RecommendationCard';
import { getAllProducts } from '../../../../services/productService';
import { toast } from 'react-toastify';

const CartRecommendations = () => {
  const { items, addItem } = useCart();
  const [recommendations, setRecommendations] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Cargar todos los productos al inicio
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setAllProducts(products);
      } catch (error) {
        console.error('Error fetching products for recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Determinar el tamaño preferido basado en los items del carrito
  const determinePreferredSize = () => {
    if (!items.length) return null;
    
    // Contar la frecuencia de cada tamaño en el carrito
    const sizeCounts = {};
    items.forEach(item => {
      if (item.selectedSize) {
        const size = item.selectedSize.toUpperCase();
        sizeCounts[size] = (sizeCounts[size] || 0) + 1;
      }
    });
    
    // Encontrar el tamaño más común
    let mostCommonSize = null;
    let maxCount = 0;
    
    Object.entries(sizeCounts).forEach(([size, count]) => {
      if (count > maxCount) {
        mostCommonSize = size;
        maxCount = count;
      }
    });
    
    return mostCommonSize;
  };
  
  const preferredSize = determinePreferredSize();

  // Generar recomendaciones basadas en los items del carrito
  useEffect(() => {
    if (!items.length || !allProducts.length) return;

    // Recolectar categorías en el carrito
    const cartCategories = new Set();
    items.forEach(item => {
      if (item.category) cartCategories.add(item.category);
    });

    // Encontrar productos de las mismas categorías que no estén en el carrito
    const cartItemIds = new Set(items.map(item => item.id));
    let potentialRecommendations = [];

    // Filtrar productos por categoría y que no estén en el carrito
    if (cartCategories.size > 0) {
      potentialRecommendations = allProducts.filter(product => 
        cartCategories.has(product.category) && !cartItemIds.has(product.id)
      );
    } 
    
    // Si no hay suficientes recomendaciones, añadir algunos productos aleatorios
    if (potentialRecommendations.length < 3) {
      const randomProducts = allProducts
        .filter(product => !cartItemIds.has(product.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 - potentialRecommendations.length);
      
      potentialRecommendations = [...potentialRecommendations, ...randomProducts];
    }

    // Seleccionar hasta 3 recomendaciones
    setRecommendations(potentialRecommendations.slice(0, 3));
  }, [items, allProducts]);

  const handleAddToCart = (product, selectedSize, quantity) => {
    addItem({ ...product, selectedSize, quantity });
    
    toast.success(`Added "${product.name}" to your cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: { top: '120px' },
      toastClassName: "font-logo",
      progressClassName: "Toastify__progress-bar--success !bg-darkRed",
    });
  };

  if (loading || !recommendations.length) return null;

  return (
    <div className="mt-8 mb-4">
      <h3 className="text-xl font-oldstyle italic font-bold text-darkRed mb-4">You might also like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommendations.map(product => (
          <RecommendationCard 
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            preferredSize={preferredSize}
          />
        ))}
      </div>
    </div>
  );
};

export default CartRecommendations;