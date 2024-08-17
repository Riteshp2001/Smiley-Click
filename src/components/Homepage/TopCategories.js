import React from 'react';
import styled from 'styled-components';

import Heading from '../Heading';
import CategoryPill from '../CategoryPill';

const TopCategories = ({ gridArea, categories }) => {
  return (
    <Wrapper style={{ gridArea }}>
      <Heading type="section-title" as="h2">
        Top Categories
      </Heading>

      <Categories>
        {categories.map((category) => (
          <CategoryPill
            key={category.slug}
            href={`/tutorials/${category.slug}/`}
          >
            {category.name}
          </CategoryPill>
        ))}
      </Categories>
    </Wrapper>
  );
};

const Wrapper = styled.section``;
const Categories = styled.div`
  padding-top: 32px;
`;

export default TopCategories;
