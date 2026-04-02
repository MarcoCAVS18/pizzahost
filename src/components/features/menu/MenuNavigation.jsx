import React from 'react';

const MenuNavigation = ({ categories, activeCategory, onCategoryChange }) => {
  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
  };
  
  return (
    <div className="sticky top-20 z-10 bg-lightBeige py-2 mb-6 border-b border-gray-200">
      <div className="flex space-x-4 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`py-4 px-2 font-serif relative whitespace-nowrap ${
              activeCategory === category.id 
                ? 'text-darkRed font-bold' 
                : 'text-gray-600 hover:text-darkRed'
            } transition-colors`}
          >
            {category.name}
            {activeCategory === category.id && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-darkRed"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuNavigation;