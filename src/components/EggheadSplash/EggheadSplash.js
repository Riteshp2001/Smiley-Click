import React from 'react';
import styled from 'styled-components';
import { ExternalLink as ExternalLinkIcon } from 'react-feather';

import New from '../New';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import EggheadEmbed from '../EggheadEmbed';
import Spacer from '../Spacer';

const EggheadSplash = ({ slug, collectionSlug }) => {
  const externalSrc = collectionSlug
    ? `https://egghead.io/lessons/${slug}?af=49agrw`
    : `https://egghead.io/lessons/${slug}?pl=${collectionSlug}&af=49agrw`;

  return (
    <Wrapper>
      <Title>
        Watch the video <New />
      </Title>
      <Paragraph>
        Prefer your lessons in video format? Watch{' '}
        <strong>for free</strong> on egghead:
      </Paragraph>
      <EggheadEmbed slug={slug} collectionSlug={collectionSlug} />
      <Footer>
        <ExternalLink href={externalSrc} target="_blank">
          {collectionSlug
            ? 'Watch the collection'
            : 'View on egghead'}
          <Spacer size={8} />
          <ExternalLinkIcon size={16} />
        </ExternalLink>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  padding: 16px;
  background: var(--color-gray-100);
  border-radius: 16px 16px 0 16px;
  margin-top: 48px;
  margin-bottom: 64px;

  @media ${(p) => p.theme.breakpoints.smAndLarger} {
    padding: 24px 32px 32px 32px;
  }
  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    margin-left: -32px;
    margin-right: -32px;
  }
`;

const Title = styled(Heading)`
  margin-bottom: 8px;
`;

const Footer = styled.div`
  padding: 16px;
  padding-top: 0;
  position: absolute;
  background: var(--color-gray-100);
  right: 0;
  bottom: 0;
  transform: translateY(99%);
  border-radius: 0 0 16px 16px;
`;

const ExternalLink = styled.a`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  color: var(--color-text);
  text-decoration: none;
`;

export default EggheadSplash;
