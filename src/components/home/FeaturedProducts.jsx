import React from 'react';

const pizzaData = [
  {
    image: '/images/pizza-specialty-1.jpg',
  },
  {
    image: '/images/pizza-specialty-2.jpg',
  },
  {
    image: '/images/pizza-specialty-3.jpg',
  },
  {
    image: '/images/customize-pizza.jpg',
    title: 'Customize Your Pie',
  },
];

function FlavorsSection() {
  return (
    <div className="bg-beige py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-600 font-oldstyle mb-3">
          Indulge in our Specialty Pizzas
        </p>
        <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-center mb-8 md:mb-12">
          Flavors You'll Love
        </h2>

        <div className="hidden lg:grid grid-cols-4 gap-6">
          {pizzaData.map((pizza, index) => (
            <div
              key={index}
              className="cursor-pointer group relative rounded-3xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={pizza.image}
                alt={pizza.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              
              {index === pizzaData.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-white font-serif text-xl">{pizza.title}</h3>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {pizzaData.slice(0, 3).map((pizza, index) => (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden aspect-square shadow-md"
              >
                <img
                  src={pizza.image}
                  alt={pizza.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
            ))}
          </div>
          
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] shadow-md">
            <img
              src={pizzaData[3].image}
              alt={pizzaData[3].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h3 className="text-white font-serif text-2xl">{pizzaData[3].title}</h3>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3 mb-3">
            {pizzaData.slice(0, 3).map((pizza, index) => (
              <div
                key={index}
                className={`relative rounded-2xl overflow-hidden aspect-square shadow-md ${
                  index === 2 ? 'col-span-2' : ''
                }`}
              >
                <img
                  src={pizza.image}
                  alt={pizza.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>
          
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-md">
            <img
              src={pizzaData[3].image}
              alt={pizzaData[3].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h3 className="text-white font-serif text-xl">{pizzaData[3].title}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlavorsSection;