import React from 'react';
import styled from 'styled-components';

const FullBleedTutorialV2 = ({ children, ...delegated }) => {
  return <Wrapper {...delegated}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  @media (min-width: 1084px) {
    width: calc(100% + 414px - 40px);
    margin-left: -32px;
    background-color: var(--color-blurred-background);
    backdrop-filter: blur(12px);
    box-shadow: 0px 0px 35px 35px var(--color-background);
  }

  @media (min-width: 1120px) {
    width: calc(100% + 414px);
  }
`;

export default FullBleedTutorialV2;
