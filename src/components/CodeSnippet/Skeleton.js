import React from 'react';
import styled from 'styled-components';

import Spinner from '../Spinner';

const Skeleton = () => {
  return (
    <Wrapper>
      <Spinner size={48} color="var(--color-gray-300)" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  width: 100%;
  max-height: 50vh;
`;

export default Skeleton;
