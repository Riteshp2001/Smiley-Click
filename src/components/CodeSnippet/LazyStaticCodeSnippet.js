import React from 'react';

import StaticCodeWrapper from './StaticCodeWrapper';

const LazyStaticCodeSnippet = props => {
  const [Component, setComponent] = React.useState(() => StaticCodeWrapper);

  React.useEffect(() => {
    import('./StaticCodeSnippet.js').then(Thing =>
      setComponent(() => Thing.default)
    );
  }, []);

  return <Component {...props} />;
};

export default LazyStaticCodeSnippet;
