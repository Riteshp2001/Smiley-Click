import React from 'react';

import { throttle } from '@/utils';

const useScrollPosition = (throttleBy = 500) => {
  const [scrollPosition, setScrollPosition] = React.useState({
    x: null,
    y: null,
  });

  const handleScroll = React.useCallback(
    throttle(ev => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
    }, throttleBy),
    [setScrollPosition, throttleBy]
  );

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return [scrollPosition.x, scrollPosition.y];
};

export default useScrollPosition;
