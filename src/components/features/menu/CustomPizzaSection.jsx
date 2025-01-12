// components/features/menu/CustomPizzaSection.jsx

import React, { useState } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import { pizzas } from '../../constants/menuData';
import CustomPizzaModal from './CustomPizzaModal';
import { useCustomPizzaModal } from '../../../hoks/useModal';

const CustomPizzaSection = ({ onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('MEDIUM');
  const [selectedFlavors, setSelectedFlavors] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { resetSelection } = useCustomPizzaModal(selectedSize);


  const handleConfirm = (flavors) => {
    setSelectedFlavors(flavors);
    setIsModalOpen(false);
  };

  const calculatePrice = () => {
    if (!selectedFlavors) return pizzas[0].sizes[selectedSize];

    const leftPrice = selectedFlavors.left.sizes[selectedSize];
    const rightPrice = selectedFlavors.right.sizes[selectedSize];
    return ((leftPrice + rightPrice) / 2 * 1.1 * quantity).toFixed(2);
  };

  return (
    <div id="custom-pizza" className="container mx-auto px-4 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-oldstyle text-darkRed mb-4">Create Your Own Pizza</h2>
        <p className="text-gray-600 font-serif max-w-2xl mx-auto">
          Design your perfect pizza in two simple steps! Choose your size and create
          a unique combination with two of your favorite flavors.
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Size Selection */}
        <div className="mb-12">
          <h3 className="font-serif text-xl text-gray-600 mb-6">1. Choose Your Size</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(pizzas[0].sizes).map(([size, price]) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-4 font-serif rounded-lg border-2 transition-all duration-300
                  ${selectedSize === size
                    ? 'bg-darkRed text-white border-darkRed scale-105'
                    : 'bg-transparent text-gray-700 border-gray-200 hover:border-darkRed/50'}`}
              >
                {size} - ${price.toFixed(2)}
              </button>
            ))}
          </div>
        </div>

        {/* Flavor Selection Button */}
        <div className="mb-12">
          <h3 className="font-serif text-xl text-gray-600 mb-6">2. Select Your Flavors</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-6 px-4 rounded-lg border-2 border-darkRed/50 hover:border-darkRed
              flex items-center justify-center gap-4 bg-white hover:bg-darkRed/5 transition-all duration-300"
          >
            <FaPizzaSlice className={`text-2xl ${selectedFlavors ? 'text-green' : 'text-darkRed'}`} />
            <span className="font-serif text-lg">
              {selectedFlavors
                ? `${selectedFlavors.left.name} & ${selectedFlavors.right.name}`
                : 'Choose Your Flavors'}
            </span>
          </button>
        </div>

        {/* Price and Order Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/50 p-6 rounded-lg border border-darkRed/20">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-serif text-darkRed">
              ${calculatePrice()}
            </div>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 h-12 px-2 bg-transparent rounded-lg border shadow-md 
                text-center font-serif text-gray-700 focus:border-darkRed focus:outline-none"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onAddToCart({
              type: 'custom-pizza',
              size: selectedSize,
              flavors: selectedFlavors,
              quantity,
              totalPrice: calculatePrice()
            })}
            disabled={!selectedFlavors}
            className={`w-full sm:w-48 h-12 px-6 rounded-lg font-serif text-white transition-all
              ${selectedFlavors
                ? 'bg-darkRed hover:bg-lightRed'
                : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <CustomPizzaModal
        isOpen={isModalOpen}
        onClose={() => {
          resetSelection();
          setIsModalOpen(false);
        }}
        onConfirm={handleConfirm}
        selectedSize={selectedSize}
        resetSelection={resetSelection}
      />
    </div>
  );
};

export default CustomPizzaSection;