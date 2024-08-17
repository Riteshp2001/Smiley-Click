import React from 'react';

import PostImage from '@/components/PostImage';

const TerminalScreenshot = ({ slug, alt, height = 894 }) => {
  return (
    <PostImage
      src={`/images/terminal-for-js-devs/t-${slug}.png`}
      alt={alt}
      width={1372}
      height={height}
      marginBottom={0}
    />
  );
};

export default TerminalScreenshot;
