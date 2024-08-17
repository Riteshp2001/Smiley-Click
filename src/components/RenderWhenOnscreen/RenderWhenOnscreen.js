import React from 'react';

import useIsOnscreen from '@/hooks/use-is-onscreen.hook';

const RenderWhenOnscreen = ({
  height,
  children,
  as = 'div',
  keepOnceShown,
  style = {},
}) => {
  const ref = React.useRef(null);
  const [hasBeenShown, setHasBeenShown] = React.useState(false);

  const isOnscreen = useIsOnscreen(ref);

  React.useEffect(() => {
    if (!hasBeenShown && isOnscreen) {
      setHasBeenShown(true);
    }
  }, [isOnscreen]);

  const shouldRender = keepOnceShown
    ? isOnscreen || hasBeenShown
    : isOnscreen;

  return React.createElement(
    as,
    {
      ref,
      style: { minHeight: height, ...style },
    },
    shouldRender ? children : null
  );
};

export default RenderWhenOnscreen;
