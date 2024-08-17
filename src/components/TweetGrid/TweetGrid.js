import React from 'react';
import styled from 'styled-components';

import Center from '@/components/Center';
import RenderWhenOnscreen from '@/components/RenderWhenOnscreen';

const TWEET_SIZE = 325;
const GAP = 16;

const TweetGrid = ({ children }) => {
  return (
    <Center padded>
      <RenderWhenOnscreen keepOnceShown={true}>
        {children}
      </RenderWhenOnscreen>
    </Center>
  );
};

export default TweetGrid;
