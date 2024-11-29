import React from "react";
import Button from '../common/Button';
import pizzaImage from '../../assets/images/HaUXj7y2oPuGZlctjXfr0i-4096x4096.webp';
import smallPizzaImage from '../../assets/images/CxBPjGDGcVKJLxDP3jr0Ks-4096x4096.webp';

const HeroSection = () => {
  return (
    <section className="relative bg-beige min-h-screen flex items-center justify-center px-4">
      <div className="w-full mx-auto flex flex-col md:flex-row items-center gap-8 z-10">
        <div className="flex-1 md:text-left">
          <h1 className="text-7xl md:text-5xl font-bold italic leading-tight text-black font-serif">
            Delicious <span className="text-primary italic">Wood-Fired</span>
          </h1>
          <p className="text-gray-600 text-2xl mt-4 font-oldstyle">
            Discover our mouthwatering selection of freshly made pizzas.
          </p>
          <div className="mt-6 flex justify-start">
            <Button text="Order Now" className="sm:w-auto" />
          </div>
        </div>

        <div className="relative w-full md:w-[42%] mt-6 md:mt-0 flex justify-center sm:px-4">
          <img
            src={pizzaImage}
            alt="Pizza in pan"
            className="w-full md:w-auto max-w-full"
          />

          <div className="absolute bottom-6 left-6 z-20">
            <img
              src={smallPizzaImage}
              alt="Small Pizza"
              className="w-[150px] md:w-[150px] sm:w-[100px] max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
