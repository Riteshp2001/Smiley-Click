import React from 'react';

import { debounce } from '@/utils';

function useDebouncedValues(debounceBy, props) {
  const [propsInState, setPropsInState] = React.useState(props);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPropsInState(props);
    }, debounceBy);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [debounceBy, ...Object.values(props)]);

  return propsInState;
}

export default useDebouncedValues;
