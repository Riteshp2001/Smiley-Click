/**
 * Not-super-generic SpeechBubble.
 * Makes assumptions about where the tip is.
 */
import React from 'react';
import styled from 'styled-components';

import { LIGHT_COLORS } from '@/constants';

import UnstyledButton from '@/components/UnstyledButton';
import SpeechBubble from '@/components/SpeechBubble';
import Paragraph from '@/components/Paragraph';

const PromptBubble = ({
  isVisible,
  width,
  hoverConfirm,
  clearHover,
  handleConfirm,
  handleDeny,
  style = {},
  showDelay = 0,
}) => {
  const primaryButton = React.useRef(null);

  React.useEffect(() => {
    if (isVisible) {
      primaryButton.current.focus();
    }
  }, [isVisible]);

  return (
    <SpeechBubble
      isVisible={isVisible}
      width={width}
      style={style}
      showDelay={showDelay}
    >
      <Paragraph>
        Hi friend! Hope I didn't startle you. Can I let you know about
        my newsletter?
      </Paragraph>

      <ButtonGroup>
        <Button
          ref={primaryButton}
          onClick={handleConfirm}
          onMouseEnter={hoverConfirm}
          onMouseLeave={clearHover}
          data-cy="speech-bubble-accept"
          style={{
            color: LIGHT_COLORS.secondary,
          }}
        >
          Sure!
        </Button>
        <Button onClick={handleDeny} data-cy="speech-bubble-deny">
          No thanks
        </Button>
      </ButtonGroup>
    </SpeechBubble>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  margin-left: -16px;
  margin-bottom: -8px;
`;

const Button = styled(UnstyledButton)`
  padding: 12px 16px;
  background: transparent;
  border-radius: 16px;
  font-weight: var(--font-weight-medium);

  &:not(:last-of-type) {
    margin-right: 8px;
  }

  &:hover {
    background: ${LIGHT_COLORS.gray[100]};
  }
`;

export default PromptBubble;
