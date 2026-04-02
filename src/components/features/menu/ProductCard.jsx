// components/features/menu/ProductCard.jsx
import React from 'react';
import clsx from 'clsx';
import { FaHeart } from 'react-icons/fa';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import useProductDetails from '../../../hooks/useProductDetails';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist }) => {
  // Usar el hook personalizado para manejar los detalles del producto
  const {
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    availableSizes,
    hasSize,
    getSizeName,
    formattedPrice
  } = useProductDetails(product);

  return (
    <Card
      variant="product"
      image={product.image}
      title={product.name}
      subtitle={product.description}
    >
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
        <span className="text-lg font-serif text-darkRed">${formattedPrice}</span>
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
    </Card>
  );
};

export default ProductCard;
