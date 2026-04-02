// components/pages/About.jsx

import React from 'react';
import HeroSection from '../components/features/about/HeroSection';
import OurStory from '../components/features/about/OurStory';
import OurMission from '../components/features/about/OurMission';
import { usePageLoader } from '../hooks/usePageLoader';

const About = ({ setIsLoading }) => {
    usePageLoader(setIsLoading);

    return (
      <div>
        <HeroSection />
        <OurStory />
        <OurMission />
      </div>
    );
  };

export default About;