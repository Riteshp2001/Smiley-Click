import styled from 'styled-components';

function MaxWidthWrapper({ maxWidth = '1100px', ...delegated }) {
  if (typeof maxWidth === 'number') {
    maxWidth = `${maxWidth}px`;
  }
  return <Wrapper $maxWidth={maxWidth} {...delegated} />;
}

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: ${(p) => p.$maxWidth};
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export default MaxWidthWrapper;
