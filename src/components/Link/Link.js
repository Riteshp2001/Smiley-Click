import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';

const Link = ({ href = '', target, rel, ...delegated }) => {
  // There are three types of links:
  // - Internal links to other pages within the same app
  // - External links, to other domains
  // - Hash links (#introduction), for the same page.
  let linkType;

  if (href.match(/^#/)) {
    linkType = 'hash';
  } else if (href.match(/(^http|^mailto)/i) || target === '_blank') {
    linkType = 'external';
  } else {
    linkType = 'internal';
  }

  // By default, external links should open in a new tab.
  // This is overrideable though.
  if (typeof target === 'undefined') {
    target = linkType === 'external' ? '_blank' : undefined;
  }

  const safeRel = target === '_blank' ? 'noopener noreferrer' : rel;

  const link = (
    <StyledLink
      as={linkType === 'internal' ? NextLink : 'a'}
      href={href}
      rel={safeRel}
      target={target}
      {...delegated}
    />
  );

  return link;
};

const StyledLink = styled.a`
  color: var(--color-primary);

  &:focus {
    outline: 2px auto var(--color-primary);
    outline-offset: 2px;
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;

export default Link;
