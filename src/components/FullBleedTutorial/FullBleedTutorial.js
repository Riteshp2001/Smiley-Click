import React from 'react';
import styled from 'styled-components';

import { BREAKPOINT_SIZES } from '@/constants';
import useWindowDimensions from '@/hooks/use-window-dimensions.hook';
import useHasMounted from '@/hooks/use-has-mounted.hook';

import FullBleedOriginal from '../FullBleed';

const FullBleedTutorial = ({ children, style = {}, ...delegated }) => {
  const { width: windowWidth } = useWindowDimensions();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  if (windowWidth <= BREAKPOINT_SIZES.md) {
    return children;
  } else if (windowWidth <= BREAKPOINT_SIZES.lg) {
    return <FullBleedOriginal>{children}</FullBleedOriginal>;
  } else if (windowWidth <= 1200) {
    return (
      <MidWrapper {...delegated} style={style}>
        {children}
      </MidWrapper>
    );
  }

  return (
    <LargeWrapper {...delegated} style={style}>
      {children}
    </LargeWrapper>
  );
};

const MidWrapper = styled.div`
  width: calc(100vw - 16px);
  max-width: 1100px;
  margin: auto;
  transform: translateX(-32px);
`;

const LargeWrapper = styled.div`
  width: 1200px;
  transform: translateX(-82px); /* -(32 + 50) */
`;

export default FullBleedTutorial;
