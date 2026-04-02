// hooks/useProductDetails.js
import { useState, useMemo, useEffect } from 'react';
import { useProducts } from './useProducts';

// Orden predefinido de tamaños para ordenar las opciones
const SIZE_ORDER = ['SMALL', 'REGULAR', 'MEDIUM', 'LARGE', 'XLARGE'];

export const useProductDetails = (product, initialSize = null, initialQuantity = 1) => {
  const { pizzaSizes, pastaSizes } = useProducts();
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(initialQuantity);
  
  const hasSize = !!product?.sizes;
  
  // Obtener tamaños disponibles y ordenarlos según nuestro orden predefinido
  const availableSizes = useMemo(() => {
    if (!hasSize) return [];
    
    // Obtenemos las claves de tamaño del producto
    const sizeKeys = Object.keys(product.sizes).map(size => size.toUpperCase());
    
    // Ordenamos según nuestro array de orden predefinido
    return sizeKeys.sort((a, b) => {
      const indexA = SIZE_ORDER.indexOf(a);
      const indexB = SIZE_ORDER.indexOf(b);
      
      // Si ambos tamaños están en nuestro array de orden, usar ese orden
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      
      // Si solo uno está en el array, priorizar el que está
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      
      // Si ninguno está en el array, usar orden alfabético
      return a.localeCompare(b);
    });
  }, [hasSize, product?.sizes]);
  
  // Establecer tamaño por defecto si no se proporciona uno
  useEffect(() => {
    if (hasSize && availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0]);
    }
  }, [hasSize, availableSizes, selectedSize]);
  
  // Calcular el precio basado en el tamaño y cantidad seleccionados
  const getPrice = () => {
    if (!hasSize) return (Number(product?.price) || 0) * quantity;
    
    const sizeKey = selectedSize?.toUpperCase();
    if (!sizeKey || !product?.sizes || !product.sizes[sizeKey]) return 0;
    
    const price = Number(product.sizes[sizeKey]) || 0;
    return price * quantity;
  };
  
  // Obtener el nombre del tamaño para mostrar
  const getSizeName = (size = selectedSize) => {
    if (!size) return '';
    const normalizedSize = size.toUpperCase();
    
    // Determinar qué objeto de tamaños usar basado en la categoría del producto
    const sizesObject = product?.category === 'pasta' ? pastaSizes : pizzaSizes;
    
    // Extraer solo el nombre del tamaño o usar el código de tamaño como respaldo
    return sizesObject?.[normalizedSize]?.name || normalizedSize;
  };
  
  return {
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    availableSizes,
    hasSize,
    getPrice,
    getSizeName,
    formattedPrice: getPrice().toFixed(2)
  };
};

export default useProductDetails;
