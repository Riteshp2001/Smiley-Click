import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import useSound from '@/hooks/use-sound.hook';

const BORDER_WIDTH = 2;

const Checkbox = ({ size = 18, checked, label, onChange }) => {
  const [active, setActive] = React.useState(false);

  const springConfig = {
    tension: 400,
    friction: 22,
    clamp: !checked,
  };

  const filledScale = checked ? (active ? 1.4 : 1) : 0;
  const filledSpring = useSpring({
    transform: `scale(${filledScale})`,
    config: springConfig,
  });

  const outlineScale = active ? 0.8 : 1;
  const outlineSpring = useSpring({
    transform: `scale(${outlineScale})`,
    config: springConfig,
  });

  const [playActive] = useSound('/sounds/pop-down.mp3', {
    volume: 0.25,
  });
  const [playOn] = useSound('/sounds/pop-up-on.mp3', {
    volume: 0.25,
  });
  const [playOff] = useSound('/sounds/pop-up-off.mp3', {
    volume: 0.25,
  });

  return (
    <Wrapper>
      <RealCheckbox
        onMouseDown={() => {
          setActive(true);
          playActive();
        }}
        onMouseUp={() => {
          setActive(false);

          if (checked) {
            playOff();
          } else {
            playOn();
          }
        }}
        onChange={onChange}
      />
      <VisibleContents>
        <VisibleBox
          style={{ width: size, height: size, ...outlineSpring }}
        >
          <Filled style={filledSpring} />
        </VisibleBox>

        {label && <Text>{label}</Text>}
      </VisibleContents>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const RealCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const VisibleContents = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const VisibleBox = styled(animated.div)`
  position: relative;
  border: ${BORDER_WIDTH}px solid var(--color-gray-700);
  border-radius: 4px;
  margin-right: 8px;

  ${RealCheckbox}:hover + ${VisibleContents} & {
    border-color: var(--color-gray-1000);
  }

  ${RealCheckbox}:focus.focus-visible + ${VisibleContents} & {
    outline: 2px auto var(--color-primary);
    outline-offset: 2px;
  }
`;

const Filled = styled(animated.div)`
  position: absolute;
  z-index: 1;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: var(--color-primary);
  border-radius: 2px;
`;

const Text = styled.span`
  font-size: 1rem;
  font-family: var(--font-family);
  color: var(--color-gray-700);
`;

export default Checkbox;
