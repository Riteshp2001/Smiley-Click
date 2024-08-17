import React from 'react';
import styled from 'styled-components';

import { COLOR_SWAP_TRANSITION_DURATION } from '@/constants';

import { ConfigContext } from '@/components/ConfigContext';
import ClientOnly from '@/components/ClientOnly';
import FadeIn from '@/components/FadeIn';
import ImgWithFallback from '@/components/ImgWithFallback';

const SOURCES = {
  light: {
    sad: '/assets/emotions/head-sad.png',
    'very-happy': '/assets/emotions/head-very-happy.png',
  },
  dark: {
    sad: '/assets/emotions/head-sad-dark.png',
    'very-happy': '/assets/emotions/head-very-happy-dark.png',
  },
};

const Me = ({
  colorModeOverride,
  mood = 'happy',
  fadeDuration = 600,
  fadeDelay = 200,
  ...delegated
}) => {
  const { colorMode } = React.useContext(ConfigContext);

  const actualColorMode = colorModeOverride || colorMode;

  const headSrc = SOURCES[actualColorMode][mood];

  return (
    <ClientOnly {...delegated}>
      <FadeIn duration={fadeDuration} delay={fadeDelay}>
        <MeLight
          src="/assets/me-light.webp"
          fallback="/assets/me-light.png"
          style={{ opacity: actualColorMode === 'light' ? 1 : 0 }}
          alt="3D portrait of the blog's author, Josh Comeau"
        />
        <MeDark
          src="/assets/me-dark.webp"
          fallback="/assets/me-dark.png"
          style={{
            opacity: actualColorMode === 'dark' ? 1 : 0,
            transition:
              actualColorMode === 'dark'
                ? 'opacity 0ms 0ms'
                : `opacity ${COLOR_SWAP_TRANSITION_DURATION}ms ${COLOR_SWAP_TRANSITION_DURATION}ms`,
          }}
          alt=""
        />

        {headSrc && <Head src={headSrc} alt="" />}
      </FadeIn>
    </ClientOnly>
  );
};

const MeRoot = styled(ImgWithFallback)`
  display: block;
  top: 0;
  left: 0;
  height: 232px;
  pointer-events: none;
`;

const MeLight = styled(MeRoot)`
  position: relative;
  z-index: 2;
  transition: opacity ${COLOR_SWAP_TRANSITION_DURATION}ms;
`;
const MeDark = styled(MeRoot)`
  position: absolute;
  z-index: 1;
`;

const Head = styled.img`
  position: absolute;
  z-index: 3;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

export default Me;
