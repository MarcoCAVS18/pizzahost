// components/cart/CartItem.jsx

import React from 'react';
import { FaTrash } from 'react-icons/fa';

const CartItem = ({ 
  id,
  image, 
  name, 
  price, 
  quantity,
  selectedSize,
  onUpdateQuantity,
  onRemove 
}) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <div className="w-20 h-20 flex-shrink-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-sm font-medium text-gray-800">{name}</h3>
        {selectedSize && (
          <p className="text-xs text-gray-600">Size: {selectedSize}</p>
        )}
        <p className="text-sm font-bold text-darkRed">${price.toFixed(2)}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <select
            value={quantity}
            onChange={(e) => onUpdateQuantity(id, parseInt(e.target.value), selectedSize)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => onRemove(id, selectedSize)}
            className="text-gray-400 hover:text-darkRed transition-colors"
            aria-label="Remove item"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;