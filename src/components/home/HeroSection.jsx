// HeroSection.js

import React from "react";
import Button from '../common/Button';
import pizzaImage from '../../assets/images/HaUXj7y2oPuGZlctjXfr0i-4096x4096.webp';
import smallPizzaImage from '../../assets/images/CxBPjGDGcVKJLxDP3jr0Ks-4096x4096.webp';

import { AnimationProvider } from '../../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../../context/ScrollAnimation/ScrollAnimation';

const HeroSection = () => {
  return (
    <AnimationProvider>
      <section className="relative bg-beige min-h-screen flex items-center justify-center px-6 pt-20 lg:pt-24">
        <div className="w-full mx-auto flex flex-col md:flex-row items-center gap-8 z-10">
          <div className="flex-1 md:text-left">
            <ScrollAnimation delay={0}>
              <h1 className="text-7xl md:text-5xl font-bold italic leading-tight text-black font-serif mt-8 md:mt-0">
                Delicious <span className="text-primary italic">Wood-Fired</span>
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <p className="text-gray-600 text-2xl mt-4 md:mt-2 font-oldstyle">
                Discover our mouthwatering selection of freshly made pizzas.
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation delay={400}>
              <div className="mt-6 flex justify-start">
                <Button text="Order Now" className="sm:w-auto" />
              </div>
            </ScrollAnimation>
          </div>

          <div className="relative w-full md:w-[42%] mt-6 md:mt-0 flex justify-center sm:px-4">
            <ScrollAnimation delay={0}>
              <img
                src={pizzaImage}
                alt="Pizza in pan"
                className="w-full md:w-auto max-w-full"
              />
            </ScrollAnimation>

            <div className="absolute bottom-6 left-6 z-20">
              <ScrollAnimation delay={200}>
                <img
                  src={smallPizzaImage}
                  alt="Small Pizza"
                  className="w-[150px] md:w-[150px] sm:w-[100px] max-w-full"
                />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </AnimationProvider>
  );
};

export default HeroSection;