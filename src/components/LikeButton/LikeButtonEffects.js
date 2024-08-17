import React from 'react';
import styled from 'styled-components';

import { MAX_NUM_OF_LIKES } from '@/constants';
import useInterval from '@/hooks/use-interval.hook';
import { generateId, sample, random, range, normalize } from '@/utils';

import defaultSprites from '../ConfettiGeyser/default-sprites';
import Particle from './Particle';

function generateParticles(num, size) {
  const createdAt = Date.now();

  return range(1, num).map(i => {
    const [sprite] = sample(defaultSprites);

    // I want to distribute the particles roughly equally across 360 degrees.
    // If we are generating 4 particles, each should be in its own quadrant.
    // For that, I need to figure out the "ratio" of this sprite;
    // 1/4 is 0.25, 2/4 is 0.5, 3/4 is 0.75, 4/4 is 1.
    const angleMin = (i / num) * 360;
    const angleMax = ((i + 1) / num) * 360;

    const angle = random(angleMin, angleMax);
    const angleInRads = (angle * Math.PI) / 180;

    let distance = random(size * 0.5, size * 1.5);
    if (angle > 45 && angle < 135) {
      distance *= 0.5;
    }

    const rotation = random(0, 180);

    const tension = normalize(distance, size * 0.5, size, 150, 300);
    const friction = normalize(distance, size * 0.5, size, 22, 26);
    const mass = normalize(sprite.width, 12, 50, 0.75, 1.5);

    return {
      id: generateId(8),
      createdAt,
      sprite,
      angle,
      angleInRads,
      distance,
      rotation,
      springConfig: {
        tension,
        friction,
        mass,
      },
    };
  });
}

const LikeButtonEffects = ({ numOfMyLikes, size }) => {
  const [particles, setParticles] = React.useState([]);
  const cachedNumOfMyLikes = React.useRef(numOfMyLikes);

  React.useEffect(() => {
    const diff = numOfMyLikes - cachedNumOfMyLikes.current;

    if (diff > 0 && numOfMyLikes === MAX_NUM_OF_LIKES) {
      const nextParticles = [...particles, ...generateParticles(9, size)];
      setParticles(nextParticles);
    }

    cachedNumOfMyLikes.current = numOfMyLikes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfMyLikes]);

  // Garbage collection
  useInterval(() => {
    const now = Date.now();
    const freshParticles = particles.filter(particle => {
      const delta = now - particle.createdAt;

      return delta < 1500;
    });

    if (freshParticles.length < particles.length) {
      setParticles(freshParticles);
    }
  }, 5000);

  return (
    <Wrapper style={{ width: size, height: size }}>
      {particles.map(particle => (
        <Particle key={particle.id} {...particle} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default LikeButtonEffects;
