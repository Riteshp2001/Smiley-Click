import React from 'react';
import styled from 'styled-components';

import useRainbow from './use-rainbow.hook';
import UnstyledButton from '@/components/UnstyledButton';

const RainbowButton = ({
  children,
  intervalDelay = 1300,
  style = {},
  id,
  ...delegated
}) => {
  const transitionDelay = intervalDelay * 1.25;

  const colors = useRainbow({ id, intervalDelay });

  const colorKeys = Object.keys(colors);

  return (
    <ButtonElem
      {...delegated}
      style={{
        ...style,
        ...colors,
        transition: `
          ${colorKeys[0]} ${transitionDelay}ms linear,
          ${colorKeys[1]} ${transitionDelay}ms linear,
          ${colorKeys[2]} ${transitionDelay}ms linear
        `,
        background: `
          radial-gradient(
            circle at top left,
            var(${colorKeys[2]}),
            var(${colorKeys[1]}),
            var(${colorKeys[0]})
          )
        `,
      }}
    >
      {/* HACK: This is being styled inside `PoofyRainbowButton`. */}
      <span>{children}</span>
    </ButtonElem>
  );
};

const ButtonElem = styled(UnstyledButton)`
  position: relative;
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  font-size: 18px;
  height: 60px;
  font-weight: var(--font-weight-medium);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* set a dark default background color, for unsupported browsers */
  background: black;
  backface-visibility: hidden;

  &:disabled {
    opacity: 0.5;
  }
`;

export default RainbowButton;
