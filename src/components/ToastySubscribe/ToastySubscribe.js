import React from 'react';
import styled, { keyframes } from 'styled-components';
import va from '@/vercel/analytics';

import { IS_SALE_RUNNING } from '@/constants';
import usePersistedState from '@/hooks/use-persisted-state.hook';
import useWindowDimensions from '@/hooks/use-window-dimensions-client.hook';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion.hook';
import { debounce } from '@/utils';

import Me from '@/components/Me';

import { ME_PX_FROM_BOTTOM } from './constants';
import SubscribeModal from './SubscribeModal';
import PromptBubble from './PromptBubble';

const getValidWindowSize = (windowWidth, windowHeight) => {
  return windowHeight >= 630 && windowWidth > 768;
};

// Statuses:
// - idle (no effect)
// - Peeking (guy pops out, speech bubble)
// - Denied ("No thanks")
// - Open (form open, inner status delegated to SubscribeModal)
// - Subscribed (success)
// - Dismissed (Exited out of the modal)

const ToastySubscribe = ({ variant }) => {
  const [status, setStatus] = React.useState('idle');
  const [mood, setMood] = React.useState(null);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const focusedElement = React.useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const [history, setHistory] = usePersistedState(
    { status: 'unsubscribed', seenCount: 0, lastSeenAt: null },
    'toasty-subscribe-history'
  );

  const {
    width: windowWidth,
    height: windowHeight,
  } = useWindowDimensions();

  const statusRef = React.useRef(status);
  React.useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Analytics
  React.useEffect(() => {
    if (status === 'idle') {
      return;
    }

    va.track('toasty-subscribe', { status });
  }, [status]);

  React.useEffect(() => {
    try {
      const searchParams = new URLSearchParams(
        window.location.search
      );

      if (searchParams.get('from') === 'newsletter') {
        setIsDisabled(true);
      }
    } catch (err) {
      // Ignore errors.
    }
  }, []);

  const handleSubscribe = () => {
    setHistory({
      ...history,
      status: 'subscribed',
    });
    va.track('toasty-subscribe', { status: 'subscribed' });
  };

  React.useEffect(() => {
    const wasJustClosed =
      status === 'denied' ||
      status === 'subscribed' ||
      status === 'dismissed';

    if (wasJustClosed && focusedElement.current) {
      // HACK: Because Reach Modal is also trying to restore focus, we should
      // wait a sec and then restore our own focus
      window.setTimeout(() => {
        // I've received a bug report that closing the modal
        // causes the user to scroll all the way to the top,
        // presumably because something up there was focused.
        // Let's check and see if the element is within the
        // viewport. If not, skip this step.

        const bb = focusedElement.current.getBoundingClientRect();

        const isWithinViewport =
          bb.top <= window.innerHeight && bb.bottom > 0;

        if (isWithinViewport) {
          focusedElement.current.focus();
        }
      }, 20);
    }
  }, [status]);

  React.useEffect(() => {
    const status = statusRef.current;

    if (history.status === 'subscribed') {
      return;
    }

    if (history.seenCount >= 2) {
      return;
    }

    const deltaSinceLastSeen = history.lastSeenAt
      ? Date.now() - history.lastSeenAt
      : Infinity;

    const deltaInHours = deltaSinceLastSeen / 1000 / 60 / 60;

    if (deltaInHours < 2) {
      return;
    }

    const shouldBindScrollListener = getValidWindowSize(
      windowWidth,
      windowHeight
    );

    if (!shouldBindScrollListener) {
      return;
    }

    const handleScroll = debounce((ev) => {
      const appWrapper = document.querySelector('#__next');
      const documentHeight = appWrapper?.offsetHeight;

      // Don't show if the document height can't be found, OR
      // if the article is super short.
      if (!documentHeight || documentHeight < 1000) {
        return;
      }

      if (status === 'peeking') {
        // If we've scrolled near the bottom, hide the fella
        const distanceFromBottom =
          documentHeight - (window.innerHeight + window.scrollY);

        if (distanceFromBottom < 700) {
          setStatus('denied');
        }

        return;
      } else if (status === 'idle') {
        // When the user is at the halfway scroll point, pop it out
        const scrollPercentage =
          (window.scrollY / documentHeight) * 100;

        if (scrollPercentage > 50) {
          // Time to peek!
          // To avoid breaking focus, we need to capture whatever is currently
          // focused.
          focusedElement.current = document.activeElement;

          // The "Sure!" button will be focused on mount, inside SpeechBubble

          setStatus('peeking');

          setHistory({
            ...history,
            lastSeenAt: Date.now(),
            seenCount: history.seenCount + 1,
          });
        }
      }
    }, 300);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [windowWidth, windowHeight, history, setHistory]);

  const handleClose = () => setStatus('dismissed');

  // This whole effect is very motion-dependent. Safer to omit entirely
  // when this media query is detected.
  // TODO: Implement a motion-free variant!
  if (prefersReducedMotion || isDisabled) {
    return null;
  }

  // While sales are happening and a banner is shown, the ToastySubscribe feels like too much
  if (IS_SALE_RUNNING) {
    return null;
  }

  return (
    <>
      {status !== 'dismissed' && (
        <MeWrapper $status={status}>
          <Me mood={mood} data-cy="toasty-character" />
        </MeWrapper>
      )}

      <SpeechBubbleWrapper
        style={{
          pointerEvents: status === 'peeking' ? 'auto' : 'none',
        }}
      >
        <PromptBubble
          isVisible={status === 'peeking'}
          width={350}
          showDelay={1000}
          handleConfirm={() => setStatus('open')}
          handleDeny={() => setStatus('denied')}
          hoverConfirm={() => setMood('very-happy')}
          clearHover={() => setMood(null)}
        />
      </SpeechBubbleWrapper>

      <SubscribeModal
        variant={variant}
        isOpen={status === 'open'}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        handleClose={handleClose}
        handleSubscribe={handleSubscribe}
      />
    </>
  );
};

const toss = keyframes`
  0% {
    transform: translateX(-50%) rotate(40deg);
  }
  10% {
    transform: translateX(-120%) rotate(25deg);
  }
  20% {
    transform: translateX(-120%) rotate(25deg);
  }
  30% {
    transform: translateX(-40%) rotate(50deg);
  }
  48% {
    transform: translateX(-45%) rotate(40deg);
  }
  70% {
    transform: translateX(-45%) rotate(40deg);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateX(-110%) rotate(0deg);
  }
`;

const peek = keyframes`
  0% {
    transform: translateX(-150%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(40deg);
  }
`;

const slinkAway = keyframes`
  0% {
    transform: translateX(-50%) rotate(40deg);
  }
  100% {
    transform: translateX(-150%) rotate(0deg);
  }
`;

const getMeAnimationName = (status) => {
  if (
    status === 'open' ||
    status === 'submitting' ||
    status === 'submitted'
  ) {
    return toss;
  } else if (status === 'peeking') {
    return peek;
  } else if (status === 'denied') {
    return slinkAway;
  } else {
    return null;
  }
};
const getMeAnimationDuration = (status) => {
  if (
    status === 'open' ||
    status === 'submitting' ||
    status === 'submitted'
  ) {
    return '2000ms';
  } else if (status === 'peeking') {
    return '1200ms';
  } else if (status === 'denied') {
    return '750ms';
  } else {
    return '0ms';
  }
};

const MeWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  bottom: ${ME_PX_FROM_BOTTOM}px;
  transform: translateX(-100%) rotate(0deg);
  animation-name: ${(p) => getMeAnimationName(p.$status)};
  animation-duration: ${(p) => getMeAnimationDuration(p.$status)};
  animation-fill-mode: both;
  backface-visibility: hidden;
`;

const SpeechBubbleWrapper = styled.div`
  position: fixed;
  z-index: 1001;
  left: 110px;
  bottom: ${ME_PX_FROM_BOTTOM - 45}px;
`;

export default ToastySubscribe;
