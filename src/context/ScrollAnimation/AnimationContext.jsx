// AnimationContext

import React, { createContext, useState, useContext } from 'react';

const AnimationContext = createContext();

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }) => {
  const [animated, setAnimated] = useState({});

  const setElementAnimated = (elementId) => {
    setAnimated(prev => ({ ...prev, [elementId]: true }));
  };

  return (
    <AnimationContext.Provider value={{ animated, setElementAnimated }}>
      {children}
    </AnimationContext.Provider>
  );
};