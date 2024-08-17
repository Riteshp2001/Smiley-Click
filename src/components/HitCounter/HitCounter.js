import React from 'react';
import RetroHitCounter from 'react-retro-hit-counter';
import styled from 'styled-components';

import useToggle from '@/hooks/use-toggle.hook';
import useSound from '@/hooks/use-sound.hook';

import UnstyledButton from '../UnstyledButton';

const HitCounter = ({ hits }) => {
  const [isOn, toggleOn] = useToggle(false);

  const [playPress, { stop: pausePress }] = useSound(
    '/sounds/pop-down.mp3',
    {
      volume: 0.25,
    }
  );
  const [playOn] = useSound('/sounds/pop-up-on.mp3', {
    volume: 0.25,
  });
  const [playOff] = useSound('/sounds/pop-up-off.mp3', {
    volume: 0.25,
  });

  function toggleCounter() {
    pausePress();

    if (isOn) {
      playOff();
    } else {
      playOn();
    }

    toggleOn();
  }

  return (
    <Wrapper>
      <Button
        onMouseDown={playPress}
        onMouseUp={toggleCounter}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            toggleCounter();
          }
        }}
        style={{
          border: isOn ? 'none' : '5px solid var(--color-gray-100)',
        }}
        aria-label={`Retro-style hit counter, showing that ${hits} ${
          hits === 1 ? 'person has' : 'people have'
        } visited this page.`}
      >
        <RetroHitCounter
          hits={hits}
          /* The following are all default values: */
          withBorder={isOn}
          withGlow={isOn}
          minLength={6}
          size={22}
          padding={3}
          digitSpacing={2}
          segmentThickness={2}
          segmentSpacing={0.5}
          segmentActiveColor={
            isOn ? '#76FF03' : 'var(--color-gray-400)'
          }
          segmentInactiveColor={isOn ? '#315324' : 'transparent'}
          backgroundColor={isOn ? '#222222' : 'var(--color-gray-100)'}
          borderThickness={5}
          glowStrength={0.5}
        />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 98px;
  margin-right: -5px;
`;

const Button = styled(UnstyledButton)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  & > div {
    display: block !important;
  }

  & svg {
    max-width: revert !important;
  }
`;

export default HitCounter;
