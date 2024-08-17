import React from 'react';
import styled from 'styled-components';

import SquigglyLine from '../SquigglyLine';

const Divider = ({ width = 100, height = 50, ...delegated }) => (
  <Wrapper width={width} {...delegated}>
    <SquigglyLine
      width={width}
      height={height}
      squiggleWidth={10}
      stroke="var(--color-secondary)"
      strokeWidth={2}
    />
  </Wrapper>
);

export default Divider;

const Wrapper = styled.div`
  margin: 72px auto;
  max-width: ${(props) => props.width}px;
`;
