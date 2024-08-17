import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { ArrowRight, Star } from 'react-feather';

import { TIGHT_SPRING } from '@/constants';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion.hook';

import {
  InfoSidenote,
  WarningSidenote,
  SuccessSidenote,
} from '../Sidenote';

const ListContext = React.createContext();

const DefaultIcon = () => <ArrowRight size={20} />;
const FullStarIcon = () => <Star size={20} />;

const ICONS = {
  default: DefaultIcon,
  fullStar: FullStarIcon,
};

const ListItem = ({
  bullet = 'default',
  animated,
  children,
  ...delegated
}) => {
  const { type } = React.useContext(ListContext);

  const prefersReducedMotion = usePrefersReducedMotion();

  const IconComponent = ICONS[bullet];
  const [isHovering, setIsHovering] = React.useState(false);

  const iconSpring = useSpring(
    animated && !prefersReducedMotion
      ? {
          transform: isHovering
            ? `translateY(5px) translateX(8px)`
            : `translateY(5px) translateX(0px)`,
          config: TIGHT_SPRING,
        }
      : { transform: 'translateY(5px)' }
  );

  if (type === 'original') {
    return <li>{children}</li>;
  }

  if (type === 'ordered') {
    return (
      <Wrapper {...delegated}>
        <ListItemContents>{children}</ListItemContents>
      </Wrapper>
    );
  }

  return (
    <Wrapper {...delegated}>
      <IconWrapper style={iconSpring}>
        <IconComponent />
      </IconWrapper>
      {/*
        This interaction is purely decorative, and is not required for
        folks using the keyboard or a screen-reader.
      */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <ListItemContents
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {children}
      </ListItemContents>
    </Wrapper>
  );
};

const List = ({ type = 'unordered', ...delegated }) => {
  return (
    <ListContext.Provider value={{ type }}>
      {type === 'ordered' && <OrderedListElem {...delegated} />}
      {type === 'unordered' && <UnorderedListElem {...delegated} />}
      {type === 'original' && <OriginalOrderedList {...delegated} />}
    </ListContext.Provider>
  );
};

const OriginalOrderedList = styled.ol`
  padding-left: 22px;
  margin-bottom: 32px;
  font-size: calc(19 / 16 * 1rem);

  li {
    margin-bottom: 16px;
  }
`;

const UnorderedListElem = styled.ul`
  font-size: calc(19 / 16 * 1rem);
  margin-bottom: 32px;
  list-style: none;

  /* For nested list items, add top margin as well */
  ul & {
    margin-top: 16px;
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    font-size: calc(18 / 16 * 1rem);
    margin-bottom: 1.5rem;
  }
`;

const OrderedListElem = styled.ol`
  --counter-name: counts;

  font-size: calc(19 / 16 * 1rem);
  margin-bottom: 32px;
  counter-reset: var(--counter-name);
  list-style: none;
  padding-left: 16px;

  & li {
    counter-increment: var(--counter-name);
    align-items: baseline;
  }

  & li::before {
    content: counters(var(--counter-name), '.') '. ';
    font-feature-settings: 'tnum';
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
    padding-right: 12px;
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    font-size: calc(18 / 16 * 1rem);
    margin-bottom: 1.5rem;
  }
`;

const Wrapper = styled.li`
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${InfoSidenote} &, ${WarningSidenote} &, ${SuccessSidenote} & {
    font-size: calc(17 / 16 * 1rem);
    margin-bottom: 8px;
  }
`;

const ListItemContents = styled.div`
  flex: 1;
`;

const IconWrapper = styled(animated.span)`
  display: flex;
  align-items: center;
  padding-right: 16px;
  padding-top: 0;
  color: var(--color-primary);

  ${WarningSidenote} & {
    color: var(--color-text);
  }
`;

List.ListItem = ListItem;

export default List;
