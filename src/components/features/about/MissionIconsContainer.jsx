// components/features/about/MissionIconsContainer.jsx

import React from 'react';
import ScrollAnimation from '../../../context/ScrollAnimation/ScrollAnimation';
import { Code, Compass, Flame, Trophy } from 'lucide-react';

const MissionIconsContainer = () => {
  const icons = [
    { 
      icon: <Code size={24} />, 
      delay: 0, 
      title: 'Innovation', 
      description: 'We embrace cutting-edge technology to deliver the best results.' 
    },
    { 
      icon: <Compass size={24} />, 
      delay: 300, 
      title: 'Direction', 
      description: 'Clear vision and focused strategy guide our every step.' 
    },
    { 
      icon: <Flame size={24} />, 
      delay: 600, 
      title: 'Passion', 
      description: 'Passion drives us to create extraordinary experiences.' 
    },
    { 
      icon: <Trophy size={24} />, 
      delay: 900, 
      title: 'Excellence', 
      description: 'We strive for perfection in everything we do.' 
    },
  ];

  return (
    <div className="flex flex-col gap-12 relative">
      {icons.map((item, index) => (
        <div key={index} className="flex items-center gap-6 relative">
          {/* Ícono */}
          <ScrollAnimation delay={item.delay}>
            <div className="w-16 h-16 rounded-full bg-darkRed flex items-center justify-center text-white relative z-10">
              {item.icon}
            </div>
          </ScrollAnimation>

          {/* Línea Vertical */}
          {index < icons.length - 1 && (
            <div className="h-24 w-0.5 bg-gray-300 absolute left-8 top-16 z-0"></div>
          )}

          {/* Texto al lado del ícono */}
          <ScrollAnimation delay={item.delay + 200}>
            <div>
              <h4 className="text-lg font-semibold text-darkRed font-logo mb-1">{item.title}</h4>
              <p className="text-gray-600 text-sm md:text-base font-serif max-w-md">
                {item.description}
              </p>
            </div>
          </ScrollAnimation>
        </div>
      ))}
    </div>
  );
};

export default MissionIconsContainer;
