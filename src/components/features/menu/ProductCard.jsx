import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Button from '../../ui/Button';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist }) => {
    const hasSize = !!product.sizes;
    const [selectedSize, setSelectedSize] = useState(hasSize ? 'SMALL' : null);
    const [quantity, setQuantity] = useState(1);
    const price = hasSize ? product.sizes[selectedSize] * quantity : product.price * quantity;
  

  // Placeholder para evitar el error al hacer clic en el ícono de wishlist
  const handleWishlistToggle = () => {
    console.log("Wishlist clicked");
  };

  return (
    <div className="bg-transparent rounded-3xl shadow-2xl border-2 hover:scale-105 transition-all duration-300 w-full flex flex-col">
      {/* Imagen del producto */}
      <div className="relative w-full h-56">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain bg-transparent"
        />
      </div>
  
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-xl font-serif text-darkRed">{product.name}</h3>
        <p className="text-gray-600 font-serif text-sm mb-4">{product.description}</p>
        
        {/* Selección de tamaño en dos columnas (solo para productos con tamaños) */}
        {hasSize && (
          <div className="mb-4">
            <label className="font-oldstyle text-gray-600">Size</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {Object.entries(product.sizes).map(([sizeKey, price]) => (
                <button
                  key={sizeKey}
                  onClick={() => setSelectedSize(sizeKey)}
                  className={`px-4 py-2 text-sm font-serif rounded-full border shadow-md transition-all
                  ${selectedSize === sizeKey ? 'bg-darkRed text-white' : 'bg-transparent text-gray-700 hover:bg-gray-100'}`}
                >
                  {sizeKey}
                </button>
              ))}
            </div>
          </div>
        )}
  
        {/* Precio dinámico */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-serif text-darkRed">${price.toFixed(2)}</span>
          <button 
            onClick={handleWishlistToggle} 
            className={`text-xl ${isInWishlist ? 'text-red-500' : 'text-gray-400'} transition-colors`}
          >
            <FaHeart />
          </button>
        </div>
  
        {/* Contenedor Cantidad + Botón */}
        <div className="flex items-center gap-4 mt-auto h-12">
          {/* Selector de Cantidad */}
          <select 
            value={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-1/3 h-full px-2 bg-transparent appearance-none rounded-lg border shadow-md text-center font-serif text-gray-700"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
  
          {/* Botón "Add to Cart" */}
          <div className="w-2/3 h-full">
            <Button 
              text="Add to Cart" 
              onClick={() => onAddToCart(product, selectedSize, quantity)} 
              size="medium"
              className="w-full h-full text-base font-serif rounded-lg shadow-md bg-darkRed text-white hover:scale-105 hover:bg-lightRed transition-transform duration-300 flex items-center justify-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

