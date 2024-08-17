import React from 'react';
import styled from 'styled-components';

const Row = ({
  isEven,
  imageSrc,
  imageAlt,
  title,
  description,
  href,
}) => {
  return (
    <a href={href} style={{ textDecoration: 'none' }}>
      <Wrapper>
        <ImageColumn isEven={isEven}>
          <img alt={imageAlt} src={imageSrc} />
        </ImageColumn>
        <DescriptionColumn isEven={isEven}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </DescriptionColumn>
      </Wrapper>
    </a>
  );
};

const Wrapper = styled.article`
  display: flex;
  color: var(--color-text);
  margin-bottom: 64px;

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    flex-direction: column;
  }
`;

const ImageColumn = styled.div`
  margin-right: 32px;

  img {
    display: block;
    width: 300px;
    height: 158px;
    object-fit: cover;
    transform: translateY(7px);
    border-radius: 8px;
  }

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 32px;

    img {
      width: 100%;
      height: initial;
    }
  }
`;

const DescriptionColumn = styled.div`
  flex: 1;
  order: ${(p) => (p.isEven ? 1 : 2)};

  p,
  li {
    font-size: 1rem;
    margin-bottom: 12px;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  margin-bottom: 16px;
`;

const Description = styled.div``;

export default Row;
