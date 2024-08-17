import React from 'react';

import ConfettiGeyser from './LazyConfettiGeyser';

const BurstGeyser = ({ concentration, ...delegated }) => {
  return (
    <>
      <ConfettiGeyser concentration={concentration} {...delegated} />
      <ConfettiGeyser
        concentration={concentration * 10}
        {...delegated}
        duration={320}
      />
    </>
  );
};

export default React.memo(BurstGeyser);
