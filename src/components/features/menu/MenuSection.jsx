import React from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../../../hooks/useCart';

const MenuSection = ({ products }) => {
  const { addItem } = useCart();

  const handleAddToCart = (product, selectedSize, quantity = 1) => {
    if (!selectedSize && product.sizes) {
      // Si no hay tamaño seleccionado pero el producto tiene tamaños, 
      // usamos el primer tamaño disponible
      const availableSizes = Object.keys(product.sizes);
      if (availableSizes.length > 0) {
        selectedSize = availableSizes[0];
      } else {
        console.error(`Error: No hay tamaños disponibles para el producto ${product.name}`);
        return;
      }
    }

    const itemPrice = product.sizes ? product.sizes[selectedSize] : product.price;
    const itemToAdd = {
      ...product,
      selectedSize,
      quantity,
      price: itemPrice,
      extras: [],
    };

    addItem(itemToAdd);
  };

  return (
    <div className="menu-section mb-16">
      <div className="mb-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;