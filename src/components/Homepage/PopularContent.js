import React from 'react';
import styled from 'styled-components';

import Heading from '../Heading';
import List from '@/components/List';
import Link from '@/components/Link';

const PopularContent = ({ gridArea, content }) => {
  return (
    <Wrapper style={{ gridArea }}>
      <Heading type="section-title" as="h2">
        Popular Content
      </Heading>
      <Content>
        <List>
          {content.map(({ slug, title, pathname }) => {
            return (
              <List.ListItem animated key={slug}>
                <ContentLink href={pathname}>{title}</ContentLink>
              </List.ListItem>
            );
          })}
        </List>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: sticky;
  top: 32px;
`;

const Content = styled.div`
  padding-top: 32px;

  @media ${(p) => p.theme.breakpoints.desktop} {
    margin-left: -32px;
  }
`;

const ContentLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: var(--color-gray-1000);
  font-weight: var(--font-weight-medium);
  line-height: 1.45;
`;

export default PopularContent;
