import React from 'react';
import styled from 'styled-components';
import { Heart, User } from 'react-feather';

import Spacer from '@/components/Spacer';
import DesktopOnly from '@/components/DesktopOnly';
import TwitterIcon from './TwitterIcon';
import Metric from './Metric';

const FakeTweet = ({
  id,
  avatarSrc,
  displayName,
  handle,
  date,
  includeMetrics,
  numberOfLikes,
  numberOfConversations,
  children,
}) => {
  const twitterUrl = `https://twitter.com/${handle}/status/${id}`;

  return (
    <Link
      target="_blank"
      rel="noopener noreferer"
      href={twitterUrl}
      aria-label="Opens Tweet on Twitter in a new tab"
    >
      <Wrapper>
        <Header>
          <Avatar src={avatarSrc} alt="" />
          <Spacer size={8} />
          <UserInfo>
            <DisplayName>{displayName}</DisplayName>
            <Handle>@{handle}</Handle>
          </UserInfo>
          <TwitterIcon
            style={{ width: 24, alignSelf: 'flex-start' }}
          />
        </Header>
        <Body>{children}</Body>
        <Spacer size={6} />
        <Date>{date}</Date>
        {includeMetrics && (
          <>
            <Divider />
            <MetricsWrapper>
              <Metric Icon={Heart}>{numberOfLikes}</Metric>
              <DesktopOnly>
                <Metric Icon={User}>
                  {numberOfConversations} people are Tweeting about
                  this
                </Metric>
              </DesktopOnly>
            </MetricsWrapper>
          </>
        )}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  display: block;
  text-decoration: none;
  max-width: 450px;
  color: inherit;
  padding: 16px;
  border: 1px solid var(--color-gray-300);
  border-radius: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif;

  &:hover {
    background: var(--color-gray-100);
  }
`;
const Wrapper = styled.article``;

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  display: block;
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const DisplayName = styled.div`
  font-size: 15px;
  line-height: 1.3;
  color: var(--color-gray-1000);
  font-weight: 800;
`;

const Handle = styled.div`
  font-size: 15px;
  line-height: 1.3;
  font-weight: 500;
  color: var(--color-gray-600);
`;

const Body = styled.div`
  font-size: 18px;
  padding: 16px 0 0;
  font-weight: 500;
  white-space: pre-wrap;
  line-height: 1.25;
  color: var(--color-gray-1000);
`;

const Divider = styled.hr`
  border: none;
  margin: 12px 0;
  border-bottom: 1px solid var(--color-gray-300);
`;

const Date = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: var(--color-gray-600);
`;

const MetricsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -4px;

  & > *:not(:last-child) {
    margin-right: 24px;
  }
`;
export default FakeTweet;
