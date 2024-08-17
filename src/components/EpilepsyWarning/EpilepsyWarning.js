import React from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import Spacer from '@/components/Spacer';

const EpilepsyWarning = ({ height, children }) => {
  const [reveal, setReveal] = React.useState(false);

  if (!reveal) {
    return (
      <DefaultWrapper style={{ minHeight: height }}>
        <p>
          <strong>Warning:</strong> This GIF includes flickering
          motion that may potentially trigger seizures for people with
          photosensitive epilepsy.
        </p>
        <Spacer size={32} />
        <Button onClick={() => setReveal(true)}>Reveal</Button>
      </DefaultWrapper>
    );
  }

  return children;
};

const DefaultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--color-gray-300);
  padding: 16px;
  margin-bottom: 32px;

  p {
    font-size: 19px;
    max-width: 600px;
    margin: auto;
  }
`;

export default EpilepsyWarning;
