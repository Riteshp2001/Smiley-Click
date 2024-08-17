import React from 'react';
import styled from 'styled-components';

const EggheadEmbed = ({ slug }) => {
  const embedSrc = `https://egghead.io/lessons/${slug}/embed?af=49agrw`;

  return (
    <Wrapper>
      <Iframe frameBorder="0" allowFullScreen src={embedSrc} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default EggheadEmbed;
