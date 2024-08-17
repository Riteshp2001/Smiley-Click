import React from 'react';
import styled from 'styled-components';

import StandardLayout from '../StandardLayout';
import ContentPreviewGrid from '../ContentPreviewGrid';
import MaxWidthWrapper from '../MaxWidthWrapper';
import NewsletterSignup from '../NewsletterSignup';

const ContentList = ({ groupedContent }) => {
  return (
    <StandardLayout background="var(--color-subtle-background)">
      <MaxWidthWrapper>
        <Main>
          {groupedContent.map((section, index) => {
            return (
              <ContentPreviewGrid
                key={index}
                title={section.title}
                contentList={section.content}
              />
            );
          })}
        </Main>
        <SignupWrapper>
          <NewsletterSignup />
        </SignupWrapper>
      </MaxWidthWrapper>
    </StandardLayout>
  );
};

const Main = styled.main`
  padding-top: 128px;
`;

const SignupWrapper = styled.div`
  max-width: 750px;
  padding-top: 96px;

  @media (max-width: 1149px) {
    padding-left: 32px;
    padding-right: 32px;
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export default ContentList;
