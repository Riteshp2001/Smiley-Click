import React from 'react';
import styled from 'styled-components';

import UnstyledButton from '../UnstyledButton';
import Tooltip from '../Tooltip';

const Asterisk = ({ content, ...delegated }) => {
  return (
    <Wrapper>
      <Tooltip
        content={<ContentWrapper>{content}</ContentWrapper>}
        placement="top"
        animation="scale-subtle"
        theme="material"
        arrow={true}
        duration={200}
        delay={[250, 0]}
        {...delegated}
      >
        <TouchArea>
          <AsteriskGlyph>*</AsteriskGlyph>
        </TouchArea>
      </Tooltip>
    </Wrapper>
  );
};

export const ContentWrapper = styled.div`
  font-size: 1rem;
  line-height: 1.5;
`;

export const Wrapper = styled.span`
  display: inline-block;
  width: 9px;
  height: 1em;
  position: relative;
`;

const AsteriskGlyph = styled.span`
  position: relative;
  font-size: 21px;
  font-weight: var(--font-weight-medium);
  color: var(--color-secondary);
`;

const TouchArea = styled(UnstyledButton)`
  position: absolute;
  display: block;
  top: -19px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  padding: 10px;
  transform: translateY(5px);
  cursor: pointer;
`;

export default Asterisk;
