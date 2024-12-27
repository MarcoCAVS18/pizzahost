import React from "react";
import { FaTools } from "react-icons/fa";

import { AnimationProvider } from "../../context/ScrollAnimation/AnimationContext";
import ScrollAnimation from "../../context/ScrollAnimation/ScrollAnimation";

const Wait = () => {
  return (
    <AnimationProvider>
      <div className="flex flex-col bg-lightBeige items-center justify-center min-h-screen">
        <ScrollAnimation delay={0}>
          <FaTools className="text-8xl text-gray-400 mb-8" />
        </ScrollAnimation>
        <ScrollAnimation delay={200}>
          <div className="text-center items-center">
            <h2 className="text-4xl font-logo italic font-bold text-gray-800 mb-4">
              Under Construction
            </h2>
            <p className="text-xl font-serif text-gray-600">
              You'll be able to enjoy this soon!
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </AnimationProvider>
  );
};

export default Wait;
