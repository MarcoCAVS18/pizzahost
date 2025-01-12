// hooks/useCustomPizzaModal.js

import { useState } from 'react';
import { pizzas } from '../components/constants/menuData';

export const useCustomPizzaModal = (selectedSize) => {
  const [selectedFlavors, setSelectedFlavors] = useState({
    left: null,
    right: null
  });

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
    handleFlavorSelect,
    calculatePrice,
    calculateTotalPrice,
    canConfirm,
    resetSelection,
    setSelectedFlavors
  };
};