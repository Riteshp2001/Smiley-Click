import React from 'react';
import styled from 'styled-components';

const FullBleed = ({ children, ...delegated }) => {
  return <Wrapper {...delegated}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  margin-left: -50vw;
`;

export default FullBleed;
