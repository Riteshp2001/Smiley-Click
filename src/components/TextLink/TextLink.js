import React from 'react';
import styled from 'styled-components';

import Link from '../Link';
import {
  InfoSidenote,
  WarningSidenote,
  SuccessSidenote,
} from '../Sidenote';

const TextLink = ({ children, ...delegated }) => (
  <Wrapper {...delegated}>{children}</Wrapper>
);

const Wrapper = styled(Link)`
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);

  &:focus {
    outline: 2px auto var(--color-primary);
    outline-offset: 2px;
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }

  @media (hover: hover) {
    text-decoration: none;
    box-shadow: 0px 0px 0px var(--color-primary);

    &:hover {
      transition: 200ms box-shadow;

      box-shadow: 0px 2px 0px var(--color-primary);
    }

    ${InfoSidenote} & {
      color: var(--color-text);
      box-shadow: 0px 1px 0px var(--color-primary);
      font-weight: var(--font-weight-medium);

      &:hover {
        box-shadow: 0px 2px 0px var(--color-primary);
      }
    }

    ${WarningSidenote} & {
      color: var(--color-text);
      box-shadow: 0px 1px 0px var(--color-alert);

      &:hover {
        box-shadow: 0px 2px 0px var(--color-alert);
      }
    }

    ${SuccessSidenote} & {
      color: var(--color-text);
      box-shadow: 0px 1px 0px var(--color-success);

      &:hover {
        box-shadow: 0px 2px 0px var(--color-success);
      }
    }
  }
`;

export default TextLink;
