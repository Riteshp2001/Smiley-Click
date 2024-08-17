import React from 'react';
import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';
import {
  Info as InfoIcon,
  AlertTriangle as WarningIcon,
  CheckCircle as SuccessIcon,
  ChevronDown,
} from 'react-feather';

import { COLOR_SWAP_TRANSITION_DURATION } from '@/constants';
import useBoop from '@/hooks/use-boop.hook';

import UnstyledButton from '@/components/UnstyledButton';

const Sidenote = ({ type = 'info', title, children }) => {
  let Component;
  let Icon;
  if (type === 'info') {
    Component = InfoSidenote;
    Icon = InfoIcon;
  } else if (type === 'success') {
    Component = SuccessSidenote;
    Icon = SuccessIcon;
  } else if (type === 'warning') {
    Component = WarningSidenote;
    Icon = WarningIcon;
  } else {
    console.error(`Unrecognized Sidenote type: ${type}`);
    Component = InfoSidenote;
    Icon = InfoIcon;
  }

  const [showMoreStyle, showMoreTrigger] = useBoop({ y: 4 });

  const expandedElem = React.Children.toArray(children).find(
    (child) => {
      return child?.props?.originalType === 'expanded';
    }
  );

  const previewChildren = React.Children.toArray(children).filter(
    (child) => {
      return child?.props?.originalType !== 'expanded';
    }
  );

  const [isExpanded, setIsExpanded] = React.useState(!expandedElem);

  const expandedChildren = expandedElem?.props?.children;

  return (
    <Component>
      <IconWrapper>
        <Icon size={32} />
      </IconWrapper>
      {title && <Title>{title}</Title>}
      <Content>
        {previewChildren}
        {isExpanded ? (
          expandedChildren && <DropIn>{expandedChildren}</DropIn>
        ) : (
          <ShowMore
            onClick={() => setIsExpanded(true)}
            onMouseEnter={showMoreTrigger}
          >
            Show more{' '}
            <ShowMoreChevron style={showMoreStyle}>
              <ChevronDown size={20} />
            </ShowMoreChevron>
          </ShowMore>
        )}
      </Content>
    </Component>
  );
};

export const BaseWrapper = styled.aside`
  position: relative;
  padding-top: 24px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  font-size: 1rem;
  margin-top: 48px;
  margin-bottom: 64px;
  border-left: 3px solid;
  border-radius: 4px;
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;

  @media ${(p) => p.theme.breakpoints?.smAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
    margin-left: -12px;
    margin-right: -12px;
    border-radius: 2px;
  }

  @media (min-width: 686px) {
    margin-left: -32px;
    margin-right: -32px;
  }

  & > *:last-child {
    margin-bottom: 0 !important;
  }
`;

export const InfoSidenote = styled(BaseWrapper)`
  background: var(--color-muted);
  border-color: var(--color-info);
`;

export const SuccessSidenote = styled(BaseWrapper)`
  background: var(--color-success-background);
  border-color: var(--color-success);
`;

export const WarningSidenote = styled(BaseWrapper)`
  background: var(--color-alert-background);
  border-color: var(--color-alert);
`;

const Title = styled.strong`
  display: block;
  font-size: calc(17 / 16 * 1rem);
  margin-bottom: 8px;
  font-weight: var(--font-weight-bold);
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(calc(-50% - 1.5px), -50%);
  padding: 8px;
  background: var(--color-background);
  border-radius: 50%;
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;

  @media ${(p) => p.theme.breakpoints?.mdAndSmaller} {
    display: none;
  }

  svg {
    display: block;
  }

  ${InfoSidenote} & {
    color: var(--color-info);
  }
  ${SuccessSidenote} & {
    color: var(--color-success);
  }
  ${WarningSidenote} & {
    color: var(--color-alert);
    border-radius: 25% 25%;
    left: -1.5px;
  }
`;

const Content = styled.div`
  /* TODO: Figure out why 'max-width: 100%' doesn't work */
  max-width: calc(100vw - 98px);

  @media ${(p) => p.theme.breakpoints?.smAndSmaller} {
    max-width: calc(100vw - 40px);
  }
`;

const dropIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const DropIn = styled.div`
  will-change: transform;
  animation: ${dropIn} 350ms cubic-bezier(0, 0.66, 0.46, 0.98);

  & > *:last-child {
    margin-bottom: 0 !important;
  }
`;

const ShowMore = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
`;

const ShowMoreChevron = styled(animated.span)`
  display: block;
  height: 20px;
`;

export default Sidenote;
