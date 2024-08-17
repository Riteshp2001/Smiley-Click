import React from 'react';
import styled from 'styled-components';

import RelatedPost from './RelatedPost';

const RelatedPosts = ({ posts }) => {
  return (
    <Wrapper>
      {posts.map(post => (
        <RelatedPost key={post.pathname} {...post} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 32px;
`;

export default RelatedPosts;
