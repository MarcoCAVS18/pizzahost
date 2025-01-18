// components/pages/Home.jsx

import React from 'react';
import HeroSection from '../components/features/home/HeroSection'; 
import FeaturedProducts from '../components/features/home/FeaturedProducts'; 
import PizzasSection from '../components/features/home/PizzasSection';
import PastaSection from '../components/features/home/PastaSection';
import OtherExperience from '../components/features/home/other experience/OtherExperience';
import { usePageLoader } from '../hoks/usePageLoader';

const Home = ({ setIsLoading }) => {
  usePageLoader(setIsLoading);

  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <PizzasSection />
      <PastaSection />
      <OtherExperience />
    </div>
  );
};

export default Home;

