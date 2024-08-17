import React from 'react';
import styled from 'styled-components';

import useScrollPosition from '@/hooks/use-scroll-position.hook';

import ContentLikeButton from '../ContentLikeButton';
const MINIMUM_BUFFER = 300 / 16;

const FloatingSidebar = ({ slug, maxArticleWidth }) => {
  const [, scrollY] = useScrollPosition();

  const extendBy = maxArticleWidth - 675 / 16;

  const isInvisible = scrollY < 250;

  return (
    <Wrapper
      $extendBy={extendBy}
      $maxArticleWidth={maxArticleWidth}
      style={{
        opacity: isInvisible ? 0 : 1,
        visibility: isInvisible ? 'hidden' : 'visible',
        transition: isInvisible
          ? `opacity 500ms, visibility 0ms 500ms`
          : `opacity 500ms, visibility 0ms`,
      }}
    >
      <ContentLikeButton slug={slug} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;
  position: fixed;
  top: 256px;

  @media (min-width: ${(p) =>
      p.$maxArticleWidth + MINIMUM_BUFFER}rem) {
    display: block;
    right: 8px;
  }
  @media (min-width: ${(p) => 1200 / 16 + p.$extendBy}rem) {
    right: calc((100vw - ${(p) => 1150 / 16 + p.$extendBy}rem) / 2);
  }
`;

export default FloatingSidebar;
