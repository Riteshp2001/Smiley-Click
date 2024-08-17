import React from 'react';
import styled from 'styled-components';
import { Link as LinkIcon } from 'react-feather';

import Heading from '@/components/Heading';
import VisuallyHidden from '@/components/VisuallyHidden';

const ContentHeading = ({ children, id, ...delegated }) => {
  // The ID has some random characters at the end, so that headings
  // with equivalent content still have unique IDs.
  // But! Sometimes, I want to link to a specific heading in my
  // blog posts / course platform. So, I need to include a
  // secondary anchor, using the “raw” id.
  //
  // This does mean that it will mean that there are duplicate IDs
  // sometimes, but because I'm not using them as the primary
  // mechanism (for the table of contents), I think it's fine?
  const rawId = getRawId(id);

  return (
    <Wrapper id={rawId}>
      <Heading {...delegated} style={{ position: 'relative' }}>
        <Anchor name={id} id={id} href={`#${id}`}>
          <IconElement size={24} />
          <VisuallyHidden>Link to this heading</VisuallyHidden>
        </Anchor>

        {children}
      </Heading>
    </Wrapper>
  );
};

const getRawId = (id = '') => {
  const segments = id.split('-');

  return segments.slice(0, segments.length - 1).join('-');
};

const Wrapper = styled.div`
  position: relative;

  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    scroll-margin-top: 128px;
  }
`;

const Anchor = styled.a`
  display: none;
  pointer-events: none;

  &:focus {
    outline: none;
  }

  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    transform: translateX(-150%);
    transition: opacity 250ms;
    opacity: 0;
    scroll-margin-top: 128px;

    ${Wrapper}:hover &,
    &:focus {
      opacity: 0.75;
    }
  }
`;

const IconElement = styled(LinkIcon)`
  pointer-events: auto;
  opacity: ${(p) => (p.hide ? 0 : 1)};

  ${Anchor}:focus & {
    outline: 2px auto var(--color-primary);
  }
`;

export default ContentHeading;
