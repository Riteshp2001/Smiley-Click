import React from 'react';

const LazyToastySubscribe = (props) => {
  const [Component, setComponent] = React.useState(() => () => null);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      import('./ToastySubscribe.js').then((Thing) =>
        setComponent(() => Thing.default)
      );
    }, 6000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return <Component {...props} />;
};

export default LazyToastySubscribe;
