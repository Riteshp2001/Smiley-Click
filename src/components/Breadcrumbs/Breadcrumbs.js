import React from 'react';
import styled from 'styled-components';
import { ChevronRight } from 'react-feather';

import Link from '../Link';

const Breadcrumbs = ({ children }) => {
  const childrenWithCarets = children.map((child, index) => [
    child,
    index < children.length - 1 && <Caret size={16} key={index} />,
  ]);
  return <Wrapper>{childrenWithCarets}</Wrapper>;
};

const Crumb = ({ href, children }) => {
  return <CrumbLink href={href}>{children}</CrumbLink>;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Caret = styled(ChevronRight)`
  color: var(--color-gray-400);
  pointer-events: none;
  margin: 0 8px;
`;

const CrumbLink = styled(Link)`
  font-size: 1rem;
  color: var(--color-gray-700);
  text-decoration: none;

  &:hover {
    color: var(--color-gray-1000);
  }
`;

Breadcrumbs.Crumb = Crumb;

export default Breadcrumbs;
