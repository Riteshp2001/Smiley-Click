import React from 'react';
import styled from 'styled-components';

import Spacer from '@/components/Spacer';

function Metric({ Icon, children }) {
  return (
    <Wrapper>
      <Icon size={18} />
      <Spacer size={8} />
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-gray-600);
  font-weight: 500;
  font-size: 15px;
`;

export default Metric;
