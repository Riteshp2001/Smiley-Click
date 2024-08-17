import React from 'react';
import styled from 'styled-components';

import RainbowButton from './RainbowButton';

const PoofyRainbowButton = (props) => {
  return (
    <Wrapper>
      <RainbowButton {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 2px;
    left: 6px;
    right: 6px;
    height: 20%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    );
    border-radius: 20px;
    border-top-left-radius: 20px 14px;
    border-bottom-left-radius: 100px 30px;
    border-top-right-radius: 20px 14px;
    border-bottom-right-radius: 100px 30px;
    pointer-events: none;
  }
  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    bottom: 0px;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.17)
    );
    border-radius: 0px 0px 4px 4px;
    pointer-events: none;
  }

  &:active:before {
    top: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(
      rgba(0, 0, 0, 0.17),
      rgba(0, 0, 0, 0)
    );
    border-radius: 4px 4px 0px 0px;
  }

  &:active:after {
    height: 20%;
    background: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.3)
    );
    border-radius: 20px;
    border-bottom-left-radius: 20px 14px;
    border-top-left-radius: 100px 30px;
    border-bottom-right-radius: 20px 14px;
    border-top-right-radius: 100px 30px;
  }

  &:active span {
    transform: scale(0.9);
  }
`;

export default PoofyRainbowButton;
