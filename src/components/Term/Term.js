import React from 'react';
import styled from 'styled-components';

import Tooltip from '@/components/Tooltip';

const PRESETS = {
  csswg:
    "CSS Working Group, the organization that maintains and advances the CSS language. They're the CSS version of the TC39, JavaScript's technical committee",
  'screen-reader':
    'A screen reader is software that parses the HTML of a page and reads its contents aloud, using a synthetic voice. Screen readers are used by folks who have poor or no vision, as well as by folks who have dyslexia or other reading disorders.',
  '!important':
    "This value can be appended to a CSS declaration to max-out its specificity. It's generally used as a last resort, something you should only use in desperate situations.",
  viewport:
    "The viewport is the part of the website that is currently visible. It's similar to “window”, except the term “window” can also include the browser UI (address bar, tabs, etc).",
  syntacticSugar:
    "“Syntactic sugar” describes alternative syntax that makes the language easier to read/write (“sweeter”). Typically, it's an abstraction that hides a less-tasty, more-complex underlying mechanism.",
};

const Term = ({ preset, definition, children }) => {
  return (
    <Tooltip
      content={
        <ContentWrapper>
          {PRESETS[preset] || definition}
        </ContentWrapper>
      }
      followCursor={false}
      placement="top"
      arrow={true}
      duration={0}
      delay={[250, 0]}
      interactive
      // `interactive` is necessary to allow the tooltip to be hovered over. But then it sometimes causes a layout bug, where content rearranges itself. Apparently this is because `interactive` stops using portals. This `appendTo` prop re-implements it.
      appendTo={() => document.body}
    >
      <Wrapper>
        {children}
        <Trigger>?</Trigger>
      </Wrapper>
    </Tooltip>
  );
};

const Wrapper = styled.span`
  display: inline-block;
  cursor: help;
  padding-right: 2px;
`;

const Trigger = styled.span`
  display: inline-block;
  font-size: 0.65em;
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
  transform: translate(10%, -30%);
`;

const ContentWrapper = styled.span`
  --color-primary: black;
`;

export default Term;
