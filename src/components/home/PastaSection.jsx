// PastaSection.jsx
import React from 'react';
import Card from '../common/Card';
import pizzaImage from '../../assets/images/pizzas/prueba2.webp';
import primaryImage from '../../assets/images/EQgnndgsDnOFzMSzJxRuiI-4096x4096.webp';

const PastaSection = () => {
  const pastaOptions = [
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
          Satisfy Your Cravings
        </p>
        <h2 className="font-serif font-semibold italic text-4xl sm:text-5xl mt-4">
          Pasta Perfection
        </h2>
        <h3 className="text-gray-600 text-md sm:text-lg font-oldstyle mt-6">
          Discover our wide array of delectable pasta dishes, from classic spaghetti and meatballs to innovative vegetarian creations.<br />
          Each plate is a culinary masterpiece, crafted with the freshest ingredients and cooked to perfection
        </h3>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-14 min-h-[545px]">
        <div className="lg:w-1/2 flex flex-col gap-8 justify-between">
          {pastaOptions.map((pasta, index) => (
            <Card
              key={index}
              image={pasta.image}
              title={pasta.title}
              subtitle={pasta.subtitle}
              buttonText={pasta.buttonText}
            />
          ))}
        </div>
        <div className="lg:w-1/2 h-full">
          <div className="w-full h-full">
            <img
              src={primaryImage}
              alt="Featured pizza"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastaSection;