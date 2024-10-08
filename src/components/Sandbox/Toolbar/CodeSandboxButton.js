import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'react-feather';
import { UnstyledOpenInCodeSandboxButton } from '@/codesandbox/sandpack-react';

import VisuallyHidden from '@/components/VisuallyHidden';

import ActionButton from './ActionButton';

const CodeSandboxButton = () => {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <abbr title="Open in CodeSandbox">
      <Wrapper
        as={UnstyledOpenInCodeSandboxButton}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          opacity: isHovering ? 1 : 0.7,
        }}
      >
        <ExternalLink size={16} />
        <VisuallyHidden>Open in CodeSandbox</VisuallyHidden>
      </Wrapper>
    </abbr>
  );
};

const Wrapper = styled(ActionButton)`
  transform-origin: center center;
  transition: opacity 250ms;
`;

export default CodeSandboxButton;
