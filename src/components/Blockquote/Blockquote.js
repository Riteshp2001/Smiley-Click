import styled from 'styled-components';

const Blockquote = styled.blockquote`
  position: relative;
  font-style: italic;
  color: var(--color-gray-700);
  padding: 0 32px;
  margin-top: 48px;
  margin-bottom: 48px;
  width: fit-content;

  &::before {
    content: '“';
    font-family: 'Times New Roman', serif;
    font-size: 6em;
    font-weight: bold;
    position: absolute;
    left: -8px;
    top: 4px;
    opacity: 0.25;
  }
  &::after {
    content: '”';
    font-family: 'Times New Roman', serif;
    font-size: 6em;
    font-weight: bold;
    position: absolute;
    right: 0px;
    top: 4px;
    opacity: 0.25;
  }

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    padding: 0 2rem;
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    padding: 0 1rem;
  }
`;

export default Blockquote;
