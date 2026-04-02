// components/features/about/OurMission.jsx

import React from 'react';
import { AnimationProvider } from '../../../context/ScrollAnimation/AnimationContext';
import ScrollAnimation from '../../../context/ScrollAnimation/ScrollAnimation';
import MissionIconsContainer from './MissionIconsContainer';

const OurMission = () => {
  return (
    <AnimationProvider>
      <section className="bg-beige py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Sección de Texto */}
          <div className="w-full md:w-1/2 text-right order-1 md:order-2">
            <ScrollAnimation delay={300}>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold italic mb-6">
                Our Unwavering Mission
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={600}>
              <p className="text-gray-600 font-oldstyle text-lg md:text-xl mb-4">
                At the core of our pizzeria lies an unwavering mission to push
                the boundaries of authentic Italian cuisine and deliver an
                exceptional dining experience to our community. We are dedicated
                to sourcing the finest, locally-grown ingredients and preparing
                each dish with the utmost care and attention to detail.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={900}>
              <p className="text-gray-600 font-oldstyle text-lg md:text-xl">
                Our goal is to transport our customers on a culinary journey,
                allowing them to immerse themselves in the rich cultural
                heritage and time-honored traditions that have been passed down
                through generations of Italian families. Every bite, every sip,
                and every moment spent in our restaurant is designed to evoke
                the essence of Italy and inspire a deep appreciation for the art
                of Italian dining.
              </p>
            </ScrollAnimation>
          </div>

          {/* Sección de Iconos */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start order-2 md:order-1">
            <MissionIconsContainer />
          </div>
        </div>
      </section>
    </AnimationProvider>
  );
};

export default OurMission;