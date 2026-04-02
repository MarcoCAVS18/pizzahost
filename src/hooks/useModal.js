import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../services/productService';

export const useCustomPizzaModal = (selectedSize) => {
  const [selectedFlavors, setSelectedFlavors] = useState({
    left: null,
    right: null
  });
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar pizzas de Firestore
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        const pizzaProducts = await getProductsByCategory('pizza');
        setPizzas(pizzaProducts);
      } catch (error) {
        console.error("Error loading pizzas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const handleFlavorSelect = (pizza) => {
    if (!selectedFlavors.left) {
      setSelectedFlavors(prev => ({
        ...prev,
        left: pizza
      }));
    } else if (!selectedFlavors.right && selectedFlavors.left.id !== pizza.id) {
      setSelectedFlavors(prev => ({
        ...prev,
        right: pizza
      }));
    }
  };

  const calculatePrice = (pizza, size) => {
    if (!pizza || !size) return 0;
    // Asegúrate de que el precio sea un número
    const basePrice = typeof pizza.sizes[size] === 'number' 
      ? pizza.sizes[size] 
      : 0;
    // Añade un pequeño margen por ser pizza personalizada
    return basePrice * 1.1; // 10% de margen
  };

  const calculateTotalPrice = () => {
    if (!selectedFlavors.left || !selectedFlavors.right) return 0;
    const leftPrice = calculatePrice(selectedFlavors.left, selectedSize);
    const rightPrice = calculatePrice(selectedFlavors.right, selectedSize);
    return ((leftPrice + rightPrice) / 2).toFixed(2);
  };

  const canConfirm = selectedFlavors.left && 
                     selectedFlavors.right && 
                     selectedFlavors.left.id !== selectedFlavors.right.id;

  const resetSelection = () => {
    setSelectedFlavors({
      left: null,
      right: null
    });
  };

  return {
    selectedFlavors,
    pizzas,
    loading,
    handleFlavorSelect,
    calculatePrice,
    calculateTotalPrice,
    canConfirm,
    resetSelection,
    setSelectedFlavors
  };
};