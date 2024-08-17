import React from 'react';

import { throttle } from '@/utils';

const useOnScroll = (callback, throttleBy = 500) => {
  // prettier-ignore
  const handleScroll = React.useCallback(
    throttle(callback, throttleBy),
    [callback, throttleBy]
  );

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return null;
};

export default useOnScroll;
