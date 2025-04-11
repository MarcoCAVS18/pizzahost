// components/features/cart/recommendations/RecommendationCard.jsx
import React from 'react';
import Button from '../../../ui/Button';
import { useProducts } from '../../../../hooks/useProducts';

const RecommendationCard = ({ product, onAddToCart, preferredSize }) => {
  const { pizzaSizes, pastaSizes } = useProducts();
  
  // Usar el tamaño preferido si está disponible, de lo contrario usar el más pequeño
  const determineSize = () => {
    if (!product.sizes) return null;
    
    const availableSizes = Object.keys(product.sizes);
    
    if (preferredSize && availableSizes.includes(preferredSize.toUpperCase())) {
      return preferredSize.toUpperCase();
    }
    return availableSizes[0]?.toUpperCase();
  };
  
  const selectedSize = determineSize();
  const price = product.sizes ? product.sizes[selectedSize] : product.price;
  
  const getSizeName = () => {
    if (!selectedSize) return '';
    const normalizedSize = selectedSize.toUpperCase();
    return product.category === 'pasta' ? pastaSizes[normalizedSize]?.name || normalizedSize : pizzaSizes[normalizedSize]?.name || normalizedSize;
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
            text="Add to Cart"
            onClick={() => onAddToCart(product, selectedSize, 1)}
            className="w-full py-2"
            bgColor="bg-darkRed"
            hoverColor="hover:bg-lightRed"
            textColor="text-white"
            isCartButton={true}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;