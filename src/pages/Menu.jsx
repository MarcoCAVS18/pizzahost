import React, { useState, useEffect } from 'react';
// Feature Components
import HeroSection from '../components/features/menu/HeroSection';
import MenuSection from '../components/features/menu/MenuSection';
import MenuNavigation from '../components/features/menu/MenuNavigation';
import CustomPizzaSection from '../components/features/menu/CustomPizzaSection';
// Data
import { pizzas, pasta, salads, sides } from '../components/constants/menuData';
// Animation Context
import { AnimationProvider } from '../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../context/ScrollAnimation/ScrollAnimation';

// AntimationLoader
import { usePageLoader } from '../hoks/usePageLoader';

const MenuPage = ({ setIsLoading }) => {
  const [activeCategory, setActiveCategory] = useState('pizza');
  usePageLoader(setIsLoading);

  // Efecto para manejar el scroll a custom-pizza cuando se accede por hash
  useEffect(() => {
    if (window.location.hash === '#custom-pizza') {
      setActiveCategory('pizza');
      const element = document.getElementById('custom-pizza');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
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

  const handleCategoryChange = (newCategory) => {
    if (newCategory !== activeCategory) {
      setActiveCategory(newCategory);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
              onCategoryChange={handleCategoryChange}
            />

            <div className="transition-opacity duration-300">
              <MenuSection
                title={activeCategoryData.name}
                products={activeCategoryData.products}
                onAddToCart={handleAddToCart}
              />
            </div>
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