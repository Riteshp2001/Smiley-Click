import React from 'react';
import styled from 'styled-components';

import { COLOR_SWAP_TRANSITION_DURATION } from '@/constants';

import FullBleed from '../FullBleed';
import NewsletterSignup from '../NewsletterSignup';
import MaxWidthWrapper from '../MaxWidthWrapper';

const ArticleNewsletterSignup = ({
  variant,
  cta,
  backgroundColor = 'var(--color-muted)',
}) => {
  return (
    <Wrapper style={{ backgroundColor: backgroundColor }}>
      <MaxWidthWrapper>
        <Inner>
          <NewsletterSignup variant={variant} cta={cta} />
        </Inner>
      </MaxWidthWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(FullBleed)`
  transition: background-color ${COLOR_SWAP_TRANSITION_DURATION}ms;
  padding: 64px 0;
  margin-top: 64px;
`;

const Inner = styled.div`
  max-width: 675px;
  position: relative;
  margin: auto;
`;

export default ArticleNewsletterSignup;
