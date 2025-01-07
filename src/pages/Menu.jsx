import React, { useState } from 'react';
import HeroSection from '../components/features/menu/HeroSection';
import MenuSection from '../components/features/menu/MenuSection';
import MenuNavigation from '../components/features/menu/MenuNavigation';  
import { pizzas, pasta, salads, sides } from '../components/constants/menuData';

const MenuPage = () => {
  // Estado para manejar la categoría activa
  const [activeCategory, setActiveCategory] = useState('pizza');

  // Definir las categorías con sus productos
  const categories = [
    { id: 'pizza', name: 'Pizzas', products: pizzas },
    { id: 'pasta', name: 'Pasta', products: pasta },
    { id: 'salad', name: 'Salads', products: salads },
    { id: 'side', name: 'Sides', products: sides },
  ];

  // Objeto que mapea cada categoría a su título correspondiente
  const categoryTitles = {
    pizza: 'Our Fantastic Pizzas',
    pasta: 'Delicious Pasta Dishes',
    salad: 'Fresh and Healthy Salads',
    side: 'Tasty Side Orders',
  };

  // Encontrar la categoría activa y los productos correspondientes
  const activeCategoryData = categories.find(category => category.id === activeCategory);

  return (
    <div className="bg-lightBeige min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto px-4 pb-8">
        {/* Nombre de la Categoría Activa */}
        {activeCategoryData && (
          <h2 className="text-3xl font-oldstyle italic font-bold text-darkRed">
            {categoryTitles[activeCategory]}
          </h2>
        )}

        {/* Menú de navegación de categorías */}
        <MenuNavigation 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        {/* Mostrar productos de la categoría activa */}
        {activeCategoryData && (
          <MenuSection 
            title={activeCategoryData.name} 
            products={activeCategoryData.products} 
          />
        )}
      </div>
    </div>
  );
};

export default MenuPage;