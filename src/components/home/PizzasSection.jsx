// PizzasSection.jsx
import React from 'react';
import Card from '../common/Card';
import pizzaImage from '../../assets/images/pizzas/prueba2.webp';
import primaryImage from '../../assets/images/EQgnndgsDnOFzMSzJxRuiI-4096x4096.webp';
import Button from '../common/Button';

const PizzaSection = () => {
  const pizzaOptions = [
    {
      image: pizzaImage,
      title: "The Classic",
      subtitle: "Classic Italian Flavors",
      buttonText: "Add to Cart",
    },
    {
      image: pizzaImage,
      title: "The Pepperoni",
      subtitle: "A Classic Delight",
      buttonText: "Add to Cart",
    },
  ];

  return (
    <div className="bg-beige py-8 sm:py-16 px-4 sm:px-8">
      <div className="text-center mb-12">
        <p className="text-gray-500 text-sm font-serif italic">
          Explore Our Pizza Favorites
        </p>
        <h2 className="font-serif font-semibold italic text-4xl sm:text-5xl my-4">
          Elevate Your Dining<br />
          Experience with Our
        </h2>
        <Button 
          text="View Menu" 
          className="font-oldstyle font-semibold text-white bg-darkRed hover:bg-red py-2 px-6 rounded-full transition text-lg mx-auto md:mx-0" 
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 min-h-[545px]">
        <div className="lg:w-1/2 h-full order-1 lg:order-none">
          <div className="w-full h-full">
            <img
              src={primaryImage}
              alt="Featured pizza"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
        <div className="lg:w-1/2 flex flex-col gap-8 justify-start order-2 lg:order-none">
          {pizzaOptions.map((pizza, index) => (
            <Card
              key={index}
              image={pizza.image}
              title={pizza.title}
              subtitle={pizza.subtitle}
              buttonText={pizza.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PizzaSection;

