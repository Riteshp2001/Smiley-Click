import React from 'react';

import { BREAKPOINT_SIZES } from '@/constants';
import useWindowDimensions from '@/hooks/use-window-dimensions.hook';

export default function useDesktopState(initialVal) {
  const windowDimensions = useWindowDimensions();

  const [value, setValue] = React.useState(initialVal);

  const setValueOnDesktop = (...args) => {
    if (windowDimensions.width >= BREAKPOINT_SIZES.md) {
      setValue(...args);
    }
  };

  return [value, setValueOnDesktop];
}
