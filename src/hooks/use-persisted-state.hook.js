import React from 'react';

export default function usePersistedState(defaultValue, key) {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    if (!window.localStorage) {
      return;
    }

    const stickyValue = window.localStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, []);

  React.useEffect(() => {
    window.localStorage?.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
