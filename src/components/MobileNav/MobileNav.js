import React from 'react';
import styled from 'styled-components';
import { useTrail, animated } from 'react-spring';

import { CATEGORIES } from '@/helpers/category.helpers';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion.hook';
import useScrollDisabler from '@/hooks/use-scroll-disabler.hook';

import UnstyledButton from '../UnstyledButton';
import Link from '../Link';
import HamburgerFlippyIcon from '../HamburgerFlippyIcon';
import Spacer from '../Spacer';
import DarkModeToggle from '../DarkModeToggle';
import SoundToggle from '../SoundToggle';
import VisuallyHidden from '../VisuallyHidden';

const MobileNav = ({ triggerY }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  useScrollDisabler(isOpen);

  const categories = CATEGORIES.slice(0, 3);

  const navItems = [
    { label: 'Latest', href: '/latest/' },
    { label: 'Tutorials', href: '/tutorials/' },
    ...categories.map((category) => ({
      label: category.name,
      href: `/tutorials/${category.slug}/`,
      Component: NavLinkChild,
    })),
    { label: 'Goodies', href: '/goodies/' },
    { label: 'Courses', href: '/courses/' },
  ];

  const trail = useTrail(navItems.length, {
    transform: isOpen ? 'translateX(0%)' : 'translateX(-100%)',
    immediate: prefersReducedMotion,
    config: {
      tension: 700,
      friction: isOpen ? 60 : 20,
      clamp: true,
    },
  });

  return (
    <>
      <Trigger
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        style={{
          top: triggerY,
        }}
      >
        <HamburgerFlippyIcon isOpen={isOpen} size={32} />
        <VisuallyHidden>Toggle mobile menu</VisuallyHidden>
      </Trigger>

      <ModalWrapper
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <Backdrop
          style={{
            opacity: isOpen ? 1 : 0,
            touchAction: isOpen ? 'none' : 'auto',
          }}
          onClick={() => setIsOpen(false)}
          aria-hidden={true}
          tabIndex={-1}
        />

        <Nav aria-label="mobile navigation">
          <Top>
            {trail.map((style, index) => {
              const { label, href, Component = NavLink } = navItems[
                index
              ];
              return (
                <animated.div style={style} key={index}>
                  <Component href={href} tabIndex={isOpen ? 0 : -1}>
                    {label}{' '}
                  </Component>
                </animated.div>
              );
            })}
          </Top>
          <Bottom
            style={{
              opacity: isOpen ? 1 : 0,
              transition: `opacity 250ms ${isOpen ? 500 : 0}ms`,
            }}
          >
            <DarkModeToggle
              id="mobile-nav"
              tabIndex={isOpen ? 0 : -1}
            />
            <Spacer size={30} />
            <SoundToggle tabIndex={isOpen ? 0 : -1} />
          </Bottom>
        </Nav>
      </ModalWrapper>
    </>
  );
};

const Trigger = styled(UnstyledButton)`
  position: fixed;
  z-index: 10001;
  right: 32px;
  width: 40px;
  height: 40px;

  @media ${(p) => p.theme.breakpoints.desktop} {
    display: none;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
`;

const Backdrop = styled(UnstyledButton)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: var(--color-blurred-background);
  backdrop-filter: blur(8px);

  @media (prefers-reduced-motion: no-preference) {
    transition: opacity 500ms;
  }
`;

const Nav = styled.nav`
  position: absolute;
  left: 0;
  bottom: 100px;
  width: 75%;
  height: 75%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background: var(--color-text);
  color: var(--color-background); */
`;

const NavLink = styled(Link)`
  display: block;
  position: relative;
  padding: 16px;
  padding-left: 32px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  font-size: 28px;

  &.active {
    color: var(--color-primary);
  }

  &:focus {
    outline: 2px auto var(--color-primary);
    outline-offset: 2px;
  }
`;

const NavLinkChild = styled(NavLink)`
  font-size: 22px;
  padding: 16px;
  margin-top: -16px;
  padding-left: 64px;
`;

const Top = styled.div``;
const Bottom = styled.div`
  display: flex;
  padding-left: 30px;
`;

export default MobileNav;
