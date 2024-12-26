// ScrollAnimation.js

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from './AnimationContext';

const ScrollAnimation = ({ 
  children, 
  animationClass, 
  threshold = 0.1, 
  triggerOnce = true,
  delay = 0 
}) => {
  const { animated, setElementAnimated } = useAnimation();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  const elementId = React.useId();

  React.useEffect(() => {
    if (inView && !animated[elementId]) {
      setElementAnimated(elementId);
    }
  }, [inView, elementId, animated, setElementAnimated]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out opacity-0 translate-y-8
        ${animated[elementId] ? `${animationClass} opacity-100 translate-y-0` : ''}`}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;