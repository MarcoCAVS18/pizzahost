// hooks/usePageLoader.js

import { useEffect } from 'react';

export const usePageLoader = (setIsLoading, delay = 500) => {
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [setIsLoading, delay]);
};