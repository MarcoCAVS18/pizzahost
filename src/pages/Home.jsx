import React from 'react';
import HeroSection from '../components/home/HeroSection'; 
import FeaturedProducts from '../components/home/FeaturedProducts'; 
import PizzasSection from '../components/home/PizzasSection';
import PastaSection from '../components/home/PastaSection';

const Home = () => {
  return (
    <div>
      <HeroSection /> 
      <FeaturedProducts />
      <PizzasSection /> 
      <PastaSection /> 

    </div>
  );
};

export default Home;

