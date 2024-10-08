import React from 'react';
import styled from 'styled-components';
import { Pause, Play } from 'react-feather';

import { ConfigContext } from '../ConfigContext';

import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion.hook';

import UnstyledButton from '@/components/UnstyledButton';

const FANCY_SHADOW = `
  0 1.3px 2.5px -3px rgba(0, 0, 0, 0.02),
  0 3.1px 6.1px -3px rgba(0, 0, 0, 0.028),
  0 5.9px 11.4px -3px rgba(0, 0, 0, 0.035),
  0 10.5px 20.3px -3px rgba(0, 0, 0, 0.042),
  0 19.6px 38px -3px rgba(0, 0, 0, 0.05),
  0 47px 91px -3px rgba(0, 0, 0, 0.07)
`;

function VideoGif({
  src,
  darkSrc,
  maxWidth,
  alt,
  caption,
  noBorder,
  includeShadow,
  fillEdges,
  backdrop,
  style = {},
  wrapperStyle = {},
  ...delegated
}) {
  const videoRef = React.useRef();

  const { colorMode } = React.useContext(ConfigContext);

  const [isPaused, setIsPaused] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);

  const actualSrc = colorMode === 'light' ? src : darkSrc || src;

  const prefersReducedMotion = usePrefersReducedMotion();

  const autoplay = !prefersReducedMotion;

  function handleTogglePlaying(method) {
    if (videoRef.current.paused) {
      setIsPaused(false);
      videoRef.current.play();
      // Clicking the play button should hide the controls, but we
      // shouldn't do this for keyboard users, since it would be
      // strange to have the currently-focused element become
      // invisible.
      if (method === 'pointer') {
        setShowControls(false);
      }
    } else {
      setIsPaused(true);
      videoRef.current.pause();
      if (method === 'pointer') {
        setShowControls(true);
      }
    }
  }

  return (
    <Wrapper
      style={{
        maxWidth,
        border: noBorder
          ? undefined
          : `1px solid var(--color-gray-200)`,
        padding: noBorder ? 0 : 10,
        background: backdrop,
        ...wrapperStyle,
      }}
    >
      <Video
        ref={videoRef}
        autoPlay={autoplay}
        loop
        controls={false}
        muted={autoplay}
        playsInline={autoplay}
        src={actualSrc}
        aria-label={alt}
        style={{
          ...style,
          boxShadow: includeShadow && FANCY_SHADOW,
        }}
        onClick={() => handleTogglePlaying('pointer')}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        {...delegated}
      />

      {fillEdges && <Filler />}

      <PauseButton
        style={{ opacity: showControls ? 1 : 0 }}
        onKeyDown={(event) => {
          if (event.code === 'Enter') {
            handleTogglePlaying('keyboard');
          }
        }}
        onFocus={() => setShowControls(true)}
        onBlur={() => setShowControls(false)}
      >
        {isPaused ? <Play size={24} /> : <Pause size={24} />}
      </PauseButton>

      {caption && (
        <Caption style={{ marginTop: includeShadow ? 16 : 0 }}>
          {caption}
        </Caption>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  margin: 36px auto 64px;
  box-sizing: content-box;
  border-radius: 5px;
`;

const Caption = styled.div`
  padding-top: 8px;
  font-size: 15px;
  text-align: center;
`;

const Video = styled.video`
  position: relative;
  display: block;
  max-width: 100%;
  margin: auto;
  border-radius: 3px;
  cursor: pointer;
`;

// For some reason, screenflow sometimes creates a 1px black
// outline. Let's hide it.
const Filler = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  pointer-events: none;
  border: 3px solid white;
  border-radius: 4px;
`;

const PauseButton = styled(UnstyledButton)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 64px;
  height: 64px;
  background: hsl(0deg 0% 0% / 0.5);
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 500ms;
  pointer-events: none;

  i,
  svg {
    display: block !important;
  }
`;

export default VideoGif;
