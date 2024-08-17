import React from 'react';
import styled, { keyframes } from 'styled-components';

const WobblyFloat = ({ children, disabled }) => {
  if (disabled) {
    return children;
  }

  return (
    <Outer>
      <Inner>{children}</Inner>
    </Outer>
  );
};

const float = keyframes`
  from {
    transform: translateY(6px);
  }
  to {
    transform: translateY(-6px);
  }
`;
const wobble = keyframes`
  from {
    transform: rotate(-2deg);
  }
  to {
    transform: rotate(2deg);
  }
`;

const Outer = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${float} 4000ms alternate infinite ease-in-out;
  }
`;

const Inner = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${wobble} 7000ms alternate infinite ease-in-out;
    transform-origin: center bottom;
  }
`;

export default WobblyFloat;
