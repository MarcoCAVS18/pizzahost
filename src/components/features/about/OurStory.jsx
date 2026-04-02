// components/features/about/OurStory.jsx

import React from 'react';
import { AnimationProvider } from '../../../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../../../context/ScrollAnimation/ScrollAnimation';
import tiendaStory from '../../../assets/images/tienda/tienda1.jpg';

const OurStory = () => {
  return (
    <AnimationProvider>
      <section className="bg-beige py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <ScrollAnimation delay={300}>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold italic mb-6">
                  The Story Behind Our Passion
                </h2>
              </ScrollAnimation>
              <ScrollAnimation delay={600}>
                <p className="text-gray-600 font-oldstyle text-lg md:text-xl mb-6">
                  Our pizzeria was founded by a family of Italian immigrants who brought their rich culinary heritage to this city. With years of experience and a deep love for authentic Italian cuisine, we've dedicated ourselves to sharing the flavors of Italy with our community.
                </p>
              </ScrollAnimation>
              <ScrollAnimation delay={900}>
                <p className="text-gray-600 font-oldstyle text-lg md:text-xl">
                  From our hand-tossed pizzas to our homemade pastas, every dish is crafted with the uand attention to detail. We take pride in using only the freshest, locally sourced ingredients meals that transport our customers to the heart of Italy.
                </p>
              </ScrollAnimation>
            </div>
            <div className="order-1 md:order-2">
              <ScrollAnimation delay={0}>
                <img
                  src={tiendaStory}
                  alt="Italian Pizzeria Owners"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </AnimationProvider>
  );
};

export default OurStory;