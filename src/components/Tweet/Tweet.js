import React from 'react';
import TweetEmbed from 'react-tweet-embed';
import styled from 'styled-components';

import { clamp } from '@/utils';
import useWindowDimensions from '@/hooks/use-window-dimensions.hook';
import useInterval from '@/hooks/use-interval.hook';

import ClientOnly from '@/components/ClientOnly';
import Center from '@/components/Center';
import Spinner from '@/components/Spinner';

const Tweet = ({ id, body, author, ...delegated }) => {
  const windowDimensions = useWindowDimensions();
  const idealWidth = windowDimensions.width - 64;

  const width = clamp(idealWidth, 250, 450);

  const wrapperRef = React.useRef();

  const [status, setStatus] = React.useState('loading');
  const intervalLength = status === 'loading' ? 250 : null;

  useInterval(() => {
    // Check see if the tweet has loaded
    const [wrapperDiv] = wrapperRef.current.firstChild.childNodes;

    if (!wrapperDiv) {
      return;
    }

    setStatus('idle');
  }, intervalLength);

  return (
    <ClientOnly>
      <Wrapper
        ref={wrapperRef}
        style={{ opacity: status === 'loading' ? 0 : 1, width }}
      >
        <TweetEmbed id={id} options={{ ...delegated, width }} />
      </Wrapper>

      {status === 'loading' && (
        <Center padded>
          <Spinner />
        </Center>
      )}
    </ClientOnly>
  );
};

const Wrapper = styled.div`
  & iframe {
    width: ${p => p.width && `${p.width}px !important`};
  }
`;
const Author = styled.div`
  font-size: 18px;
  color: var(--color-gray-700);
  margin-top: 16px;
`;

export default Tweet;
