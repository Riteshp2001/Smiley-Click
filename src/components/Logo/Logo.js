import React from 'react';
import styled, { keyframes } from 'styled-components';

import Link from '../Link';

const Logo = ({ animated, ...delegated }) => {
  return (
    <Wrapper href="/" {...delegated}>
      <First $animated={animated}>Josh</First>
      <MissingLetter>
        <W
          $animated={animated}
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
        >
          <Path
            d="M1.83685 4.19021C2.50472 5.35898 3.23081 6.5572 3.80331 7.77375C4.05248 8.30325 4.35843 9.36185 4.81149 9.75018C5.73454 10.5414 6.29678 10.273 6.76796 9.06143C7.13194 8.12547 7.20283 7.08915 7.54655 6.12672C7.91111 5.10596 9.23909 6.70274 9.78252 7.06503C10.3171 7.42139 13.574 9.528 12.8869 7.60406C12.6687 6.99301 12.6107 6.33922 12.4777 5.70748C12.3451 5.07774 12.1099 4.28137 12.0784 3.65119C12.0399 2.88207 11.719 2.12838 11.719 1.3154"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </W>

        <Under
          $animated={animated}
          width="9"
          height="10"
          viewBox="0 0 9 10"
          fill="none"
        >
          <Path
            d="M1 9C2.23995 7.12464 3.87268 5.18927 4.17593 2.59926C4.22017 2.22137 4.11111 0.731563 4.11111 1.04233C4.11111 1.49132 4.41831 2.03152 4.55761 2.40705C4.98522 3.55977 5.31447 4.69324 5.92593 5.70352C6.43274 6.54092 7.08081 7.96204 8 7.96204"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Under>
        <Invisible>W</Invisible>
      </MissingLetter>
      <Second $animated={animated}>Comeau</Second>
    </Wrapper>
  );
};

const INITIAL_DELAY = 750;
const SCOOCH_DURATION = 300;
const UNDER_DRAW_DURATION = 150;
const W_DRAW_DURATION = 600;

const UNDER_PATH_LENGTH = 18;
const W_PATH_LENGTH = 26;

const scoochLeft = keyframes`
  from {
    transform: translateX(6px)
  }
  to {
    transform: translateX(0);
  }
`;
const scoochRight = keyframes`
  from {
    transform: translateX(-6px)
  }
  to {
    transform: translateX(0);
  }
`;

const dash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const Wrapper = styled(Link)`
  display: flex;
  font-size: 24px;
  letter-spacing: -1px;
  padding: 0;
  text-decoration: none;
  color: var(--color-primary);
`;

const First = styled.span`
  display: inline-block;
  font-weight: var(--font-weight-medium);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${(p) => p.$animated && scoochLeft}
      ${SCOOCH_DURATION}ms ${INITIAL_DELAY}ms
      cubic-bezier(0.27, 0.22, 0.44, 1.03) both;
  }
`;

const Second = styled.span`
  display: inline-block;
  font-weight: var(--font-weight-medium);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${(p) => p.$animated && scoochRight}
      ${SCOOCH_DURATION}ms ${INITIAL_DELAY + SCOOCH_DURATION * 0.25}ms
      cubic-bezier(0.27, 0.22, 0.44, 1.03) both;
  }
`;

const Under = styled.svg`
  position: absolute;
  left: 6px;
  bottom: 2px;

  & path {
    @media (prefers-reduced-motion: no-preference) {
      stroke-dasharray: ${UNDER_PATH_LENGTH};
      stroke-dashoffset: ${(p) =>
        p.$animated ? UNDER_PATH_LENGTH : 0};
      animation: ${(p) => p.$animated && dash}
        ${UNDER_DRAW_DURATION}ms ${INITIAL_DELAY + SCOOCH_DURATION}ms
        both;
    }
  }
`;

const W = styled.svg`
  position: absolute;
  left: 2px;
  top: 1px;

  & path {
    @media (prefers-reduced-motion: no-preference) {
      stroke-dasharray: ${W_PATH_LENGTH};
      stroke-dashoffset: ${(p) => (p.$animated ? W_PATH_LENGTH : 0)};
      animation: ${(p) => p.$animated && dash} ${W_DRAW_DURATION}ms
        ${INITIAL_DELAY + SCOOCH_DURATION + UNDER_DRAW_DURATION}ms
        both cubic-bezier(0.27, 0.22, 0.44, 1.03);
    }
  }
`;

const Path = styled.path`
  stroke: var(--color-gray-700);
`;

const MissingLetter = styled.span`
  display: inline-block;
  position: relative;
  width: 18px;
`;

const Invisible = styled.span`
  opacity: 0;
`;

export default Logo;
