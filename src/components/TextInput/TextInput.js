import React from 'react';
import styled from 'styled-components';

const TextInput = ({ id, label, disabled, ...delegated }) => {
  const generatedId = React.useId();
  const actualId = id ?? generatedId;

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Wrapper>
      <Label
        htmlFor={actualId}
        style={{
          color: isFocused
            ? 'var(--color-primary)'
            : 'var(--color-text)',
          opacity: 1,
        }}
      >
        {label}
      </Label>
      <br />
      <Input
        {...delegated}
        id={actualId}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Border
        style={
          isFocused
            ? {
                opacity: 1,
                transform: 'translateY(6px)',
                background: 'var(--color-primary)',
              }
            : disabled
            ? {
                opacity: 0.4,
              }
            : {}
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Label = styled.label`
  font-size: var(--font-size, 1rem);
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
`;

const Input = styled.input`
  background: transparent;
  border: none;
  font-size: 1rem;
  padding: 8px 0px 12px;
  color: var(--color-text);
  outline: none;
  width: 100%;

  &:disabled {
    opacity: 0.5;
  }

  &::placeholder {
    color: var(--color-gray-300);
  }
`;

const Border = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  height: 3px;
  border-radius: 2px;
  background: var(--color-text);
  opacity: 0.6;

  @media (prefers-reduced-motion: no-preference) {
    transition: all 200ms ease-out;
  }
`;

export default TextInput;
