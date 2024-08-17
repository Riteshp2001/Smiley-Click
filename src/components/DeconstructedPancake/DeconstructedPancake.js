import React from 'react';
import styled from 'styled-components';

const DeconstructedPancake = ({ colWidth, children }) => {
  const wrappedKids = React.Children.toArray(children).map(
    (child, index) => (
      <ChildWrapper
        key={index}
        style={{ '--col-width': colWidth + 'px' }}
      >
        {child}
      </ChildWrapper>
    )
  );
  return <Wrapper>{wrappedKids}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 64px;
  margin-bottom: 32px;
  max-width: 100%;
  /* HACK: this shouldn't be here */
  filter: drop-shadow(0px 2px 4px hsl(0deg 0% 0% / 0.1))
    drop-shadow(0px 4px 8px hsl(0deg 0% 0% / 0.1))
    drop-shadow(0px 8px 16px hsl(0deg 0% 0% / 0.1))
    drop-shadow(0px 16px 32px hsl(0deg 0% 0% / 0.1));
`;

const ChildWrapper = styled.div`
  flex: 0 1 100%;
  max-width: 400px;
  margin-bottom: 32px;

  @media (min-width: 1084px) {
    flex: 1;
  }
`;

export default DeconstructedPancake;
