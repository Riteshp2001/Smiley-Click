import React from 'react';
import styled from 'styled-components';

function FloatedGluestick({ children }) {
  return (
    <Wrapper>
      <Gluestick
        alt="Cute illustration of a personified gluestick, tipping its hat"
        src="/images/styled-components/gluestick.png"
      />
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  display: flow-root;
  margin-bottom: 16px;
`;

const Gluestick = styled.img`
  display: block;
  height: 250px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    margin: 0 auto 32px;
  }

  @media ${(p) => p.theme.breakpoints.smAndLarger} {
    float: left;
    margin-right: 16px;
  }

  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    transform: translateX(-50%);
  }
`;

export default FloatedGluestick;
