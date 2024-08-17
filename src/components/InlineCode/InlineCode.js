import styled from 'styled-components';

import { BaseWrapper } from '../Sidenote';

export default styled.code`
  position: relative;
  display: inline;
  font-family: var(--font-family-mono);
  font-size: 0.9em;
  letter-spacing: -0.5px;
  padding: 4.5px 6px;
  margin: 1px -1px;
  background: hsl(217deg 10% 50% / 0.17);
  border-radius: 3px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;

  ${BaseWrapper} & {
    padding: 1px 6px;
  }
`;
