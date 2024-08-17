// TODO: Dedupe with VideoGif
import React from 'react';
import styled from 'styled-components';
import Image from 'next/legacy/image';

import { ConfigContext } from '../ConfigContext';
import SideBySide from '../SideBySide';

const BaseImage = ({
  src,
  width,
  height,
  title,
  type,
  source,
  marginBottom,
  includeWhiteBackground,
  wrapperProps = {},
  ...delegated
}) => {
  if (type === 'native') {
    return (
      <img src={src} width={width} height={height} {...delegated} />
    );
  }

  const as =
    typeof width !== 'undefined' && typeof height !== 'undefined'
      ? Image
      : 'img';

  const {
    style: suppliedWrapperStyle = {},
    ...wrapperDelegated
  } = wrapperProps;

  const wrapperStyle = {
    background: includeWhiteBackground && 'white',
    padding: includeWhiteBackground && '16px',
    borderRadius: includeWhiteBackground && '8px',
    '--margin-bottom':
      typeof marginBottom === 'number'
        ? `${marginBottom}px`
        : undefined,
    ...suppliedWrapperStyle,
  };

  if (source) {
    return (
      <Wrapper type={type} style={wrapperStyle} {...wrapperDelegated}>
        <a href={source} target="_blank" rel="noopener noreferrer">
          <ImageElem
            as={as}
            width={width}
            height={height}
            src={src}
            {...delegated}
          />
        </a>
        {title && <Caption>{title}</Caption>}
      </Wrapper>
    );
  }

  return (
    <Wrapper type={type} style={wrapperStyle}>
      <ImageElem
        as={as}
        src={src}
        width={width}
        height={height}
        {...delegated}
      />
      {title && <Caption>{title}</Caption>}
    </Wrapper>
  );
};

const DynamicPostImage = ({
  darkSrc,
  lightSrc,
  darkFallback,
  lightFallback,
  ...delegated
}) => {
  const { colorMode } = React.useContext(ConfigContext);

  let src = colorMode === 'dark' ? darkSrc : lightSrc;
  let fallback = colorMode === 'dark' ? darkFallback : lightFallback;

  return <BaseImage src={src} fallback={fallback} {...delegated} />;
};

const PostImage = ({
  src,
  fallback,
  darkSrc,
  darkFallback,
  lightSrc,
  lightFallback,
  alt = '',
  title = '',
  type = 'default',
  ...delegated
}) => {
  if (darkSrc && lightSrc) {
    return (
      <DynamicPostImage
        darkSrc={darkSrc}
        lightSrc={lightSrc}
        darkFallback={darkFallback}
        lightFallback={lightFallback}
        alt={alt}
        title={title}
        type={type}
        {...delegated}
      />
    );
  }

  return (
    <BaseImage
      src={src}
      fallback={fallback}
      alt={alt}
      title={title}
      type={type}
      {...delegated}
    />
  );
};

const Wrapper = styled.span`
  margin: 32px auto var(--margin-bottom, 48px);
  box-sizing: content-box;

  /*
    HACK: Next-image does some trickery which undoes the auto-margins.
    I'll need to target it here directly.
  */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    padding: 0;
    border: none;
  }

  ${SideBySide} & {
    padding: 0;
    margin: 0;
    border: none;

    &:not(:last-of-type) {
      padding-right: 0;
    }
  }
`;

const Caption = styled.span`
  display: block;
  padding-top: 12px;
  font-size: 14px;
  text-align: center;
`;

const ImageElem = styled.img`
  display: block;
  width: 100%;
  border-radius: 3px;
  margin: auto; /* In case width is overridden, center it */
`;

export default PostImage;
