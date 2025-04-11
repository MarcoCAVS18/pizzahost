// components/features/menu/ProductCard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import clsx from "clsx";
import { FaHeart } from "react-icons/fa";
import Button from "../../ui/Button";
import { useProducts } from '../../../hooks/useProducts';

// Orden predefinido de tamaños
const SIZE_ORDER = ['SMALL', 'MEDIUM', 'LARGE', 'XLARGE'];

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const { pizzaSizes, pastaSizes } = useProducts();
  const hasSize = !!product.sizes;
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
  }, [hasSize, product.sizes]);

  useEffect(() => {
    if (hasSize && availableSizes.length > 0) {
      // Establecer tamaño por defecto (el primero después de ordenar)
      setSelectedSize(availableSizes[0]);
    }
  }, [hasSize, availableSizes]);

  const getPrice = () => {
    if (!hasSize) return (Number(product.price) || 0) * quantity;
    
    const sizeKey = selectedSize?.toUpperCase();
    if (!sizeKey || !product.sizes || !product.sizes[sizeKey]) return 0;
    
    const price = Number(product.sizes[sizeKey]) || 0;
    return price * quantity;
  };

  const getSizeName = (size) => {
    if (!size) return '';
    const normalizedSize = size.toUpperCase();
    
    // Determinar qué objeto de tamaños usar basado en la categoría del producto
    const sizesObject = product.category === 'pasta' ? pastaSizes : pizzaSizes;
    
    // Extraer solo el nombre del tamaño o usar el código de tamaño como respaldo
    return sizesObject?.[normalizedSize]?.name || normalizedSize;
  };

  return (
    <div className="bg-transparent rounded-3xl shadow-2xl border-2 hover:scale-105 transition-all duration-300 w-full flex flex-col">
      <div className="relative w-full h-56">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-xl font-serif text-darkRed">{product.name}</h3>
        
        {/* Mostrar descripción del producto en lugar de ingredientes */}
        {product.description && (
          <p className="text-gray-600 font-serif text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {hasSize && (
          <div className="mb-4">
            <label className="font-oldstyle text-gray-600">Size</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {availableSizes.map((sizeKey) => {
                const normalizedSize = sizeKey.toUpperCase();
                return (
                  <button
                    key={sizeKey}
                    onClick={() => setSelectedSize(normalizedSize)}
                    className={clsx(
                      "px-4 py-2 text-sm font-serif rounded-full border shadow-md transition-all",
                      selectedSize === normalizedSize ? "bg-darkRed text-white" : "bg-transparent text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {getSizeName(normalizedSize)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-serif text-darkRed">${getPrice().toFixed(2)}</span>
          <button onClick={onToggleWishlist} className={clsx("text-xl transition-colors", isInWishlist ? "text-red-500" : "text-gray-400")}>
            <FaHeart />
          </button>
        </div>
        <div className="flex items-center gap-4 mt-auto h-12">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-1/3 h-full px-2 bg-transparent appearance-none rounded-lg border shadow-md text-center font-serif text-gray-700"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
          <div className="w-2/3 h-full">
            <Button
              text="Add to Cart"
              onClick={() => onAddToCart(product, selectedSize?.toUpperCase(), quantity)}
              className="w-full h-full"
              bgColor="bg-darkRed"
              hoverColor="hover:bg-lightRed"
              isCartButton={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;