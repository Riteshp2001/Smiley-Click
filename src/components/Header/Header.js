import React from 'react';
import styled from 'styled-components';
import PT from 'prop-types';

import { HEADER_HEIGHT, IS_SALE_RUNNING } from '@/constants';

import Logo from '../Logo';
import Navigation from '../Navigation';
import MobileNav from '../MobileNav';
import Spacer from '../Spacer';
import DarkModeToggle from '../DarkModeToggle';
import SoundToggle from '../SoundToggle';
import RssLink from '../RssLink';
import InPortal from '../InPortal';

const propTypes = {
  type: PT.oneOf(['hero', 'default']).isRequired,
};

const Header = ({ type }) => {
  return (
    <Wrapper>
      <Left>
        <MainLogo animated={type === 'hero'} />
        <DesktopNavigation />
      </Left>

      <RightDesktop>
        <IconWrapper>
          <DarkModeToggle />
          <Spacer size={18} />
          <SoundToggle />
          <RssWrapper>
            <Spacer size={18} />
            <RssLink />
          </RssWrapper>
        </IconWrapper>
      </RightDesktop>

      <RightMobile>
        <InPortal id="mobile-nav-portal">
          <MobileNav triggerY={12} />
        </InPortal>
      </RightMobile>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  height: ${HEADER_HEIGHT / 16}rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

const DesktopNavigation = styled(Navigation)`
  @media ${(p) => p.theme.breakpoints.mobile} {
    display: none;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: baseline;
`;

const MainLogo = styled(Logo)`
  margin-right: ${(p) => p.theme.unit * 4}px;
`;

const RightDesktop = styled.div`
  @media ${(p) => p.theme.breakpoints.mobile} {
    display: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  transition: opacity 250ms;
`;

const RightMobile = styled.div`
  @media ${(p) => p.theme.breakpoints.desktop} {
    display: none;
  }
`;

const RssWrapper = styled.div`
  display: flex;

  @media (max-width: 840px) {
    display: none;
  }
`;

Header.propTypes = propTypes;

export default React.memo(Header);
