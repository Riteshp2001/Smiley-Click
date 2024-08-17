import React from 'react';

const ImgWithFallback = ({
  src,
  fallback,
  type = 'image/webp',
  alt,
  ...delegated
}) => {
  if (!fallback) {
    return <img src={src} loading="lazy" alt={alt} {...delegated} />;
  }
  return (
    <picture style={{ display: 'contents' }}>
      <source srcSet={src} type={type} />
      <img src={fallback} loading="lazy" alt={alt} {...delegated} />
    </picture>
  );
};

export default ImgWithFallback;
