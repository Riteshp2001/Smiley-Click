import React from 'react';
import styled from 'styled-components';

import { MAX_NUM_OF_LIKES } from '@/constants';
import useForceUpdate from '@/hooks/use-force-update.hook';
import useSound from '@/hooks/use-sound.hook';
import { debounce } from '@/utils';

import LikeButton from '../LikeButton';
import LikeButtonEffects from '../LikeButton/LikeButtonEffects';
import { AnalyticsContext } from '../AnalyticsContext';
import LikeCount from './LikeCount';

const updateDatabase = debounce((slug, userId, newNumOfLikes) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  fetch('/api/like-article', {
    method: 'POST',
    body: JSON.stringify({
      slug,
      userId,
      numLikes: newNumOfLikes,
    }),
  });
}, 500);

const ContentLikeButton = React.memo(
  ({ slug, userId, playPop, playFill }) => {
    const forceUpdate = useForceUpdate();
    const [numOfMyLikes, setNumOfMyLikes] = React.useState(0);
    const [numOfOtherLikes, setNumOfOtherLikes] = React.useState(
      undefined
    );

    React.useEffect(() => {
      fetch(`/api/get-article-likes?slug=${slug}&userId=${userId}`)
        .then((res) => res.json())
        .then((json) => {
          if (typeof json.totalNumLikes === 'number') {
            setNumOfMyLikes(json.totalNumLikesFromUser);
            setNumOfOtherLikes(
              json.totalNumLikes - json.totalNumLikesFromUser
            );
          }
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isLoading = typeof numOfOtherLikes === 'undefined';

    if (isLoading) {
      return null;
    }

    const numOfLikes = numOfMyLikes + numOfOtherLikes;

    return (
      <Wrapper>
        <LikeButtonEffects size={48} numOfMyLikes={numOfMyLikes} />
        <LikeButton
          size={48}
          numOfMyLikes={numOfMyLikes}
          onLike={() => {
            if (numOfMyLikes < MAX_NUM_OF_LIKES) {
              const newNumOfLikes = numOfMyLikes + 1;

              setNumOfMyLikes(newNumOfLikes);
              updateDatabase(slug, userId, newNumOfLikes);

              playFill({
                playbackRate:
                  (newNumOfLikes - 1) / (MAX_NUM_OF_LIKES - 1) + 0.9,
              });

              if (newNumOfLikes === MAX_NUM_OF_LIKES) {
                playPop();
              }
            }
          }}
          onMaxLike={forceUpdate}
          onUnlike={() => {
            if (numOfMyLikes > 0) {
              const newNumOfLikes = numOfMyLikes - 1;

              setNumOfMyLikes(newNumOfLikes);
              updateDatabase(slug, userId, newNumOfLikes);

              playFill({
                playbackRate:
                  (newNumOfLikes - 1) / (MAX_NUM_OF_LIKES - 1) + 0.9,
              });
            }
          }}
        />
        {typeof numOfLikes === 'number' && (
          <LikeCount
            numOfMyLikes={numOfMyLikes}
            numOfLikes={numOfLikes}
          />
        )}
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  position: relative;
  margin-top: 16px;
  margin-bottom: 48px;
  display: flex;
  align-items: center;
`;

const ConnectedContentLikeButton = ({ slug }) => {
  const { userId } = React.useContext(AnalyticsContext);
  const [playFill] = useSound('/sounds/glug-b.mp3', {
    interrupt: true,
    volume: 0.25,
  });
  const [playPop] = useSound('/sounds/pop.mp3', { volume: 0.5 });

  return (
    <ContentLikeButton
      slug={slug}
      userId={userId}
      playFill={playFill}
      playPop={playPop}
    />
  );
};

export default ConnectedContentLikeButton;
