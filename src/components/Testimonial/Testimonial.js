import React from 'react';
import styled from 'styled-components';

import useBrowser from '@/hooks/use-browser.hook';

const TestimonialContent = ({
  authorName,
  authorTitle,
  authorAvatar,
  href,
  type,
  children,
}) => {
  const fontSize = type === 'double' ? 21 : 24;

  const browser = useBrowser();

  return (
    <Wrapper>
      <Quote
        className={browser !== 'safari' && 'not-safari'}
        style={{
          '--font-size':
            typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        }}
      >
        {children}
      </Quote>

      <Author>
        <Avatar src={authorAvatar} alt="" />
        <a href={href}>{authorName}</a>
        {authorTitle}
      </Author>
    </Wrapper>
  );
};

const Wrapper = styled.figure`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 92px;
`;

const Avatar = styled.img`
  display: block;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  margin: 0 auto 12px;
  user-select: none;
  /* prettier-ignore */
  box-shadow:
    0px 0px 0px 4px var(--color-background),
    0px 0px 0px 6px var(--color-gray-700)
  ;
`;

const Quote = styled.blockquote`
  position: relative;
  font-size: 1.25rem;
  font-weight: 300;
  text-align: center;
  margin: 0 16px;
  padding: 0 16px;
  font-style: italic;

  @media (max-width: 700px) {
    font-size: 1rem;
  }

  strong {
    color: var(--color-tertiary);
  }

  &:before,
  &:after {
    position: absolute;
    top: -25px;
    font-size: 4rem;
    pointer-events: none;
    opacity: 0.25;
  }
  &:before {
    content: '“';
    left: 0;
    transform: translateX(-80%);
  }
  &:after {
    content: '”';
    right: 0;
    transform: translateX(80%);
  }
`;

const Author = styled.figcaption`
  margin-top: 32px;
  text-align: center;
  color: var(--color-gray-700);

  a {
    display: block;
    font-size: 21px;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--color-text);
    text-decoration: none;
  }
`;

export default TestimonialContent;
