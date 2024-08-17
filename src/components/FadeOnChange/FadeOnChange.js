/**
 * NOTE: Interrupts are kinda buggy.
 * Needs to be better-thought-out before general usage.
 */
import React from 'react';
import styled from 'styled-components';

const FadeOnChange = (
  { duration = 200, children, style = {}, ...delegated },
  ref
) => {
  const [status, setStatus] = React.useState('idle');

  const wrapperRef = React.useRef();
  const actualRef = ref || wrapperRef;

  const cachedChildren = React.useRef(children);

  React.useEffect(() => {
    // Ignore initial mount
    if (children === cachedChildren.current) {
      return;
    }

    setStatus((s) => (s === 'idle' ? 'fading-out' : 'idle'));

    function handleTransitionEnd() {
      cachedChildren.current = children;
      setStatus('idle');
    }

    const elem = actualRef.current;

    elem.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      elem?.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [children, actualRef]);

  return (
    <Wrapper
      ref={actualRef}
      style={{ ...style, opacity: status === 'fading-out' ? 0 : 1 }}
    >
      {cachedChildren.current}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  /* TODO variable duration */
  transition: opacity 250ms;
`;

export default React.forwardRef(FadeOnChange);
