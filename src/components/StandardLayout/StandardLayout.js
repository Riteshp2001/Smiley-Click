import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import {
  SUPERHEADER_HEIGHT,
  COLOR_SWAP_TRANSITION_DURATION,
} from '@/constants';
import useSaleSuperheader from '@/hooks/use-sale-superheader';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Header from '../Header';
import Footer from '../Footer';
import Spacer from '../Spacer';
import { SkipNavTrigger, SkipNavTarget } from '../SkipNav';
import SaleSuperheader from '@/components/SaleSuperheader';

const Background = createGlobalStyle`
  body {
    background: ${(p) => p.background};
  }
`;

const StandardLayout = ({
  children,
  includeHeader = true,
  background = 'var(--color-background)',
}) => {
  const [
    superheaderStatus,
    handleDismissSuperheader,
  ] = useSaleSuperheader();

  const showSuperheader = superheaderStatus !== 'dismissed';

  return (
    <Wrapper style={{ '--background': background }}>
      <SkipNavTrigger />
      {includeHeader && (
        <>
          {showSuperheader && (
            <SaleSuperheader
              status={superheaderStatus}
              handleDismiss={handleDismissSuperheader}
            />
          )}
          <HeaderWrapper
            style={{
              '--offset': showSuperheader
                ? `${SUPERHEADER_HEIGHT}rem`
                : '0rem',
            }}
          >
            <MaxWidthWrapper>
              <Header type="default" />
            </MaxWidthWrapper>
          </HeaderWrapper>
        </>
      )}

      <ChildWrapper style={{ background }}>
        <SkipNavTarget />
        {children}
        <Spacer size={96} />
      </ChildWrapper>

      <Footer background={background} />

      <Background background={background} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: calc(var(--offset) - 1px);
  z-index: 3;
  background: var(--background);
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    top: -1px;
  }
`;

const ChildWrapper = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;
  max-width: 100vw;
  overflow: hidden;
`;

export default StandardLayout;
