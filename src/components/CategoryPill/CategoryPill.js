import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { TIGHT_SPRING } from '@/constants';
import useSound from '@/hooks/use-sound.hook';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion.hook';

import Link from '../Link';
import UnstyledButton from '../UnstyledButton';

const CategoryPill = ({ href, onClick, children }) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const backgroundSpring = useSpring({
    opacity: isHovering ? 0.5 : 0.33,
    transform: isHovering ? `scale(1.06)` : `scale(0.99)`,
    config: TIGHT_SPRING,
    immediate: prefersReducedMotion,
  });

  const [playHoverSound, { stop }] = useSound('/sounds/plunger-immediate.mp3', {
    volume: 0.15,
  });

  const as = href ? Link : UnstyledButton;

  return (
    <LinkWrapper
      as={as}
      href={href}
      onMouseEnter={() => {
        setIsHovering(true);
        playHoverSound();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}
      onClick={onClick}
    >
      <Background style={backgroundSpring} />
      {children}
    </LinkWrapper>
  );
};

const LinkWrapper = styled(Link)`
  position: relative;
  display: inline-block;
  text-decoration: none;
  font-size: 13px;
  color: var(--color-gray-1000);
  padding: 3px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-weight: var(--font-weight-medium);

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    padding: 6px 18px;
    font-size: 15px;
  }
`;

const Background = styled(animated.div)`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  background-color: var(--color-decorative);
  transform-origin: center center;
`;

export default CategoryPill;
