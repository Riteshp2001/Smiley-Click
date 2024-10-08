import React from 'react';

const YoutubeEmbed = ({ title, width = 560, height = 315, src }) => {
  return (
    <iframe
      width={width}
      height={height}
      src={src}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ maxWidth: 'calc(100vw - 32px)' }}
    ></iframe>
  );
};

export default YoutubeEmbed;
