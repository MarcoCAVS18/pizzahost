import React from 'react';
import ProductCard from './ProductCard';

const MenuSection = ({ products }) => {
  return (
    <div className="menu-section">
      <div className='mb-4'></div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-8">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={(product) => console.log('Added to cart:', product)} 
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
