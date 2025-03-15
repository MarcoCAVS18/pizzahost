import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/features/menu/HeroSection';
import MenuSection from '../components/features/menu/MenuSection';
import MenuNavigation from '../components/features/menu/MenuNavigation';
import CustomPizzaSection from '../components/features/menu/CustomPizzaSection';
import { pizzas, pasta, salads, sides } from '../components/constants/menuData';
import { AnimationProvider } from '../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../context/ScrollAnimation/ScrollAnimation';
import { usePageLoader } from '../hoks/usePageLoader';
import { useCart } from '../hoks/useCart';

const MenuPage = ({ setIsLoading }) => {
  const [activeCategory, setActiveCategory] = useState('pizza');
  const menuSectionRef = useRef(null);
  const location = useLocation();
  usePageLoader(setIsLoading);
  const { addItem } = useCart();

  useEffect(() => {
    // Handle hash-based navigation
    const hash = window.location.hash;
    if (hash === '#custom-pizza') {
      setActiveCategory('pizza');
      const element = document.getElementById('custom-pizza');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else if (hash === '#menu-section') {
      // Scroll to the menu section
      if (menuSectionRef.current) {
        setTimeout(() => {
          menuSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }

    // Handle category-based navigation from state (if implemented in the future)
    if (location.state && location.state.activeCategory) {
      setActiveCategory(location.state.activeCategory);
    }
  }, [location]);

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
    addItem(product);
  };

  const handleCategoryChange = (newCategory) => {
    if (newCategory !== activeCategory) {
      setActiveCategory(newCategory);
      // En lugar de hacer scroll a top: 0, hacemos scroll al menuSectionRef
      if (menuSectionRef.current) {
        setTimeout(() => {
          menuSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  };

  const activeCategoryData = categories.find(category => category.id === activeCategory);

  return (
    <div className="bg-lightBeige min-h-screen">
      <AnimationProvider>
        <HeroSection />
        <div className="container mx-auto px-4 pb-8">
          <div id="menu-section" ref={menuSectionRef} className="scroll-mt-32">
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
          </div>

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