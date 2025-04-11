import React, { useState, useEffect } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import CustomPizzaModal from './CustomPizzaModal';
import Button from '../../ui/Button';
import { getProductsByCategory, getSizes } from '../../../services/productService';

// Orden predefinido de tamaños
const SIZE_ORDER = ['SMALL', 'MEDIUM', 'LARGE', 'XLARGE'];

const generateCompositeImage = (leftImageUrl, rightImageUrl) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    const leftImage = new Image();
    leftImage.src = leftImageUrl;
    leftImage.onload = () => {
      ctx.drawImage(leftImage, 0, 0, 100, 200);

      const rightImage = new Image();
      rightImage.src = rightImageUrl;
      rightImage.onload = () => {
        ctx.drawImage(rightImage, 100, 0, 100, 200);
        resolve(canvas.toDataURL());
      };
    };
  });
};

const CustomPizzaSection = ({ onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('MEDIUM');
  const [selectedFlavors, setSelectedFlavors] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pizzaSizes, setPizzaSizes] = useState({});
  const [pizzaProducts, setPizzaProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar tamaños y productos de pizza
  useEffect(() => {
    const fetchPizzaData = async () => {
      try {
        setLoading(true);
        
        // Cargar tamaños
        const sizes = await getSizes('pizza');
        setPizzaSizes(sizes || {});
        
        // Cargar productos
        const products = await getProductsByCategory('pizza');
        setPizzaProducts(products || []);
      } catch (error) {
        console.error("Error loading pizza data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzaData();
  }, []);

  // Ordenar los tamaños según el orden predefinido
  const orderedSizes = React.useMemo(() => {
    if (!pizzaSizes || Object.keys(pizzaSizes).length === 0) return [];
    
    return Object.entries(pizzaSizes)
      .sort(([sizeKeyA], [sizeKeyB]) => {
        const indexA = SIZE_ORDER.indexOf(sizeKeyA.toUpperCase());
        const indexB = SIZE_ORDER.indexOf(sizeKeyB.toUpperCase());
        
        // Si ambos tamaños están en nuestro array de orden, usar ese orden
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        
        // Si solo uno está en el array, priorizar el que está
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        
        // Si ninguno está en el array, usar orden alfabético
        return sizeKeyA.localeCompare(sizeKeyB);
      });
  }, [pizzaSizes]);

  const handleConfirm = (flavors) => {
    setSelectedFlavors(flavors);
    setIsModalOpen(false);
  };

  const calculatePrice = () => {
    if (!selectedFlavors || !pizzaSizes[selectedSize]) {
      // Asegurarse de que accedemoss al precio de manera segura
      return typeof pizzaSizes[selectedSize]?.price === 'number' 
        ? pizzaSizes[selectedSize].price.toFixed(2) 
        : '0.00';
    }
    
    const leftPrice = selectedFlavors.left.sizes[selectedSize] || 0;
    const rightPrice = selectedFlavors.right.sizes[selectedSize] || 0;
    return ((leftPrice + rightPrice) / 2 * 1.1 * quantity).toFixed(2);
  };

  const getCustomPizzaTitle = () => {
    if (!selectedFlavors) return 'Custom Pizza';
    return `${selectedFlavors.left.name} & ${selectedFlavors.right.name}`;
  };

  const handleAddToCart = async () => {
    if (!selectedFlavors) return;
    const compositeImage = await generateCompositeImage(
      selectedFlavors.left.image,
      selectedFlavors.right.image
    );
    onAddToCart({
      type: 'custom-pizza',
      size: selectedSize,
      flavors: selectedFlavors,
      quantity,
      totalPrice: calculatePrice(),
      title: getCustomPizzaTitle(),
      image: compositeImage,
    });
  };

  if (loading) {
    return (
      <div id="custom-pizza" className="container mx-auto px-4 mb-16 text-center py-12">
        Loading custom pizza options...
      </div>
    );
  }

  return (
    <div id="custom-pizza" className="container mx-auto px-4 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-oldstyle text-darkRed mb-4">Create Your Own Pizza</h2>
        <p className="text-gray-600 font-serif max-w-2xl mx-auto">
          Design your perfect pizza in two simple steps! Choose your size and create a unique combination with two of your favorite flavors.
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-12">
          <h3 className="font-serif text-xl text-gray-600 mb-6">1. Choose Your Size</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {orderedSizes.map(([size, sizeData]) => {
              // Verificar que sizeData sea un objeto y tenga propiedades name y price
              const sizeName = sizeData && typeof sizeData === 'object' && sizeData.name ? sizeData.name : size;
              const sizePrice = sizeData && typeof sizeData === 'object' && typeof sizeData.price === 'number' 
                ? sizeData.price.toFixed(2) 
                : '0.00';
              
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-4 font-serif rounded-lg border-2 transition-all duration-300
                    ${selectedSize === size ? 'bg-darkRed text-white border-darkRed scale-105' : 'bg-transparent text-gray-700 border-gray-200 hover:border-darkRed/50'}`}
                >
                  {sizeName} - ${sizePrice}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="font-serif text-xl text-gray-600 mb-6">2. Select Your Flavors</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-6 px-4 rounded-lg border-2 border-darkRed/50 hover:border-darkRed flex items-center justify-center gap-4 bg-white hover:bg-darkRed/5 transition-all duration-300"
          >
            <FaPizzaSlice className={`text-2xl ${selectedFlavors ? 'text-green' : 'text-darkRed'}`} />
            <span className="font-serif text-lg">
              {selectedFlavors ? `${selectedFlavors.left.name} & ${selectedFlavors.right.name}` : 'Choose Your Flavors'}
            </span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/50 p-6 rounded-lg border border-darkRed/20">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-serif text-darkRed">${calculatePrice()}</div>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 h-12 px-2 bg-transparent rounded-lg border shadow-md text-center font-serif text-gray-700 focus:border-darkRed focus:outline-none"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <Button
            text="Add to Cart"
            onClick={handleAddToCart}
            disabled={!selectedFlavors}
            className={`w-full sm:w-48 h-12 px-6 rounded-lg font-serif text-white transition-all ${!selectedFlavors ? 'cursor-not-allowed' : ''}`}
            bgColor={selectedFlavors ? "bg-darkRed" : "bg-gray-300"}
            hoverColor={selectedFlavors ? "hover:bg-lightRed" : ""}
            size="medium"
            isCartButton={true}
          />
        </div>
      </div>

      <CustomPizzaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        selectedSize={selectedSize}
        pizzas={pizzaProducts}
        resetSelection={() => setSelectedFlavors(null)}
      />
    </div>
  );
};

export default CustomPizzaSection;