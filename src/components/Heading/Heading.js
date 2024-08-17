import React from 'react';
import styled from 'styled-components';

const Heading = ({
  type = 'medium-title',
  renderAs,
  ...delegated
}) => {
  let Component;
  if (type === 'section-title') {
    Component = SectionTitle;
  } else if (type === 'small-title') {
    Component = SmallTitle;
  } else if (type === 'medium-title') {
    Component = MediumTitle;
  } else if (type === 'large-title') {
    Component = LargeTitle;
  } else if (type === 'major-heading') {
    Component = MajorHeading;
  } else if (type === 'normal-heading') {
    Component = NormalHeading;
  } else if (type === 'minor-heading') {
    Component = MinorHeading;
  } else {
    throw new Error('Unrecognized Heading type: ' + type);
  }

  return <Component as={renderAs} {...delegated} />;
};

const SectionTitle = styled.h1`
  font-size: calc(16 / 16 * 1rem);
  color: var(--color-secondary);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SmallTitle = styled.h1`
  font-size: calc(22 / 16 * 1rem);
  color: var(--color-gray-1000);
`;
const MediumTitle = styled.h1`
  font-size: calc(28 / 16 * 1rem);
  color: var(--color-gray-1000);
  line-height: 1.2;
`;
const LargeTitle = styled.h1`
  font-size: calc(38 / 16 * 1rem);
  color: var(--color-gray-1000);
`;

const MajorHeading = styled.h2`
  font-size: calc(32 / 16 * 1rem);
  color: var(--color-tertiary);
  margin-top: 96px;
  margin-bottom: 32px;
`;
const NormalHeading = styled.h3`
  font-size: calc(25 / 16 * 1rem);
  color: var(--color-gray-900);
  margin-top: 64px;
  margin-bottom: 12px;
`;
const MinorHeading = styled.h4`
  font-size: calc(20 / 16 * 1rem);
  color: var(--color-gray-900);
  margin-top: 24px;
  margin-bottom: 12px;
`;

export default Heading;
