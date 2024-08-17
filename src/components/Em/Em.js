import styled from 'styled-components';

export default styled.em`
  font-family: var(--font-family-spicy);
  letter-spacing: -0.25px;
  color: ${(props) => props.color || 'inherit'};
  font-style: normal;
  font-weight: 400;

  .tippy-popper & {
    color: var(--color-background) !important;
  }
`;
