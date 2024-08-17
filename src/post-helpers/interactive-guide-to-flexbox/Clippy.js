import React from 'react';
import styled from 'styled-components';

function Clippy() {
  return (
    <Wrapper
      alt="Clippy, the helpful paperclip assistant from Microsoft Word"
      src="/images/interactive-guide-to-flexbox/clippy.png"
    />
  );
}

const Wrapper = styled.img`
  width: 200px;
  float: right;
  margin-left: 24px;
  margin-right: -16px;
  transform: translateY(-16px);

  @media (max-width: 680px) {
    display: none;
  }
`;

export default Clippy;
