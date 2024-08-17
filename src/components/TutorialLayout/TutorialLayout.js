import React from 'react';
import styled from 'styled-components';

import {
  HEADER_HEIGHT,
  SUPERHEADER_HEIGHT,
  COLOR_SWAP_TRANSITION_DURATION,
} from '@/constants';
import { throttle } from '@/utils';
import useSaleSuperheader from '@/hooks/use-sale-superheader';

import Header from '../Header';
import Footer from '../Footer';
import Spacer from '../Spacer';
import MaxWidthWrapper from '../MaxWidthWrapper';
import NewsletterSignup from '../NewsletterSignup';
import SaleSuperheader from '@/components/SaleSuperheader';
import { SkipNavTrigger, SkipNavTarget } from '../SkipNav';

// HACK: This should be derived.
// Could use a data attribute?
const HERO_HEIGHT = 250;

const TutorialLayout = ({
  hero,
  includeNewsletterSignup,
  newsletterCta,
  children,
}) => {
  const [
    superheaderStatus,
    handleDismissSuperheader,
  ] = useSaleSuperheader();

  const showSuperheader = superheaderStatus !== 'dismissed';

  const [
    scrolledBelowHeader,
    setScrolledBelowHeader,
  ] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = throttle(() => {
      const shouldAppear =
        !scrolledBelowHeader && window.scrollY > HERO_HEIGHT;
      const shouldDisappear =
        scrolledBelowHeader && window.scrollY <= HERO_HEIGHT;

      if (shouldAppear || shouldDisappear) {
        setScrolledBelowHeader(!scrolledBelowHeader);
      }
    }, 250);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolledBelowHeader, setScrolledBelowHeader]);

  return (
    <Wrapper>
      <SkipNavTrigger />
      {showSuperheader && (
        <SaleSuperheader
          status={superheaderStatus}
          handleDismiss={handleDismissSuperheader}
        />
      )}
      <HeaderWrapper
        style={{
          '--top': showSuperheader ? `${SUPERHEADER_HEIGHT}rem` : 0,
        }}
      >
        <MaxWidthWrapper maxWidth="68.75rem">
          <Header type="default" />
        </MaxWidthWrapper>
      </HeaderWrapper>

      <HeroWrapper>
        <LightHeaderBackground
          style={{
            '--offset': showSuperheader
              ? `${SUPERHEADER_HEIGHT}rem`
              : '0rem',
          }}
        />
        <SneakyLightHeaderBackground />
        {hero}
      </HeroWrapper>

      <DarkHeaderBackground
        style={{
          '--top': showSuperheader ? `${SUPERHEADER_HEIGHT}rem` : 0,
        }}
      />

      <Children>
        <SkipNavTarget />
        {children}
      </Children>

      {includeNewsletterSignup ? (
        <SignupOuterOuterWrapper>
          <SignupOuterWrapper>
            <SignupWrapper>
              <NewsletterSignup
                backgroundColor="transparent"
                cta={newsletterCta}
                noFloating
              />
              <Swoops
                width="1420"
                height="478"
                viewBox="0 0 1420 478"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <clipPath id="clip0">
                    <rect width="1420" height="478" fill="white" />
                  </clipPath>
                </defs>
                <g clipPath="url(#clip0)">
                  <path
                    d="M744 464C686 478.5 598 478.5 598 478.5H1394C1323.5 478.5 1241 478.5 1173 450.5C1105 422.5 1145.05 288.617 1066 256.5C986.945 224.383 914.079 230.227 849.5 286C805.5 324 822.393 444.402 744 464Z"
                    fill="var(--color-muted)"
                  />
                </g>
              </Swoops>
            </SignupWrapper>
          </SignupOuterWrapper>
        </SignupOuterOuterWrapper>
      ) : (
        <Spacer size={148} />
      )}
      <Footer
        background="var(--color-muted)"
        overscrollColor="var(--color-muted)"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--color-background);
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  z-index: 5;
  top: var(--top);

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    top: 0;
  }
`;

const GradientWrapper = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  right: 0;
  z-index: 2;
  pointer-events: none;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    display: none;
  }
`;

const HeroWrapper = styled.div`
  position: relative;
  z-index: 4;
`;

const LightHeaderBackground = styled.div`
  position: sticky;
  z-index: 4;
  top: 0px;
  width: 100%;
  height: calc(68px + var(--offset));
  background: var(--color-muted);
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;
  margin-top: calc(var(--offset) * -1);

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    height: 68px;
  }
`;

const SneakyLightHeaderBackground = styled.div`
  position: absolute;
  z-index: 3;
  top: -68px;
  width: 100%;
  height: 68px;
  background: var(--color-muted);
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;
`;

const DarkHeaderBackground = styled.div`
  position: sticky;
  z-index: 3;
  top: var(--top);
  width: 100%;
  height: calc(68px + 2px);
  background: var(--color-background);
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;
  transform: translateY(-2px);
  will-change: transform;

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    top: 0;
  }
`;

const Children = styled.main`
  position: relative;
  z-index: 1;

  @media ${(p) => p.theme.breakpoints.lgAndSmaller} {
    max-width: 100vw;
    overflow: hidden;
  }
`;

const SignupOuterOuterWrapper = styled.div`
  overflow: hidden;
`;
const SignupOuterWrapper = styled(MaxWidthWrapper)`
  padding-top: 96px;
  padding-bottom: 96px;

  @media (max-width: 1024px) {
    max-width: calc(686px + 32px + 32px);
  }
`;

const SignupWrapper = styled.div`
  max-width: 686px;
  position: relative;
`;

const Swoops = styled.svg`
  display: block;
  position: absolute;
  right: -71%;
  bottom: -96px;
  width: 185%;
  z-index: -1;
  max-width: unset;
`;

export default TutorialLayout;
