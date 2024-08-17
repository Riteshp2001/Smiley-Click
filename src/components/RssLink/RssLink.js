import React from 'react';
import styled from 'styled-components';

const RssLink = ({ size = 22, ...delegated }) => {
  return (
    <Wrapper
      href="/rss.xml"
      target="_blank"
      rel="noopener noreferrer"
      aria-labelledby="rss-title"
      {...delegated}
    >
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title id="rss-title">RSS Feed</title>
        <path d="M4 11a9 9 0 0 1 9 9"></path>
        <path d="M4 4a16 16 0 0 1 16 16"></path>
        <circle cx="5" cy="19" r="1"></circle>
      </Svg>
    </Wrapper>
  );
};

const Wrapper = styled.a`
  display: block;
  height: 32px;
  width: 32px;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${p => p.theme.breakpoints.mdAndLarger} {
    &:hover {
      opacity: 1;
    }
  }
`;

const Svg = styled.svg`
  stroke: var(--color-text);
  display: block;
`;

export default RssLink;
