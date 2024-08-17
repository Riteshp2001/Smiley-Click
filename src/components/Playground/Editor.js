import React, { FC, Fragment } from 'react';
import SimpleEditor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import styled from 'styled-components';

import { syntaxTheme } from '@/helpers/syntax.helpers';
import { moveCursorWithinInput } from '@/utils';

import { ConfigContext } from '../ConfigContext';

const FONT_SIZE = 14;
const LINE_HEIGHT = 20;

function Editor({
  code,
  language,
  maxHeight,
  handleUpdate,
  handleFormat,
}) {
  const textareaRef = React.useRef(null);

  const { disableTabInCodeSnippets } = React.useContext(
    ConfigContext
  );

  function handleKeyDown(ev) {
    if (ev.metaKey && ev.key === 's') {
      const input = textareaRef.current._input;
      const cursorAt = input.selectionStart;

      ev.preventDefault();
      handleFormat();

      // NOTE: This doesn't actually work super well. It's off by a few positions. It's still better than doing nothing, since that always shoves the cursor to the very end, but it's not perfect.
      // Rather than fix, though, I should migrate to Sandpack, assuming the Static template stuff can be resolved.
      window.requestAnimationFrame(() => {
        moveCursorWithinInput(input, cursorAt);
      });
    }
  }

  return (
    <Wrapper style={{ '--max-height': maxHeight }}>
      <CodeEditor
        ref={textareaRef}
        value={code}
        onValueChange={handleUpdate}
        ignoreTabKey={disableTabInCodeSnippets}
        onKeyDown={handleKeyDown}
        highlight={(code) => (
          <Highlight
            {...defaultProps}
            // @ts-ignore
            theme={syntaxTheme}
            code={code}
            language={language}
          >
            {({
              className,
              style,
              tokens,
              getLineProps,
              getTokenProps,
            }) => (
              <>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </>
            )}
          </Highlight>
        )}
      />
    </Wrapper>
  );
}

const Wrapper = styled.label`
  max-height: var(--max-height);
  overflow: auto;
  flex: 1;
  /* Firefox scrollbars */
  scrollbar-color: var(--color-gray-300) var(--syntax-bg);
  scrollbar-width: thin;
`;

const CodeEditor = styled(SimpleEditor)`
  /* Update text-select color by setting primary */
  --color-primary: hsl(210deg 13% 50% / 0.25);

  background-color: var(--syntax-bg);
  color: var(--color-text);
  font-family: var(--font-family-mono);
  font-feature-settings: normal;
  padding: 16px;
  border-radius: 0px;
  font-size: ${FONT_SIZE}px;
  line-height: ${LINE_HEIGHT}px;

  & > textarea,
  & .token-line,
  & .token-line * {
    outline: none !important;
    font-size: ${FONT_SIZE}px !important;
    line-height: ${LINE_HEIGHT + 2}px !important;
  }
`;

export default Editor;
