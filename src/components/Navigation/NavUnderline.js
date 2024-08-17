import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { LIGHT_COLORS, DARK_COLORS } from '@/constants';

import { ConfigContext } from '../ConfigContext';

function NavUnderline({ size }) {
  const { colorMode } = React.useContext(ConfigContext);

  const strokeColor =
    colorMode === 'light'
      ? LIGHT_COLORS.secondary
      : DARK_COLORS.tertiary;

  switch (size) {
    case 'short':
      return <Short strokeColor={strokeColor} />;
    case 'medium':
      return <Medium strokeColor={strokeColor} />;
    case 'long':
      return <Long strokeColor={strokeColor} />;

    default:
      throw new Error('Unrecognized size for navUnderline: ' + size);
  }
}

NavUnderline.propTypes = {
  size: PropTypes.oneOf(['short', 'medium', 'long']),
};

const Long = ({ strokeColor }) => (
  <LongSvg width="83" height="7" viewBox="0 0 83 7" fill="none">
    <path
      d="M1.36658 3.43961C5.25984 2.21819 9.10198 2.35113 13.042 1.74498C16.5973 1.19801 20.2829 1.33594 23.9226 1.33594C27.3725 1.33594 30.9056 1.5463 34.2891 1.5463C35.5441 1.5463 37.2693 2.05276 38.3912 2.55139C39.6341 3.10379 41.4642 3.25919 42.8089 3.4513C44.602 3.70745 46.3029 3.86034 48.1616 3.86034C49.0606 3.86034 49.9761 3.43961 50.9081 3.43961C51.4475 3.43961 52.841 3.17686 53.3273 2.97213C55.1318 2.21235 56.3597 3.3818 57.5346 4.49145C58.2657 5.18187 59.2379 3.46932 60.0123 3.18249C60.9779 2.82484 61.679 2.53519 62.4783 3.33443C62.7994 3.65557 63.8588 5.51258 64.3716 5.22773C65.485 4.60917 66.7235 4.15447 67.7258 3.33443C69.0587 2.24383 71.3278 2.48068 73 2.38777C74.4626 2.30652 75.525 2.05998 77 2.38777C77.7415 2.55256 78.7556 2.38777 79.518 2.38777C80.2804 2.38777 81.1728 1.74498 82 1.74498"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </LongSvg>
);

const Medium = ({ strokeColor }) => (
  <MediumSvg width="58" height="5" viewBox="0 0 58 5" fill="none">
    <path
      d="M1 3.18471C4.34436 3.18471 7.48008 1 10.8705 1C13.2525 1 15.1058 1.72336 17.3165 2.34614C20.3083 3.18891 22.9386 4.09106 26.1351 3.62607C28.8438 3.23203 31.8901 3.01248 34.5396 3.59297C35.6272 3.83127 36.5433 3.92663 37.55 3.29505C38.1957 2.88991 39.4841 3.07684 39.6651 3.87985C39.809 4.51858 43.0217 2.41818 43.6827 2.09236C44.6745 1.60342 45.105 1.98753 46.0216 2.48958C47.7503 3.43649 49.2982 3.62537 51.259 3.19575C51.6076 3.11937 52.011 3.20318 52.3669 3.18471C52.8876 3.1577 53.3662 2.78749 53.8777 2.78749C54.9479 2.78749 55.8858 2.39027 57 2.39027"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MediumSvg>
);

const Short = ({ strokeColor }) => (
  <ShortSvg width="37" height="8" viewBox="0 0 37 8" fill="none">
    <path
      d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </ShortSvg>
);

const Svg = styled.svg`
  position: absolute;
  display: block;
  left: 0;
  right: 0;
  bottom: 6px;
  margin: auto;
`;

const dash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const LongSvg = styled(Svg)`
  & path {
    @media (prefers-reduced-motion: no-preference) {
      stroke-dasharray: 84;
      stroke-dashoffset: 84;
      animation: ${dash} 500ms 250ms
        cubic-bezier(0.27, 0.22, 0.44, 1.03) both;
    }
  }
`;
const MediumSvg = styled(Svg)`
  & path {
    @media (prefers-reduced-motion: no-preference) {
      stroke-dasharray: 60;
      stroke-dashoffset: 60;
      animation: ${dash} 500ms 250ms
        cubic-bezier(0.27, 0.22, 0.44, 1.03) both;
    }
  }
`;
const ShortSvg = styled(Svg)`
  & path {
    @media (prefers-reduced-motion: no-preference) {
      stroke-dasharray: 45;
      stroke-dashoffset: 45;
      animation: ${dash} 500ms 250ms
        cubic-bezier(0.27, 0.22, 0.44, 1.03) both;
    }
  }
`;

export default NavUnderline;
