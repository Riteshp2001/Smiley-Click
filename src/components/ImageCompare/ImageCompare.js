import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import Button from '@/components/Button';
import ShiftBy from '@/components/ShiftBy';
import Spacer from '@/components/Spacer';

/**
 * Steps:
 * 0: Only Second
 * 1: Only First
 * 2: Both side-by-side (desktop only)
 */

function ImageCompare({
  maxImageWidth,
  firstTitle,
  firstChild,
  secondTitle,
  secondChild,
}) {
  const [step, setStep] = React.useState(0);

  const firstStyles = useSpring({
    position: step === 0 ? 'absolute' : 'relative',
    top: 0,
    left: 0,
    transform:
      step === 2
        ? `scale(0.5) translate(-51.25%, 0)`
        : `scale(1) translate(0%, 0%)`,

    config:
      step === 2
        ? {
            tension: 210,
            friction: 30,
          }
        : {
            tension: 210,
            friction: 28,
          },
  });

  const secondStyles = useSpring({
    position: step === 0 ? 'relative' : 'absolute',
    top: 0,
    left: 0,
    transform:
      step === 2
        ? `scale(0.5) translate(51.25%, 0)`
        : `scale(1) translate(0%, 0%)`,

    config:
      step === 2
        ? {
            tension: 180,
            friction: 32,
          }
        : {
            tension: 240,
            friction: 30,
          },
  });

  return (
    <Wrapper>
      <InnerWrapper
        style={{
          maxWidth: maxImageWidth,
        }}
      >
        <Column
          style={{
            ...firstStyles,
            zIndex: step === 0 ? 0 : 1,
          }}
        >
          <Heading>{firstTitle}</Heading>
          <ImageWrapper>{firstChild}</ImageWrapper>
        </Column>
        <Column
          style={{
            ...secondStyles,
            zIndex: step === 0 ? 1 : 0,
          }}
        >
          <Heading>{secondTitle}</Heading>
          <ImageWrapper>{secondChild}</ImageWrapper>
        </Column>
      </InnerWrapper>
      <ButtonWrapper>
        <Button
          disabled={step === 2}
          onClick={() => {
            const nextStep = step === 0 ? 1 : 0;
            setStep(nextStep);
          }}
          style={{ textAlign: 'center' }}
        >
          Toggle
        </Button>
        <DesktopSpacer size={16} />
        <SecondaryButton
          onClick={() => {
            setStep(step === 2 ? 1 : 2);
          }}
          style={{ textAlign: 'center' }}
        >
          {step === 2 ? 'Collapse' : 'Expand'}
        </SecondaryButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid var(--color-gray-100);
  padding: 32px;
  margin-bottom: 48px;

  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    border-radius: 8px;
    margin-left: -32px;
    margin-right: -32px;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 32px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const SecondaryButton = styled(Button)`
  background-color: var(--color-gray-200);
  color: var(--color-text);
  text-shadow: none;

  &:not(:disabled):hover {
    background-color: var(--color-gray-300);
    filter: none;
  }

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    display: none;
  }
`;

const DesktopSpacer = styled(Spacer)`
  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    display: none;
  }
`;

const Column = styled(animated.div)`
  will-change: transform;
  transform-origin: center center;
`;

const Heading = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  background: var(--color-background);
  width: max-content;
  min-width: 50%;
`;

const ImageWrapper = styled.div`
  box-shadow: 0 1.7px 1.3px rgba(0, 0, 0, 0.011),
    0 4.2px 3.1px rgba(0, 0, 0, 0.016),
    0 7.9px 5.9px rgba(0, 0, 0, 0.02),
    0 14.1px 10.5px rgba(0, 0, 0, 0.024),
    0 26.3px 19.6px rgba(0, 0, 0, 0.029),
    0 63px 47px rgba(0, 0, 0, 0.04);
`;

export default ImageCompare;
