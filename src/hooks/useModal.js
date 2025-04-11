// hooks/useCustomPizzaModal.js
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
    } else if (!selectedFlavors.right) {
      setSelectedFlavors(prev => ({
        ...prev,
        right: pizza
      }));
    }
  };

  const calculatePrice = (pizza) => {
    if (!pizza) return 0;
    return (pizza.sizes[selectedSize] / 2) * 1.05; 
  };

  const calculateTotalPrice = () => {
    if (!selectedFlavors.left || !selectedFlavors.right) return 0;
    return (calculatePrice(selectedFlavors.left) + calculatePrice(selectedFlavors.right)).toFixed(2);
  };

  const canConfirm = selectedFlavors.left && selectedFlavors.right;

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