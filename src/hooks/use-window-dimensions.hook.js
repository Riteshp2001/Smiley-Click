/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import { throttle } from '../utils';

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: undefined,
    height: undefined,
    clientWidth: undefined,
  });

  React.useEffect(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
      clientWidth: document.documentElement.clientWidth,
    });

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
