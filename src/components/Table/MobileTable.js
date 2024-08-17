import React from 'react';
import styled from 'styled-components';

import { LIGHT_COLORS } from '@/constants';

import Link from '../Link';

const MobileTable = ({
  data,
  fields,
  headingLevel,
  ...delegated
}) => {
  // I'm making a lot of assumptions here about the shape of the data:
  // - first item in `fields` is the title
  // - second item is description
  //
  // A better solution would be to use a `role` prop on each field, so that
  // I can be more precise? But for now this works.

  const metadata = fields.slice(2);

  return (
    <Wrapper {...delegated}>
      {data.map((item) => (
        <ListItem key={item.slug}>
          <CardLink href={item.pathname}>
            <Title as={headingLevel}>{item[fields[0].key]}</Title>
            <Description>{item[fields[1].key]}</Description>
            <Metadata>
              {metadata.map((field) => (
                <li key={field.key}>
                  <strong>{field.label}:</strong> {item[field.key]}
                </li>
              ))}
            </Metadata>
          </CardLink>
        </ListItem>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 16px;
  list-style-type: none;

  @media ${(p) => p.theme.breakpoints.smAndLarger} {
    grid-template-columns: 1fr 1fr;
    margin-left: -16px;
    margin-right: -16px;
  }
  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    display: none;
  }
`;

const ListItem = styled.li``;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  color: ${LIGHT_COLORS.text};
  background-color: ${LIGHT_COLORS.background};
  box-shadow: 0 0.4px 0.5px -9px rgba(0, 0, 0, 0.039),
    0 0.9px 1.1px -9px rgba(0, 0, 0, 0.057),
    0 1.8px 2.1px -9px rgba(0, 0, 0, 0.07),
    0 3.1px 3.8px -9px rgba(0, 0, 0, 0.083),
    0 5.8px 7.1px -9px rgba(0, 0, 0, 0.101),
    0 14px 17px -9px rgba(0, 0, 0, 0.14), 0 0 15px rgba(0, 0, 0, 0.05);
  padding: 16px;
  border-radius: 8px;
  text-decoration: none;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 20px;
  color: var(--color-primary);
`;

const Description = styled.p`
  margin: 16px 0 24px;
  font-size: 1rem;
  flex: 1;
`;

const Metadata = styled.ul`
  padding: 8px 14px;
  border-radius: 4px;
  background-color: ${LIGHT_COLORS.muted};
  list-style-type: none;
  font-size: 14px;

  li:not(:last-of-type) {
    margin-bottom: 4px;
  }
`;

export default MobileTable;
