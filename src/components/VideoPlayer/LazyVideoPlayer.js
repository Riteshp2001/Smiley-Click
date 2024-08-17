import React from 'react';
import styled from 'styled-components';
import 'video.js/dist/video-js.css';

import Spinner from '@/components/Spinner';

const LazyVideoPlayer = (props) => {
  const [Component, setComponent] = React.useState(() => () => (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  ));

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      import('./VideoPlayer.js').then((Thing) =>
        setComponent(() => Thing.default)
      );
    }, 1500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return <Component {...props} />;
};

const SpinnerWrapper = styled.div`
  height: 250px;
  display: grid;
  place-content: center;
`;

export default LazyVideoPlayer;
