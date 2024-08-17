import React from 'react';
import styled from 'styled-components';

import { COLOR_SWAP_TRANSITION_DURATION } from '@/constants';

import Heading from '@/components/Heading';
import ContentPreview from '@/components/ContentPreview';

const ContentPreviewGrid = ({ title, contentList }) => {
  const pluralizedCount =
    contentList.length === 1
      ? '1 Article'
      : `${contentList.length} Articles`;

  return (
    <Wrapper>
      <Header>
        <Title type="large-title">{title}</Title>
        <Count>{pluralizedCount} </Count>
      </Header>
      <Grid>
        {contentList.map((node) => (
          <ItemWrapper key={node.slug}>
            <ContentPreview
              title={node.title}
              subtitle={node.subtitle}
              publishedOn={node.publishedOn}
              abstract={node.abstract}
              linkTo={node.pathname}
              externalLabel={node.externalLabel}
            />
          </ItemWrapper>
        ))}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &:not(:first-of-type) {
    margin-top: 64px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = styled(Heading)`
  padding-left: 32px;
  padding-bottom: 16px;

  @media (min-width: 1150px) {
    padding-left: 0;
  }
`;

const Count = styled.span`
  font-size: 18px;
  padding-right: 32px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    display: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 32px;

  @media (min-width: 1150px) {
    margin-left: -32px;
    margin-right: -32px;
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    grid-template-columns: 1fr;
  }
`;

const ItemWrapper = styled.div`
  background: var(--color-subtle-floating);
  padding: 32px;
  border-radius: 8px;
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export default ContentPreviewGrid;
