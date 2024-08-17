import React from 'react';

import useHasMounted from '../../hooks/use-has-mounted.hook.js';

function ClientOnly({ children, ...delegated }) {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

export default ClientOnly;
