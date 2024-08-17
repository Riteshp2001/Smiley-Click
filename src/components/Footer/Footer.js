import React from 'react';
import styled from 'styled-components';

import { COLOR_SWAP_TRANSITION_DURATION } from '@/constants';
import { CATEGORIES } from '@/helpers/category.helpers';
import useOverscrollBackground from '@/hooks/use-overscroll-background.hook';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Logo from '../Logo';
import Link from '../Link';

const Footer = ({ background, overscrollColor }) => {
  const wrapperRef = React.useRef();

  useOverscrollBackground(overscrollColor, wrapperRef);

  return (
    <Wrapper
      ref={wrapperRef}
      role="contentinfo"
      style={{
        background,
      }}
    >
      <InnerWrapper>
        <Left>
          <Top>
            <Logo />
            <DesktopOnly>
              <Thanks>Thanks for reading!</Thanks>
            </DesktopOnly>
          </Top>
          <DesktopOnly>
            <Copyright>
              © 2020-present Joshua Comeau. All Rights Reserved.
            </Copyright>
          </DesktopOnly>
        </Left>
        <Right>
          <Column>
            <Heading>Tutorials</Heading>
            <TwoColumnChildren>
              {CATEGORIES.map((category) => {
                return (
                  <FooterLink
                    key={category.slug}
                    href={`/tutorials/${category.slug}`}
                  >
                    {category.name}
                  </FooterLink>
                );
              })}
            </TwoColumnChildren>
          </Column>
          <Column>
            <Heading>Links</Heading>
            <OneColumnChildren>
              <FooterLink href="https://twitter.com/joshwcomeau">
                Twitter
              </FooterLink>
              <FooterLink href="mailto:support@joshwcomeau.com">
                Contact
              </FooterLink>
              <FooterLink href="/terms">Terms of Use</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </OneColumnChildren>
          </Column>
        </Right>
        <MobileOnly>
          <MobileCopyright>
            © 2020-present Joshua Comeau. All Rights Reserved.
          </MobileCopyright>
        </MobileOnly>
      </InnerWrapper>
    </Wrapper>
  );
};

const DesktopOnly = styled.span`
  @media (max-width: 725px) {
    display: none;
  }
`;
const MobileOnly = styled.span`
  @media (min-width: 726px) {
    display: none;
  }
`;

const Wrapper = styled.footer`
  position: relative;
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;
`;

const InnerWrapper = styled(MaxWidthWrapper)`
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
  padding-bottom: 32px;

  @media (max-width: 725px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 725px) {
    text-align: center;
    padding-bottom: 32px;
    align-items: center;
  }
`;
const Right = styled.div`
  display: flex;

  @media (max-width: 725px) {
    justify-content: space-around;
  }
`;

const Column = styled.div`
  margin-left: 96px;
  padding-top: 8px;

  @media (max-width: 725px) {
    margin-left: 0;
  }
`;

const FooterLink = styled(Link)`
  font-size: 14px;
  font-weight: var(--font-weight-light);
  color: var(--color-text);
  text-decoration: none;
`;

const Heading = styled.p`
  font-size: 14px;
  font-weight: var(--font-weight-light);
  color: var(--color-gray-700);
`;

const OneColumnChildren = styled.div`
  display: grid;
  width: 6.25rem;
  grid-template-columns: 1fr;
  grid-gap: 6px;
  padding-top: 12px;
`;

const TwoColumnChildren = styled(OneColumnChildren)`
  width: 12.5rem;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    width: 9rem;
  }
`;

const Top = styled.div``;

const Thanks = styled.div`
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  margin-top: 8px;
`;

const Copyright = styled.div`
  font-size: 12px;
  color: var(--color-gray-700);
`;

const MobileCopyright = styled(Copyright)`
  text-align: center;
  padding-top: 48px;
`;

export default React.memo(Footer);
