// components/features/cart/recommendations/RecommendationCard.jsx
import React from 'react';
import Button from '../../../ui/Button';
import Card from '../../../ui/Card';
import useProductDetails from '../../../../hooks/useProductDetails';

const RecommendationCard = ({ product, onAddToCart, preferredSize }) => {
  // Determinar el tamaño inicial basado en el preferido
  const initialSize = (() => {
    if (!product.sizes) return null;
    
    const availableSizes = Object.keys(product.sizes);
    
    if (preferredSize && availableSizes.includes(preferredSize.toUpperCase())) {
      return preferredSize.toUpperCase();
    }
    return availableSizes[0]?.toUpperCase();
  })();
  
  const {
    selectedSize,
    getSizeName,
    formattedPrice
  } = useProductDetails(product, initialSize, 1);
  
  return (
    <Card
      variant="product"
      image={product.image}
      title={product.name}
      className="bg-beige rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border-2 border-gray-100 w-full h-full"
    >
      <div className="flex justify-between items-center my-2">
        {selectedSize && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase">
            {getSizeName()}
          </span>
        )}
        <span className="font-serif text-darkRed text-lg font-semibold">${formattedPrice}</span>
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
    </Card>
  );
};

export default RecommendationCard;
