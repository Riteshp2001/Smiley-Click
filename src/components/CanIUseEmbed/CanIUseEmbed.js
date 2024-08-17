import React from 'react';

const CanIUseEmbed = ({ featureId }) => {
  return (
    <iframe
      src={`https://caniuse.bitsofco.de/embed/index.html?feat=${featureId}&amp;periods=future_1,current,past_1,past_2&amp;accessible-colours=false&amp;image-base=none`}
      title={`CanIUse embed for ${featureId}`}
      frameBorder="0"
      width="100%"
      height="498px"
    ></iframe>
  );
};

export default CanIUseEmbed;
