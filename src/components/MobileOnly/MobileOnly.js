import styled from 'styled-components';

// prettier-ignore
const MobileOnly = styled.div`
  @media ${(p) =>
      p.breakpoint === 'extra-small'
        ? p.theme.breakpoints.smAndLarger
        : p.breakpoint === 'small'
          ? p.theme.breakpoints.mdAndLarger
          : p.theme.breakpoints.lgAndLarger
  } {
    display: none;
  }
`;

export default MobileOnly;
