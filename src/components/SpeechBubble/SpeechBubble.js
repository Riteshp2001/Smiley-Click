/**
 * Not-super-generic SpeechBubble.
 * Makes assumptions about where the tip is.
 */
import React from 'react';
import styled from 'styled-components';
import { useSpring, useChain, animated } from 'react-spring';

import { TIGHT_SPRING, LIGHT_COLORS } from '@/constants';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion.hook';

const SpeechBubble = ({
  isVisible,
  width,
  children,
  style = {},
  showDelay = 0,
  tipY = -10,
  animateInnerSpring = true,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const outerSpring = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? 'scaleX(1) translateX(0px)'
        : 'scaleX(0.75) translateX(-20px)',
    },
    delay: isVisible ? showDelay : 0,
    config: TIGHT_SPRING,
    immediate: prefersReducedMotion,
  });

  const innerSpring = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? 'scaleX(1) translateX(0px)'
        : 'scaleX(0.9) translateX(-20px)',
    },
    delay: isVisible ? showDelay + 100 : 0,
    immediate: prefersReducedMotion || animateInnerSpring,

    config: {
      ...TIGHT_SPRING,
      friction: TIGHT_SPRING.friction * 0.9,
    },
  });

  return (
    <Wrapper style={{ ...outerSpring, ...style }}>
      <Front style={{ width, minHeight: 97 + tipY }}>
        <TipWrapper style={{ top: tipY }}>
          <Tip fill="white" />
        </TipWrapper>

        <Contents style={innerSpring}>{children}</Contents>
      </Front>
    </Wrapper>
  );
};

const Tip = ({ fill, width = 65 }) => (
  <svg
    width={width}
    height={78}
    viewBox="0 0 95 95"
    fill="none"
    preserveAspectRatio="none"
  >
    <path
      d="M0 0C0 0 24.8936 38.9937 47 58C57.5966 67.1106 73.8292 77.0249 84.1762 83C90.03 86.3804 94 95 94 95L94.5 36C94.5 36 88.5727 43.1045 81 41.4825C70.8874 39.3165 56.9488 35.8549 47 31.5C26.7586 22.6397 0 0 0 0Z"
      fill={fill}
    />
  </svg>
);

export const Wrapper = styled(animated.div)`
  position: relative;
  transform-origin: center left;
  will-change: transform;
`;

const Front = styled.div`
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 24px 32px;
  z-index: 2;
  color: ${LIGHT_COLORS.text};
  /* prettier-ignore */
  filter:
    drop-shadow(0px 1px 4px hsl(0deg 0% 0% / 0.12))
    drop-shadow(0px 2px 8px hsl(0deg 0% 0% / 0.06))
    drop-shadow(0px 8px 32px hsl(0deg 0% 0% / 0.12));
`;

const TipWrapper = styled.div`
  position: absolute;
  left: 1px;
  transform: translateX(-100%);
  pointer-events: none;
`;

const Contents = styled(animated.div)`
  transform-origin: center left;
`;

export default SpeechBubble;
