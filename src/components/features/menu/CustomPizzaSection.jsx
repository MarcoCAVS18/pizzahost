// src/components/features/menu/CustomPizzaSection/index.jsx
import React, { useState } from 'react';
import { customPizzaOptions } from '../../constants/menuData';
import Button from '../../ui/Button';

const CustomPizzaSection = ({ onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('MEDIUM'); 
  const [portions, setPortions] = useState([
    { position: 1, flavorId: null },
    { position: 2, flavorId: null },
    { position: 3, flavorId: null },
    { position: 4, flavorId: null }
  ]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getPizzaScale = () => {
    switch(selectedSize) {
      case 'XLARGE': return 'scale-110';
      case 'LARGE': return 'scale-100';
      case 'MEDIUM': return 'scale-90';
      case 'SMALL': return 'scale-80';
      default: return 'scale-90'; 
    }
  };

  const calculatePrice = () => {
    const basePrice = customPizzaOptions.basePrice[selectedSize];
    const filledPortions = portions.filter(p => p.flavorId).length;
    const portionPrice = customPizzaOptions.portionPrice[selectedSize] * filledPortions;
    return (basePrice + portionPrice) * quantity;
  };

  const handlePortionSelect = (position) => {
    setSelectedPosition(position === selectedPosition ? null : position);
  };

  const handleFlavorSelect = (flavorId) => {
    if (selectedPosition) {
      setPortions(portions.map(p => 
        p.position === selectedPosition ? { ...p, flavorId } : p
      ));
      setSelectedPosition(null);
    }
  };

  const getPortionClipPath = (position) => {
    switch(position) {
      case 1: return 'polygon(0 0, 100% 0, 50% 50%, 0 50%)';
      case 2: return 'polygon(100% 0, 100% 50%, 50% 50%, 50% 0)';
      case 3: return 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)';
      case 4: return 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)';
      default: return '';
    }
  };

  return (
    <div id="custom-pizza" className="container mx-auto px-4 mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-oldstyle text-darkRed mb-4">Create Your Own Pizza</h2>
        <p className="text-gray-600 font-serif max-w-2xl mx-auto">
          Design your perfect pizza in three simple steps! Choose your size, select different portions, 
          and pick your favorite flavors for each section. Create a unique combination that's perfect for you.
        </p>
      </div>
      
      <div className="p-8">
        {/* Size Selection */}
        <div className="mb-8">
          <h3 className="font-serif text-gray-600 mb-4">1. Choose Your Size</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(customPizzaOptions.basePrice).map(([size, price]) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-4 font-serif rounded-lg border-2 transition-all duration-300 shadow-lg 
                  ${selectedSize === size 
                    ? 'bg-darkRed text-white border-darkRed scale-105 shadow-lg' 
                    : 'bg-transparent text-gray-700 border-gray-200 hover:border-darkRed/50 shadow-lg'}`}
              >
                {size} - ${price.toFixed(2)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pizza Visualization */}
          <div>
            <h3 className="font-serif text-gray-600 mb-4">2. Select Your Portions</h3>
            <div className="relative aspect-square w-[500px] mx-auto">
              <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${getPizzaScale()}`}>
                {portions.map((portion) => {
                  const flavor = portion.flavorId ? 
                    customPizzaOptions.flavors.find(f => f.id === portion.flavorId) : null;
                  
                  return (
                    <div
                      key={portion.position}
                      onClick={() => handlePortionSelect(portion.position)}
                      style={{
                        clipPath: getPortionClipPath(portion.position)
                      }}
                      className={`absolute inset-0 cursor-pointer transition-all duration-300
                        ${selectedPosition === portion.position ? 'ring-2 ring-darkRed ring-inset' : ''}`}
                    >
                      {flavor ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={flavor.image}
                            alt={flavor.name}
                            className="absolute w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full hover:bg-darkRed/5 border border-darkRed/20 bg-[#fcf5f0]" />
                      )}
                    </div>
                  );
                })}
                
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-darkRed/30 transform -translate-x-1/2"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-darkRed/30 transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            {portions.some(p => p.flavorId) && (
              <div className="mt-4 p-3 rounded-lg border border-darkRed/20 text-sm">
                <div className="space-y-1 text-gray-600">
                  <p>Base ({selectedSize}): ${customPizzaOptions.basePrice[selectedSize].toFixed(2)}</p>
                  <p>Portions: {portions.filter(p => p.flavorId).length} x ${customPizzaOptions.portionPrice[selectedSize].toFixed(2)}</p>
                  <div className="border-t border-darkRed/20 mt-1 pt-1">
                    <p className="font-serif text-darkRed">Per unit: ${(calculatePrice() / quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Flavor Selection */}
          <div>
            <h3 className="font-serif text-gray-600 mb-4">
              {selectedPosition ? `3. Choose Flavor for Portion ${selectedPosition}` : '3. Select a portion to choose its flavor'}
            </h3>
            {selectedPosition && (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {customPizzaOptions.flavors.map(flavor => (
                  <button
                    key={flavor.id}
                    onClick={() => handleFlavorSelect(flavor.id)}
                    className="w-full p-4 text-left rounded-lg border hover:shadow-lg transition-all duration-300
                      hover:border-darkRed/50 focus:outline-none focus:ring-2 focus:ring-darkRed/50
                      group"
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={flavor.image} 
                        alt={flavor.name}
                        className="w-16 h-16 object-cover rounded-full border-2 border-transparent
                          group-hover:border-darkRed/50"
                      />
                      <div>
                        <div className="font-serif text-darkRed">{flavor.name}</div>
                        <div className="text-sm text-gray-600">{flavor.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-xl font-serif text-darkRed">
              ${calculatePrice().toFixed(2)}
            </div>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 h-12 px-2 bg-transparent appearance-none rounded-lg border shadow-md 
                text-center font-serif text-gray-700"
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>
          
          <Button 
            text="Add to Cart" 
            onClick={() => onAddToCart({
              type: 'custom-pizza',
              size: selectedSize,
              portions,
              quantity,
              totalPrice: calculatePrice()
            })}
            size="medium"
            className="w-48 h-12 text-base font-serif rounded-lg shadow-md bg-darkRed text-white 
              hover:scale-105 hover:bg-lightRed transition-transform duration-300 
              flex items-center justify-center"
            disabled={!portions.some(p => p.flavorId)}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPizzaSection;