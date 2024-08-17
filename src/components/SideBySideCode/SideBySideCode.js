import React from 'react';
import styled from 'styled-components';

import FullBleed from '@/components/FullBleedTutorial';
import MobileOnly from '@/components/MobileOnly';
import DesktopOnly from '@/components/DesktopOnly';

const SideBySideCode = ({ children }) => {
  return (
    <>
      <MobileOnly>{children}</MobileOnly>
      <DesktopOnly>
        <FullBleed>
          <Wrapper>{children}</Wrapper>
        </FullBleed>
      </DesktopOnly>
    </>
  );
};

export const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 32px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  padding-top: 16px;
  margin: 0 auto;
  margin-top: 64px;
  max-width: 100vw;

  @media (min-width: 1100px) {
    max-width: 1100px;
  }
`;

export default SideBySideCode;
