import React from 'react';
import styled from 'styled-components';

import { CATEGORIES } from '@/helpers/category.helpers';
import useSound from '@/hooks/use-sound.hook';
import useOnScroll from '@/hooks/use-on-scroll.hook';
import useOnClickOutside from '@/hooks/use-on-click-outside.hook';

import NavItem from './NavItem';
import NavItemChild from './NavItemChild';

const Navigation = (props) => {
  // HACK: Right now, I know I only have 1 navItem with children.
  // I'd need to refactor lots if there were multiple children w/ dropdowns.
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(
    false
  );
  const [playMenuOpen] = useSound('/sounds/menu-open.mp3', {
    volume: 0.6,
  });

  const tutorialListRef = React.useRef();

  const toggleDropdown = (isVisible) => {
    if (isVisible) {
      playMenuOpen();
    }

    setIsDropdownVisible(isVisible);
  };

  const handleScroll = React.useCallback(() => {
    if (isDropdownVisible) {
      setIsDropdownVisible(false);
    }
  }, [isDropdownVisible, setIsDropdownVisible]);

  useOnScroll(handleScroll);

  useOnClickOutside(tutorialListRef, () => {
    if (isDropdownVisible) {
      setIsDropdownVisible(false);
    }
  });

  return (
    <Wrapper {...props} aria-label="desktop navigation">
      <List>
        <ListItem>
          <NavItem
            label="Latest"
            href="/latest/"
            size="short"
          ></NavItem>
        </ListItem>
        <ListItem>
          <TutorialNav
            ref={tutorialListRef}
            toggleDropdown={toggleDropdown}
            isDropdownVisible={isDropdownVisible}
            categories={CATEGORIES}
          />
        </ListItem>

        <ListItem>
          <NavItem
            label="Goodies"
            href="/goodies/"
            size="long"
            setIsDropdownVisible={setIsDropdownVisible}
          />
        </ListItem>
        <ListItem>
          <NavItem
            label="Courses"
            href="/courses/"
            size="medium"
            id="after-child-nav"
            setIsDropdownVisible={setIsDropdownVisible}
          />
        </ListItem>
      </List>
    </Wrapper>
  );
};

const TutorialNav = React.forwardRef(
  ({ toggleDropdown, isDropdownVisible, categories }, ref) => {
    return (
      <NavItem
        ref={ref}
        label="Posts"
        href="/tutorials/"
        size="medium"
        id="before-child-nav"
        includesDropdown={true}
        isDropdownVisible={isDropdownVisible}
        toggleDropdown={toggleDropdown}
      >
        {isDropdownVisible &&
          categories.map((category, index) => {
            const isFirst = index === 0;
            const isLast = index === categories.length - 1;
            return (
              <NavItemChild
                key={category.slug}
                id={isFirst ? 'first-child-in-nav' : undefined}
                href={`/tutorials/${category.slug}/`}
                onClick={() => toggleDropdown()}
                onKeyDown={(ev) => {
                  // Shift-tab on thevery first item should take us
                  // to the previous item, and close the dropdown.
                  if (isFirst && ev.key === 'Tab' && ev.shiftKey) {
                    ev.preventDefault();
                    document
                      .querySelector('#before-child-nav')
                      .focus();
                    toggleDropdown();
                  } else if (
                    isLast &&
                    ev.key === 'Tab' &&
                    !ev.shiftKey
                  ) {
                    ev.preventDefault();
                    document
                      .querySelector('#after-child-nav')
                      .focus();
                    toggleDropdown();
                  }
                }}
              >
                <ChildContents>{category.name}</ChildContents>
              </NavItemChild>
            );
          })}
      </NavItem>
    );
  }
);

const Wrapper = styled.nav`
  display: flex;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
`;

const ListItem = styled.li`
  margin: 10px;
`;

const ChildContents = styled.div`
  display: flex;
  align-items: center;
`;

export default Navigation;
