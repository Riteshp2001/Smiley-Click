import React from 'react';
import styled from 'styled-components';

import Heading from '../Heading';
import ContentPreview from '../ContentPreview';
import Spacer from '../Spacer';

const NewestArticles = ({ gridArea, content }) => {
  return (
    <Wrapper style={{ gridArea }}>
      <Heading type="section-title" as="h2">
        Recently Published
      </Heading>
      <Spacer size={36} />
      <div>
        {content.map(({ pathname, slug, ...frontmatter }) => {
          return (
            <PreviewWrapper key={slug}>
              <ContentPreview linkTo={pathname} {...frontmatter} />
            </PreviewWrapper>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

const PreviewWrapper = styled.div`
  &:not(:first-of-type) {
    margin-top: 48px;
  }
`;

export default NewestArticles;
