import React from 'react';
import styled from 'styled-components';

import useSound from '@/hooks/use-sound.hook';
import useDesktopState from '@/hooks/use-desktop-state';

const ARROW_DELAY = 125;

const PoppingArrows = ({
  shouldShowFirstArrow,
  increaseTargetBy = 0,
  children,
}) => {
  const [isHovering, setIsHovering] = useDesktopState(false);

  const [playRising, { stop }] = useSound('/sounds/rising-pops.mp3', {
    volume: 0.25,
  });

  return (
    <Wrapper
      onMouseEnter={() => {
        setIsHovering(true);
        playRising();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}
    >
      <TargetBump
        style={{
          top: -increaseTargetBy,
          left: -increaseTargetBy,
          right: -increaseTargetBy,
          bottom: -increaseTargetBy,
        }}
      />
      {children}
      <ArrowWrapper>
        <ArrowSvg
          width="36"
          height="12"
          viewBox="0 0 36 12"
          fill="none"
        >
          <path
            d="M0.75 6H11.25 M6 0.75L11.25 6L6 11.25"
            stroke="var(--color-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: shouldShowFirstArrow ? 1 : 0,
              transition: `opacity ${isHovering ? 0 : ARROW_DELAY}ms`,
            }}
          />

          <path
            d="M15 10L19.5 5.5L15 1"
            stroke="var(--color-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: isHovering ? 1 : 0,
              transition: `opacity ${isHovering ? 0 : ARROW_DELAY}ms`,
            }}
          />
          <path
            d="M23 10L27.5 5.5L23 1"
            stroke="var(--color-primary)"
            strokeOpacity="0.66"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: isHovering ? 1 : 0,
              transition: `opacity ${
                isHovering ? 0 : ARROW_DELAY
              }ms ${ARROW_DELAY}ms`,
            }}
          />
          <path
            d="M31 10L35.5 5.5L31 1"
            stroke="var(--color-primary)"
            strokeOpacity="0.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: isHovering ? 1 : 0,
              transition: `opacity ${
                isHovering ? 0 : ARROW_DELAY
              }ms ${ARROW_DELAY * 2}ms`,
            }}
          />
        </ArrowSvg>
      </ArrowWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: var(--font-weight-bold);
`;

const ArrowWrapper = styled.div`
  position: relative;
  margin-left: 8px;
`;

const ArrowSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-6px);
  max-width: unset;
`;

const TargetBump = styled.div`
  position: absolute;
  z-index: 0;
`;

export default PoppingArrows;
