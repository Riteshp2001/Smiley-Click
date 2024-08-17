import styled from 'styled-components';

import { BaseWrapper } from '../Sidenote';
import { Wrapper as SpeechBubbleWrapper } from '../SpeechBubble';

export default styled.p`
  font-size: calc(19 / 16 * 1rem);
  text-wrap: pretty;
  margin-bottom: 1.5rem;

  ${BaseWrapper} & {
    font-size: calc(17 / 16 * 1rem);
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ${SpeechBubbleWrapper} & {
    font-size: calc(17 / 16 * 1rem);
    margin-bottom: 1rem;
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    font-size: calc(18 / 16 * 1rem);
    margin-bottom: 1.5rem;
  }
`;
