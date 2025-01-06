// components/features/about/HeroSection.jsx

import React from 'react';
import { AnimationProvider } from '../../../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../../../context/ScrollAnimation/ScrollAnimation';
import tiendaHero from '../../../assets/images/tienda/tienda2.png'


const HeroSection = () => {
  return (
    <AnimationProvider>
      <section className="bg-beige py-20 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="w-full md:w-1/2 mx-auto overflow-hidden rounded-3xl">
            <ScrollAnimation delay={0}>
              <img
                src={tiendaHero}
                alt="Upscale Italian Pizzeria Kitchen"
                className="w-full h-full object-cover"
              />
            </ScrollAnimation>
          </div>
          <div className="mt-12 md:mt-0">
            <ScrollAnimation delay={300}>
              <h1 className="text-4xl md:text-5xl font-serif font-semibold italic mb-6 text-center">
                Discover Our Passion for Authentic Italian Cuisine
              </h1>
            </ScrollAnimation>
            <ScrollAnimation delay={600}>
              <p className="text-gray-600 font-oldstyle text-lg md:text-xl text-center">
                At our pizzeria, we are dedicated to crafting the finest Italian dishes using only the freshest, high-quality ingredients. Join us on a culinary journey and experience the true flavors of Italy.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </AnimationProvider>
  );
};

export default HeroSection;