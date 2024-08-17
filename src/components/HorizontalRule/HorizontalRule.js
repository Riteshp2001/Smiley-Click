import React from 'react';
import styled from 'styled-components';

import { range, normalize } from '@/utils';

import VisuallyHidden from '@/components/VisuallyHidden';

const DISTANCE = 20;
const NUM_OF_SEGMENTS = 5;

const HorizontalRule = ({ maxWidth = 100 }) => {
  return (
    <>
      <VisuallyHidden>
        <SemanticRule />
      </VisuallyHidden>
      <Svg
        preserveAspectRatio="none"
        fill="none"
        style={{ width: '100%', maxWidth }}
      >
        {range(NUM_OF_SEGMENTS).map((i) => {
          const x1 = normalize(i, 0, NUM_OF_SEGMENTS, 0, maxWidth);
          const y1 = 0;
          const x2 = normalize(
            i,
            0,
            NUM_OF_SEGMENTS,
            DISTANCE,
            maxWidth + DISTANCE
          );
          const y2 = 10;

          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </Svg>
    </>
  );
};

const Svg = styled.svg`
  display: block;
  overflow: visible;
  margin: 64px auto 64px;
  height: 10px;

  line {
    stroke: var(--color-gray-300);
    stroke-width: 2px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }
`;

const SemanticRule = styled.hr`
  height: 0px;
  margin: 0;
  opacity: 0;
`;

export default HorizontalRule;
