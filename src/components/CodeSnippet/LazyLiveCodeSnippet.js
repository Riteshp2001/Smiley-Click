import React from 'react';

const LazyLiveCodeSnippet = props => {
  const [Component, setComponent] = React.useState(() => () => null);

  React.useEffect(() => {
    import('./LiveCodeSnippet.js').then(Thing =>
      setComponent(() => Thing.default)
    );
  }, []);

  return <Component {...props} />;
};

export default LazyLiveCodeSnippet;
