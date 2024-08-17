import React from 'react';
import styled from 'styled-components';

const SKIP_TARGET_ID = `jwc-skip-here`;

export const SkipNavTrigger = ({ children = `Skip to content` }) => {
  const [hasAValidTarget, setHasAValidTarget] = React.useState(false);

  React.useEffect(() => {
    const target = document.querySelector(`#${SKIP_TARGET_ID}`);

    if (!!target !== hasAValidTarget) {
      setHasAValidTarget(!!target);
    }
    // We only want to do this on-mount, because we have no way of knowing
    // when the SkipNavTarget will show up. We assume it's there on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If we've rendered the trigger, but there is no target available, we don't
  // want to show the trigger. Doing so would just be frustrating, since it
  // wouldn't skip anything.
  if (!hasAValidTarget) {
    return null;
  }

  return <Trigger href={`#${SKIP_TARGET_ID}`}>{children}</Trigger>;
};

export const SkipNavTarget = () => <Target id={SKIP_TARGET_ID} />;

const Trigger = styled.a`
  position: fixed;
  z-index: 99999;
  top: 32px;
  left: 32px;
  padding: 16px 24px;
  border-radius: 12px;
  background: var(--color-background);
  color: var(--color-text);
  box-shadow: 0 -5.9px 2.7px rgba(0, 0, 0, 0.018),
    0 -1.2px 6.9px rgba(0, 0, 0, 0.024), 0 8px 14.2px rgba(0, 0, 0, 0.03),
    0 21.9px 29.2px rgba(0, 0, 0, 0.039), 0 49px 80px rgba(0, 0, 0, 0.07);

  /* Visually hidden stuff */
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute !important;
  width: 1px;

  &:focus {
    width: auto;
    height: auto;
    clip: auto;
  }
`;

const Target = styled.div`
  contain: none;
  scroll-margin-top: 64px;
`;
