import React from 'react';
import styled from 'styled-components';
import { LiveProvider, LiveEditor } from 'react-live';

import { syntaxTheme } from '@/helpers/syntax.helpers';
import { BaseWrapper } from '../Sidenote';

import StaticCodeWrapper from './StaticCodeWrapper';
import { LINE_HEIGHT } from './constants';

const StaticCodeSnippet = ({
  code,
  lang,
  highlightedLines = [],
  secretLive,
  clampMaxHeight,
  CodeWrapper = StaticCodeWrapper,
}) => {
  const Component = secretLive ? SecretLiveEditor : InertEditor;

  return (
    <LiveProvider
      code={code}
      mountStylesheet={false}
      theme={syntaxTheme}
      disabled={!secretLive}
      noInline={!secretLive}
    >
      <CodeWrapper
        code={code}
        lang={lang}
        clampMaxHeight={clampMaxHeight}
      >
        {highlightedLines.map(([start, end]) => {
          // Allow for a single highlighted line
          if (typeof end !== 'number') {
            end = start;
          }
          const EXTEND_BY = 2;
          const top = 32 + start * LINE_HEIGHT - EXTEND_BY;
          const height =
            (end - start + 1) * LINE_HEIGHT + EXTEND_BY * 2;

          return (
            <Highlight
              key={`${start}-${end}`}
              style={{ top, height }}
            />
          );
        })}

        <Component language={lang} />
      </CodeWrapper>
    </LiveProvider>
  );
};

const SecretLiveEditor = styled(LiveEditor)`
  width: 100%;
`;

const InertEditor = styled(LiveEditor)`
  overflow: unset !important;
  font-size: 1rem;

  /*
    The textarea is only needed for live-editable code.
    This is not one of those.
  */
  & textarea {
    display: none !important;
  }

  & pre {
    white-space: unset !important;
    word-break: unset !important;
    overflow-wrap: unset !important;
  }
`;

const Highlight = styled.span`
  display: block;
  position: absolute;
  z-index: 0;
  background: var(--syntax-highlight);
  left: 0;
  right: 0;
  width: 100%;
  opacity: 0.7;

  ${BaseWrapper} & {
    background: rgba(0, 0, 0, 0.15);
  }

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    bottom: -2px;
    width: 2px;
    background: var(--syntax-bool);
    border-radius: 0 4px 4px 0;
  }
`;

export default StaticCodeSnippet;
