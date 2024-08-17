import React from 'react';
import styled from 'styled-components';

import { COLOR_SWAP_TRANSITION_DURATION } from '@/constants';
import useOverscrollBackground from '@/hooks/use-overscroll-background.hook';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Header from '../Header';
import Spacer from '../Spacer';
import ClientOnly from '../ClientOnly';
import GenerativeArt from '../GenerativeArt';
import Me from '../Me';

const Hero = () => {
  const wrapperRef = React.useRef();

  useOverscrollBackground('var(--color-homepage-bg)', wrapperRef);

  return (
    <Wrapper ref={wrapperRef}>
      <DesktopSpacer size={48} />
      <HeaderWrapper>
        <Header type="hero" />
      </HeaderWrapper>
      <SwoopsWrapper>
        <Swoops
          preserveAspectRatio="none"
          width="1440"
          height="74"
          viewBox="0 0 1440 74"
        >
          <path d="M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z" />
        </Swoops>
      </SwoopsWrapper>

      <MaxWidthWrapper>
        <ArtWrapper>
          <GenerativeArt />
        </ArtWrapper>
      </MaxWidthWrapper>

      <MeOnHomepage />
    </Wrapper>
  );
};

const DesktopSpacer = styled(Spacer)`
  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    display: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 3;
  height: 200px;
  background: linear-gradient(
    0deg,
    var(--color-homepage-dark),
    var(--color-homepage-light)
  );
  transition: --color-homepage-light
      ${COLOR_SWAP_TRANSITION_DURATION}ms linear,
    --color-homepage-dark ${COLOR_SWAP_TRANSITION_DURATION}ms linear;

  @media ${(p) => p.theme.breakpoints.desktop} {
    height: 400px;
  }
`;

const HeaderWrapper = styled(MaxWidthWrapper)`
  position: sticky;
  top: 0;
  z-index: 2;
`;

const SwoopsWrapper = styled.div`
  overflow: hidden;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 90px;
  transform: translateY(1px);
  z-index: 3;

  @media ${(p) => p.theme.breakpoints.desktop} {
  }
`;

const Swoops = styled.svg`
  position: absolute;
  left: -3%;
  right: -3%;
  bottom: 0;
  width: 106%;
  min-width: 600px;
  max-width: unset;

  path {
    fill: var(--color-background);
    transition: fill ${COLOR_SWAP_TRANSITION_DURATION}ms;
  }
`;

const ArtWrapper = styled(ClientOnly)`
  position: absolute;
  z-index: 1;
  right: 21px;
  top: 90px;
  bottom: 10px;

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    display: none;
  }
`;

const MeOnHomepage = styled(Me)`
  position: absolute;
  z-index: 5;
  left: 70%;
  top: 180px;

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    display: none;
  }
`;

export default Hero;
