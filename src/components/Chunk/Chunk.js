import React from 'react';
import styled from 'styled-components';

const Chunk = ({
  spacing = 48,
  children,
  style = {},
  ...delegated
}) => {
  return (
    <Wrapper
      style={{ marginBottom: spacing, ...style }}
      {...delegated}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Chunk;
