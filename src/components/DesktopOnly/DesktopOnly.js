import styled from 'styled-components';

const DesktopOnly = styled.div`
  @media ${(p) =>
      p.breakpoint === 'small'
        ? p.theme.breakpoints.mdAndSmaller
        : p.theme.breakpoints.lgAndSmaller} {
    display: none;
  }
`;

export default DesktopOnly;
