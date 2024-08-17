import React from 'react';
import styled, { keyframes } from 'styled-components';

const flash = keyframes`
  0% {
    color: inherit;
  }
  15% {
    color: hsl(150deg 100% 40%);
  }
  30% {
    color: inherit;
  }
`;

const GreenTextFlash = styled.span`
  display: inline-block;
  font-weight: var(--font-weight-medium);
  animation: ${flash} 3000ms ease-in-out infinite;
`;

export default GreenTextFlash;
