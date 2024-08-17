import React from 'react';
import styled from 'styled-components';

import Link from '../Link';

const NavItemChild = ({ href, children, ...delegated }) => {
  return (
    <WrapperLink href={href} {...delegated}>
      {children}
    </WrapperLink>
  );
};

const WrapperLink = styled(Link)`
  padding: 5px;
  text-decoration: none;
  color: #000;
  font-weight: var(--font-weight-light);
  font-size: 1rem;

  &.active {
    font-weight: var(--font-weight-bold);
  }

  &:hover {
    color: var(--color-primary);
  }
`;

export default NavItemChild;
