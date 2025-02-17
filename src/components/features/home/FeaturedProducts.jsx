// src/features/home/FeaturedProducts.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AnimationProvider } from '../../../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../../../context/ScrollAnimation/ScrollAnimation';
import { FEATURED_PRODUCTS } from '../../../components/constants/ProductData';

const FeaturedCard = ({ product, delay }) => {
  return (
    <ScrollAnimation delay={delay}>
      <Link 
        to={product.id === 'custom-pizza' ? '/menu#custom-pizza' : '#'} 
        className="block relative rounded-3xl overflow-hidden aspect-square shadow-md group cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h3 className="text-white font-serif text-xl md:text-2xl drop-shadow-lg">
            {product.title}
          </h3>
        </div>
      </Link>
    </ScrollAnimation>
  );
};

const FeaturedProducts = () => {
  return (
    <AnimationProvider>
      <section className="bg-beige py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            <ScrollAnimation delay={0}>
              <p className="text-gray-600 font-oldstyle mb-3">
                Indulge in our Specialty Pizzas
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl">
                Flavors You'll Love
              </h2>
            </ScrollAnimation>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product, index) => (
              <FeaturedCard 
                key={product.id}
                product={product}
                delay={300 + (index * 100)}
              />
            ))}
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {FEATURED_PRODUCTS.slice(0, 3).map((product, index) => (
                <FeaturedCard 
                  key={product.id}
                  product={product}
                  delay={300 + (index * 100)}
                />
              ))}
            </div>
            
            <ScrollAnimation delay={600}>
              <Link 
                to="/menu#custom-pizza"
                className="block relative rounded-3xl overflow-hidden aspect-[21/9] shadow-md group cursor-pointer"
              >
                <img
                  src={FEATURED_PRODUCTS[3].image}
                  alt={FEATURED_PRODUCTS[3].alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-white font-serif text-2xl drop-shadow-lg">
                    {FEATURED_PRODUCTS[3].title}
                  </h3>
                </div>
              </Link>
            </ScrollAnimation>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {FEATURED_PRODUCTS.map((product, index) => (
              <FeaturedCard 
                key={product.id}
                product={product}
                delay={300 + (index * 100)}
              />
            ))}
          </div>
        </div>
      </section>
    </AnimationProvider>
  );
};

export default FeaturedProducts;