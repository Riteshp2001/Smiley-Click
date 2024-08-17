import React from 'react';
import styled from 'styled-components';

import HitCounter from '../HitCounter';
import Spacer from '../Spacer';

const ContentFooterArticle = ({ lastUpdated, hits }) => {
  return (
    <Wrapper>
      <DateWrapper>
        Last Updated:
        <Spacer size={8} />
        <Date>{lastUpdated}</Date>
      </DateWrapper>
      {typeof hits === 'number' && <HitCounter hits={hits} />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 18px;
  font-style: italic;
  margin-bottom: 16px;
  color: var(--color-gray-700);
`;

const Date = styled.strong`
  font-weight: var(--font-weight-medium);
`;

export default ContentFooterArticle;
