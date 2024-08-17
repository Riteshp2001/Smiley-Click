import React from 'react';

export default function useForceUpdate() {
  const [, setState] = React.useState(null);

  const forceUpdate = React.useCallback(() => {
    setState(Math.random());
  }, []);

  return forceUpdate;
}
