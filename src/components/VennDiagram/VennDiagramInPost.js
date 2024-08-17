import React from 'react';
import styled from 'styled-components';

import VennDiagram from './VennDiagram';

const VennDiagramInPost = delegated => {
  return (
    <Wrapper>
      <VennDiagram {...delegated} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 48px;
  font-size: 22px;

  @media (max-width: 700px) {
    font-size: 20px;
    width: 100%;
  }
  @media (max-width: 500px) {
    width: calc(100% + 64px);
    margin-left: -32px;
    margin-right: -32px;
    font-size: 18px;
  }
`;

export default VennDiagramInPost;
