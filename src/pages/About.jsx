// components/pages/About.jsx

import React from 'react';
import HeroSection from '../components/features/about/HeroSection';
import OurStory from '../components/features/about/OurStory';
import OurMission from '../components/features/about/OurMission';

const About = () => {
    return (
        <div>
            <HeroSection />
            <OurStory />
            <OurMission />
        </div>
    );
};

export default About;