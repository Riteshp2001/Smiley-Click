import React from 'react';

import PostImage from './PostImage';

const ShadowImage = ({ style = {}, ...delegated }) => {
  return (
    <PostImage
      wrapperProps={{
        style: {
          ...style,
          filter: `
            drop-shadow(0px 1px 2px hsl(0deg 0% 0% / 0.1))
            drop-shadow(0px 2px 4px hsl(0deg 0% 0% / 0.1))
            drop-shadow(0px 4px 8px hsl(0deg 0% 0% / 0.1))
            drop-shadow(0px 8px 16px hsl(0deg 0% 0% / 0.1))
          `,
        },
      }}
      {...delegated}
    />
  );
};

export default ShadowImage;
