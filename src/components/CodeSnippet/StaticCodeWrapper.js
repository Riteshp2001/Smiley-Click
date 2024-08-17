import React from 'react';
import styled from 'styled-components';

import useWindowDimensions from '@/hooks/use-window-dimensions.hook';

import { Wrapper as SideBySideCodeWrapper } from '../SideBySideCode';
import { BaseWrapper, InfoSidenote } from '../Sidenote';

import { LINE_HEIGHT } from './constants';
import Skeleton from './Skeleton';

const StaticCodeWrapper = ({
  code,
  lang,
  clampMaxHeight,
  children,
}) => {
  const windowDimensions = useWindowDimensions();

  const numOfLines = code.split('\n').length;

  // It's not exactly right; it's 32px too small on desktop.
  // But it's close enough.
  let windowHeight = windowDimensions.height || 0;

  const estimatedHeight = LINE_HEIGHT * numOfLines + 32;

  const minHeight = clampMaxHeight
    ? Math.min(estimatedHeight, windowHeight * 0.75)
    : estimatedHeight;

  let renderedChildren = children;
  if (!renderedChildren) {
    renderedChildren = <Skeleton />;
  }

  return (
    <>
      {lang !== 'null' && <Language>{lang}</Language>}
      <Wrapper
        data-code-snippet="true"
        translate="no"
        style={{
          minHeight,
          maxHeight: clampMaxHeight ? '75vh' : undefined,
        }}
      >
        {renderedChildren}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  font-family: var(--font-family-mono);
  font-size: 18px;
  outline-offset: 2px;
  overflow: auto;
  margin-left: -32px;
  margin-right: -32px;
  padding: 32px;
  background: var(--syntax-bg);

  ${BaseWrapper} & {
    margin-left: unset;
    margin-right: unset;
    background: rgba(0, 0, 0, 0.05);
  }

  html[data-color-mode='dark'] ${InfoSidenote} & {
    background: hsl(217deg 10% 50% / 0.1);
  }

  ${SideBySideCodeWrapper} & {
    margin-left: 0;
    margin-right: 0;
    box-shadow: 0px 0px 35px 35px var(--color-background);
  }

  & > div {
    overflow: visible !important;
  }

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    /*
      NOTE: For some reason, the parent has a default width of >100%. If I set this to 100% instead of 100vw, it causes
      the layout to break. Not sure why :/
    */
    width: calc(100vw);

    ${BaseWrapper} & {
      width: 100%;
    }
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    flex-direction: column;
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    margin-left: -16px;
    margin-right: -16px;
    padding: 32px 16px;

    ${BaseWrapper} & {
      width: calc(100% + 32px);
      margin-left: -16px;
      margin-right: -16px;
      background: rgba(0, 0, 0, 0.05);
    }
  }

  @media ${(p) => p.theme.breakpoints.smAndLarger} {
    border-radius: 6px;
    max-width: calc(100% + 64px);
  }
`;

const Language = styled.div`
  position: absolute;
  z-index: 2;
  top: 0px;
  right: 14px;
  transform: translateY(-100%);
  font-size: 18px;
  padding: 2px 12px 0px;
  background: var(--syntax-bg);
  border-radius: 8px 8px 0 0;
  text-transform: uppercase;
  color: var(--color-gray-700);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family);
  pointer-events: none;

  ${BaseWrapper} & {
    background: rgba(0, 0, 0, 0.05);
  }

  html[data-color-mode='dark'] ${InfoSidenote} & {
    background: hsl(217deg 10% 50% / 0.1);
  }
`;

export default StaticCodeWrapper;
