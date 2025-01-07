import React from 'react';

const MenuNavigation = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex space-x-4">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`py-4 px-2 font-serif relative ${
            activeCategory === category.id 
              ? 'text-darkRed' 
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
  );
};

export default MenuNavigation;
