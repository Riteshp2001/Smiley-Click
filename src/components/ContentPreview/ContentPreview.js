import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'react-feather';

import useDesktopState from '@/hooks/use-desktop-state';

import Heading from '../Heading';
import Spacer from '../Spacer';
import Link from '../Link';
import PoppingArrows from '../PoppingArrows';

const ContentPreview = ({
  title,
  subtitle,
  abstract,
  linkTo,
  externalLabel,
}) => {
  const [isHoveringOverCard, setIsHoveringOverCard] = useDesktopState(
    false
  );

  const isExternal = !!externalLabel;

  return (
    <Article>
      <LinkWrapper
        href={linkTo}
        onMouseEnter={() => setIsHoveringOverCard(true)}
        onMouseLeave={() => setIsHoveringOverCard(false)}
      >
        <Title type="small-title" renderAs="h3">
          {title}
          {isExternal && <StyledExternalLink size={18} />}
        </Title>
        {subtitle && <Subheading>{subtitle}</Subheading>}

        <Excerpt>{abstract}</Excerpt>

        <Spacer size={16} />

        <PoppingArrows shouldShowFirstArrow={isHoveringOverCard}>
          {isExternal ? `Read on ${externalLabel}` : 'Read more'}
        </PoppingArrows>
      </LinkWrapper>
    </Article>
  );
};

const Article = styled.article``;

const LinkWrapper = styled(Link)`
  position: relative;
  display: block;
  text-decoration: none;
  color: var(--color-text);
`;

const Title = styled(Heading)`
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-weight: var(--font-weight-bold);

  ${LinkWrapper}:hover & {
    color: var(--color-primary);
  }
`;

const Subheading = styled.h4`
  color: var(--color-gray-600);
  font-weight: var(--font-weight-medium);
  font-size: calc(17 / 16 * 1rem);
`;

const Excerpt = styled.p`
  font-size: 1rem;
  margin-top: 16px;
  white-space: pre-wrap;
  text-wrap: pretty;
`;

const StyledExternalLink = styled(ExternalLink)`
  color: var(--color-gray-500);
  transform: translateY(1.5px);
`;

export default ContentPreview;
