// src/pages/Menu.jsx

import React, { useState, useEffect } from 'react';
import HeroSection from '../components/features/menu/HeroSection';
import MenuSection from '../components/features/menu/MenuSection';
import MenuNavigation from '../components/features/menu/MenuNavigation';
import CustomPizzaSection from '../components/features/menu/CustomPizzaSection';
  
import { pizzas, pasta, salads, sides } from '../components/constants/menuData';
import { AnimationProvider } from '../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../context/ScrollAnimation/ScrollAnimation';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('pizza');

  useEffect(() => {
    if (window.location.hash === '#custom-pizza') {
      setActiveCategory('pizza');
      setTimeout(() => {
        document.getElementById('custom-pizza')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const categories = [
    { id: 'pizza', name: 'Pizzas', products: pizzas },
    { id: 'pasta', name: 'Pasta', products: pasta },
    { id: 'salad', name: 'Salads', products: salads },
    { id: 'side', name: 'Sides', products: sides },
  ];

  const categoryTitles = {
    pizza: 'Our Fantastic Pizzas',
    pasta: 'Delicious Pasta Dishes',
    salad: 'Fresh and Healthy Salads',
    side: 'Tasty Side Orders',
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };

  const activeCategoryData = categories.find(category => category.id === activeCategory);

  return (
    <div className="bg-lightBeige min-h-screen">
      <AnimationProvider>
        <HeroSection />

        <div className="container mx-auto px-4 pb-8">
          <ScrollAnimation delay={0}>
            {activeCategoryData && (
              <h2 className="text-3xl font-oldstyle italic font-bold text-darkRed mb-6">
                {categoryTitles[activeCategory]}
              </h2>
            )}
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <MenuNavigation
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <MenuSection
              title={activeCategoryData.name}
              products={activeCategoryData.products}
              onAddToCart={handleAddToCart}
            />
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            {activeCategory === 'pizza' && (
              <div id="custom-pizza" className="mt-16 scroll-mt-32">
                <CustomPizzaSection onAddToCart={handleAddToCart} />
              </div>
            )}
          </ScrollAnimation>
        </div>
      </AnimationProvider>
    </div>
  );
};

export default MenuPage;