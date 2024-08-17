import React from 'react';
import styled from 'styled-components';
import { Volume2 } from 'react-feather';

import useSound from '@/hooks/use-sound.hook';

import UnstyledButton from '../UnstyledButton';

const InlineSFX = ({ src }) => {
  const [playSound] = useSound(src);

  const handleClick = () => {
    playSound({ override: true });
  };

  return (
    <Wrapper onClick={handleClick}>
      <Volume2 size={16} />
    </Wrapper>
  );
};

const Wrapper = styled(UnstyledButton)`
  font-size: inherit;
  display: inline-block;
  color: var(--color-tertiary);
  padding: 0px 5px;
`;

export default InlineSFX;
