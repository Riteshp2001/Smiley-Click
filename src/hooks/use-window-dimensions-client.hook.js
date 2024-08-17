/* eslint-disable react-hooks/rules-of-hooks */
/**
 * This version of the hook initializes the state with
 * the correct values. THIS IS NOT SSR-SAFE. Use this
 * version only in components rendered within <ClientOnly>
 */
import React from 'react';

import { throttle } from '../utils';

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
    clientWidth: document.documentElement.clientWidth,
  });

  React.useEffect(() => {
    const handleResize = throttle(() => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        clientWidth: document.documentElement.clientWidth,
      });
    }, 250);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
