import React from 'react';
import styled from 'styled-components';

import UnstyledButton from '../UnstyledButton';

const Button = ({ type, ...delegated }) => {
  const Component = type === 'subtle' ? SubtleButton : DefaultButton;

  return <Component {...delegated} />;
};

const BaseButton = styled(UnstyledButton)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;

  &:disabled {
    opacity: 0.5;
  }
`;

const SubtleButton = styled(BaseButton)`
  height: 28px;
  padding: 0 16px;
  background: var(--color-gray-100);
  color: var(--color-text);
  transition: background 200ms;

  &:hover {
    background: var(--color-gray-200);
  }
`;

const DefaultButton = styled(UnstyledButton)`
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  font-size: 18px;
  min-height: 50px;
  padding: 0 48px;
  font-weight: var(--font-weight-bold);
  background-color: var(--color-primary);
  border-radius: 5px;
  transition: transform 250ms, filter 250ms;
  will-change: transform;

  &:disabled {
    opacity: 0.5;
  }
  &:not(:disabled):hover {
    filter: hue-rotate(4deg) saturate(120%) brightness(120%);
  }

  &:not(:disabled):active {
    transform: scale(0.95);
    transition: transform 32ms, filter 250ms;
  }
`;

export default Button;
