// components/features/cart/recommendations/RecommendationCard.jsx
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import Button from '../../../ui/Button';
import { pizzaSizes, pastaSizes } from '../../../constants/menuData';

const RecommendationCard = ({ product, onAddToCart, preferredSize }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  // Usar el tamaño preferido si está disponible, de lo contrario usar el más pequeño
  const determineSize = () => {
    if (!product.sizes) return null;
    
    const availableSizes = Object.keys(product.sizes);
    
    // Si el tamaño preferido está disponible para este producto, usarlo
    if (preferredSize && availableSizes.includes(preferredSize.toUpperCase())) {
      return preferredSize.toUpperCase();
    }
    
    // Si no, usar el más pequeño (normalmente el primero en la lista)
    return availableSizes[0]?.toUpperCase();
  };
  
  const selectedSize = determineSize();
  const price = product.sizes ? product.sizes[selectedSize] : product.price;
  
  // Obtener el nombre legible del tamaño
  const getSizeName = () => {
    if (!selectedSize) return '';
    
    const normalizedSize = selectedSize.toUpperCase();
    if (product.category === 'pasta') {
      return pastaSizes[normalizedSize]?.name || normalizedSize;
    }
    return pizzaSizes[normalizedSize]?.name || normalizedSize;
  };
  
  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, 1);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <div className="bg-beige rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border-2 border-gray-100 w-full h-full">
      <div className="h-40 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-2"
        />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h4 className="text-lg font-serif text-darkRed font-bold truncate">{product.name}</h4>
        
        <div className="flex justify-between items-center my-2">
          {selectedSize && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase">
              {getSizeName()}
            </span>
          )}
          <span className="font-serif text-darkRed text-lg font-semibold">${price?.toFixed(2)}</span>
        </div>
        
        <div className="mt-auto">
          <Button
            text={isAddedToCart ? <FaCheck className="text-white" /> : "Add to Cart"}
            onClick={handleAddToCart}
            className="w-full py-2"
            bgColor={isAddedToCart ? "bg-green-500" : "bg-darkRed"}
            hoverColor="hover:bg-lightRed"
            textColor="text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;