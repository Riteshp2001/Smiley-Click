import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from 'react-spring';

const Particle = ({
  angleInRads,
  distance,
  sprite,
  rotation,
  springConfig,
}) => {
  const fromX = Math.cos(angleInRads) * (distance * 0.75);
  const fromY = Math.sin(angleInRads) * (distance * 0.75);
  const toX = Math.cos(angleInRads) * distance;
  const toY = Math.sin(angleInRads) * distance;

  const style = useSpring({
    from: {
      transform: `translate(${fromX}px, ${fromY}px) rotate(0deg)`,
    },
    to: {
      transform: `translate(${toX}px, ${toY}px) rotate(${rotation}deg)`,
    },
    config: springConfig,
  });
  return (
    <Image
      src={sprite.src}
      style={{ width: sprite.width / 2, height: sprite.height / 2, ...style }}
    />
  );
};

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Image = styled(animated.img)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transform-origin: center center;
  animation: ${fadeOut} 750ms 200ms both;
`;

export default React.memo(Particle);
