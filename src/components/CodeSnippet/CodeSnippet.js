import React from 'react';
import styled from 'styled-components';

import { Wrapper as SideBySideCodeWrapper } from '../SideBySideCode';
import { BaseWrapper } from '../Sidenote';
import LazyLiveCodeSnippet from './LazyLiveCodeSnippet';
import LazyStaticCodeSnippet from './LazyStaticCodeSnippet';
import { LINE_HEIGHT } from './constants';

const defaultScope = { styled };

const CodeSnippet = ({
  children,
  inline,
  live,
  secretLive,
  highlight = [],
  clickToReveal,
  scope,
  split,
  lessBottomMargin,
  clampMaxHeight = true,
  className = 'language-null',
}) => {
  // The MDX parser turns "```jsx" into "className: 'language-jsx'".
  // We'll use a regex to pull out just the language itself (css, jsx)
  // so that we can get the correct syntax highlighting
  const [, lang] = className.match(/language-(.+)/);

  const highlightedLines =
    typeof highlight === 'string' ? JSON.parse(highlight) : highlight;

  const code = children.trim();

  const snippet = live ? (
    <LazyLiveCodeSnippet
      lang={lang}
      code={code}
      // Live-specific props
      inline={inline}
      scope={{ ...scope, ...defaultScope }}
      clickToReveal={clickToReveal}
      split={split}
    />
  ) : (
    <LazyStaticCodeSnippet
      lang={lang}
      code={code}
      secretLive={secretLive}
      // Static-specific props
      highlightedLines={highlightedLines}
      clampMaxHeight={clampMaxHeight === true}
    />
  );

  return (
    <OuterWrapper
      style={{ marginBottom: lessBottomMargin ? 40 : 80 }}
    >
      {snippet}
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  position: relative;
  margin-top: 48px;

  /*
    HACK: Update the code snippets
    to always feature line-height stuff
  */
  .token-line,
  [data-code-snippet='true'] textarea,
  [data-code-snippet='true'] pre {
    padding: 0 !important;

    @media ${(p) => p.theme.breakpoints.smAndSmaller} {
      font-size: 14px !important;
      line-height: ${LINE_HEIGHT}px !important;
    }

    @media ${(p) => p.theme.breakpoints.smAndLarger} {
      font-size: 1rem !important;
      line-height: ${LINE_HEIGHT}px !important;
    }
  }

  [data-code-snippet='true'] textarea {
    outline-offset: 32px;
  }

  ${SideBySideCodeWrapper} & {
    margin-top: 0;
    margin-bottom: 48px;
  }

  ${BaseWrapper} & {
    margin-bottom: 24px;
  }

  textarea::selection {
    background-color: hsla(0deg, 0%, 50%, 0.2);
  }
`;

export default CodeSnippet;
