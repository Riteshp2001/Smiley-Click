import React from 'react';
import styled from 'styled-components';
import { ArrowRight } from 'react-feather';

import HitCounter from '../HitCounter';
import Link from '../Link';
import Spacer from '../Spacer';

const ContentFooter = ({ publishedOn, slug, hits, nextPost }) => {
  const dateElem = (
    <DateWrapper>
      <Prefix>Last Updated</Prefix>
      <Title>{publishedOn}</Title>
    </DateWrapper>
  );

  const nextElem = nextPost && (
    <NextWrapper href={nextPost.href}>
      <Prefix>Next up</Prefix>
      <Title>
        {nextPost.title}{' '}
        <NextIcon size={24} stroke="var(--color-gray-700)" />
      </Title>
    </NextWrapper>
  );

  // TODO: Come up with a better layout for this!
  // if (nextPost) {
  //   return (
  //     <Wrapper style={{ alignItems: `center` }}>
  //       {dateElem}
  //       {!!hits && (
  //         <CenterCounter>
  //           <HitCounter hits={hits} />
  //         </CenterCounter>
  //       )}
  //       {nextElem}
  //     </Wrapper>
  //   );
  // }

  return (
    <Wrapper>
      {dateElem}
      <HitsWrapper>
        <Prefix>Hits</Prefix>
        <Spacer size={5} />
        {!!hits && <HitCounter hits={hits} />}
      </HitsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
`;

const NextWrapper = styled(Link)`
  flex: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: right;
  color: var(--color-text);
  text-decoration: none;
  margin-right: 0px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    margin-right: 0;
  }
`;

const CenterCounter = styled.div`
  flex: 1;

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    display: none;
  }
`;

const Prefix = styled.h3`
  color: var(--color-gray-600);
  font-size: 13px;
  text-transform: uppercase;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    font-size: 12px;
  }
`;

const Title = styled.p`
  font-size: 21px;
  font-weight: var(--font-weight-medium);

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    font-size: 18px;
  }
`;

const DateWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const NextIcon = styled(ArrowRight)`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(calc(100% + 8px), 0);

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    transform: translate(0, calc(100%));
  }
`;

const HitsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* HACK: The hit counter changes height which moves the entire layout. */
  min-height: 72px;
  text-align: right;
`;

export default ContentFooter;
