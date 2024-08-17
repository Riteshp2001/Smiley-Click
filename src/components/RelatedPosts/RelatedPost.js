import React from 'react';
import styled from 'styled-components';

import Link from '../Link';

const RelatedPost = ({ pathname, title, image, abstract }) => {
  return (
    <OuterWrapper href={pathname} target="_blank">
      <Wrapper>
        <OgImage src={image} alt="" />
        <Title>{title}</Title>
        <Abstract>{abstract}</Abstract>
        <Shadow />
      </Wrapper>
      <Background />
    </OuterWrapper>
  );
};

const OuterWrapper = styled(Link)`
  text-decoration: none;
  color: var(--color-text);
  --border-radius: 8px;
  position: relative;
`;

const Wrapper = styled.article`
  position: relative;
  z-index: 2;
  padding: 16px;
  border-radius: var(--border-radius);
  background: var(--color-background);
  transition: transform 300ms;
  will-change: transform;

  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    ${OuterWrapper}:hover & {
      transform: translate(-2px, -4px);
    }
  }
`;

const Shadow = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  box-shadow: 0 0.2px 3.9px rgba(0, 0, 0, 0.022),
    0 0.6px 7.8px rgba(0, 0, 0, 0.031),
    0 1.2px 11.5px rgba(0, 0, 0, 0.039),
    0 2.6px 14.9px rgba(0, 0, 0, 0.048),
    0 7px 17px rgba(0, 0, 0, 0.07);
  opacity: 0.3;
  transition: opacity 400ms;
  pointer-events: none;

  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    ${OuterWrapper}:hover & {
      opacity: 1;
    }
  }
`;
const Background = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--border-radius);
  opacity: 0;
  transition: opacity 0ms 300ms;

  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    ${OuterWrapper}:hover & {
      transition: opacity 0ms;
      opacity: 1;
    }
  }
`;

const OgImage = styled.img`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: var(--font-weight-medium);
  margin-bottom: 8px;
`;

const Abstract = styled.p`
  font-size: 1rem;
  color: var(--color-gray-700);
`;

export default RelatedPost;
