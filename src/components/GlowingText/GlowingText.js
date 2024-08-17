import React from 'react';
import styled from 'styled-components';

import useRainbow from '../../hooks/use-rainbow.hook';

const rainbowColors = [
  'hsl(333deg, 100%, 52%)', // pink
  'hsl(333deg, 100%, 52%)', // pink
  'hsl(230deg, 92%, 63%)', // blue
  'hsl(230deg, 92%, 63%)', // blue
  'hsl(333deg, 100%, 52%)', // pink
  'hsl(333deg, 100%, 52%)', // pink
  'hsl(200deg, 50%, 60%)', // orange
  'hsl(200deg, 50%, 60%)', // orange
];

const GlowingText = ({ children, size, style = {} }) => {
  const intervalDelay = 1200;
  const transitionDelay = intervalDelay * 1.25;

  const colors = useRainbow({ rainbowColors, intervalDelay });
  const colorKeys = Object.keys(colors);

  const allStyles = {
    ...style,
    ...colors,
    transition: `
      ${colorKeys[0]} ${transitionDelay}ms linear,
      ${colorKeys[1]} ${transitionDelay}ms linear,
      ${colorKeys[2]} ${transitionDelay}ms linear
    `,
    background: `
      linear-gradient(
        var(${colorKeys[2]}),
        var(${colorKeys[1]}),
        var(${colorKeys[0]})
      )
    `,
  };

  if (size === 'smol') {
    return (
      <SmolWrapper style={allStyles} as="sup">
        {children}
      </SmolWrapper>
    );
  }

  return <Wrapper style={allStyles}>{children}</Wrapper>;
};

const Wrapper = styled.span`
  display: inline-block;
  font-weight: var(--font-weight-bold);
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
  cursor: default;
`;

const SmolWrapper = styled(Wrapper)`
  font-size: 0.5em;
  letter-spacing: -0.5px;
  transform: translateY(-0.5em);
`;

export default GlowingText;
