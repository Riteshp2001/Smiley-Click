import React from 'react';
import styled from 'styled-components';

const Tip = ({ width = 32, height = 12, ...delegated }) => {
  const tipPointinessFactor = width * 0.2;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      {...delegated}
    >
      <path
        d={`
        M 0 ${height}
        C ${width * 0.25} ${height}
          ${width / 2 - tipPointinessFactor} 0
          ${width / 2} 0
        C ${width / 2 + tipPointinessFactor} 0
          ${width * 0.75} ${height}
          ${width} ${height}
        Z
        `}
      />
    </Svg>
  );
};

const Svg = styled.svg`
  display: block;
  overflow: visible;

  path {
    fill: #fff;
    stroke: none;
  }
`;

export default Tip;
