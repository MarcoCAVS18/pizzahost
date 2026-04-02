// pages/MenuPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/features/menu/HeroSection';
import MenuSection from '../components/features/menu/MenuSection';
import MenuNavigation from '../components/features/menu/MenuNavigation';
import CustomPizzaSection from '../components/features/menu/CustomPizzaSection';
import { AnimationProvider } from '../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../context/ScrollAnimation/ScrollAnimation';
import { usePageLoader } from '../hooks/usePageLoader';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { getProductsByCategory } from '../services/productService';
import Loader from '../components/ui/Loader';

const MenuPage = ({ setIsLoading }) => {
  const [activeCategory, setActiveCategory] = useState('pizza');
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const menuSectionRef = useRef(null);
  const location = useLocation();
  usePageLoader(setIsLoading);
  const { addItem } = useCart();
  const { pizzaSizes } = useProducts();

  // Cargar productos de la categoría activa
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const products = await getProductsByCategory(activeCategory);
        setCategoryProducts(products);
      } catch (error) {
        console.error(`Error loading ${activeCategory} products:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [activeCategory]);

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

    // Handle category-based navigation from state
    if (location.state && location.state.activeCategory) {
      setActiveCategory(location.state.activeCategory);
    }
  }, [location]);

  // Definición de categorías disponibles
  const categories = [
    { id: 'pizza', name: 'Pizzas' },
    { id: 'pasta', name: 'Pasta' },
    { id: 'salad', name: 'Salads' },
    { id: 'side', name: 'Sides' },
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
      if (menuSectionRef.current) {
        setTimeout(() => {
          menuSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  };

  return (
    <div className="bg-lightBeige min-h-screen">
      <AnimationProvider>
        <HeroSection />
        <div className="container mx-auto px-4 pb-8">
          <div id="menu-section" ref={menuSectionRef} className="scroll-mt-32">
            <ScrollAnimation delay={0}>
              <h2 className="text-3xl font-oldstyle italic font-bold text-darkRed mb-6">
                {categoryTitles[activeCategory]}
              </h2>
            </ScrollAnimation>

            <ScrollAnimation delay={200}>
              <MenuNavigation
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
              <div className="transition-opacity duration-300">
                {loading ? (
                  <Loader />
                ) : (
                  <MenuSection
                    title={categories.find(c => c.id === activeCategory)?.name}
                    products={categoryProducts}
                    onAddToCart={handleAddToCart}
                  />
                )}
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation delay={400}>
            {activeCategory === 'pizza' && (
              <div id="custom-pizza" className="mt-16 scroll-mt-32">
                <CustomPizzaSection 
                  onAddToCart={handleAddToCart} 
                  pizzaSizes={pizzaSizes}
                />
              </div>
            )}
          </ScrollAnimation>
        </div>
      </AnimationProvider>
    </div>
  );
};

export default MenuPage;