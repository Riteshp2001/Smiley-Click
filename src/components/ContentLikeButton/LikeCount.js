import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { MAX_NUM_OF_LIKES } from '@/constants';

const LikeCount = ({ numOfMyLikes, numOfLikes }) => {
  const hasMounted = React.useRef(false);
  const [label, setLabel] = React.useState(null);
  const cachedNumOfMyLikes = React.useRef(numOfMyLikes);

  React.useEffect(() => {
    hasMounted.current = true;
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!hasMounted.current) {
      return;
    }

    const diff = numOfMyLikes - cachedNumOfMyLikes.current;

    cachedNumOfMyLikes.current = numOfMyLikes;

    if (diff > 0) {
      setLabel('+1');
    } else if (diff < 0) {
      setLabel('-1');
    } else if (numOfMyLikes === MAX_NUM_OF_LIKES) {
      setLabel('MAX');
    }
  });

  const style = useSpring({
    from: {
      transform: `translateY(0px)`,
      opacity: 1,
    },
    to: {
      transform: `translateY(-12px)`,
      opacity: 0,
    },
    config: {
      tension: 100,
      friction: 40,
    },
    reset: true,
  });

  return (
    <Wrapper $hasBeenLikedByUser={numOfMyLikes > 0}>
      <InnerWrapper>
        {numOfLikes}
        <LabelWrapper>
          <Label style={style}>{label}</Label>
        </LabelWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 22px;
  font-size: 1rem;
  min-width: 75px;
  font-weight: var(--font-weight-medium);
  color: ${(p) =>
    p.$hasBeenLikedByUser
      ? 'hsl(333deg, 100%, 52%)'
      : 'var(--color-gray-700)'};
`;

const InnerWrapper = styled.span`
  position: relative;
  display: inline-block;
`;

const LabelWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(calc(100% + 4px));
  pointer-events: none;
`;

const Label = styled(animated.div)`
  font-size: 11px;
  color: var(--color-gray-500);
`;

export default React.memo(LikeCount);
