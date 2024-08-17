import React from 'react';

import usePersistedState from '@/hooks/use-persisted-state.hook';
import { generateId } from '@/utils';

export const AnalyticsContext = React.createContext();

export const AnalyticsProvider = ({ children }) => {
  const [userId] = usePersistedState(generateId(8), 'jwc/unique-id');

  const value = React.useMemo(() => ({ userId }), [userId]);

  // prettier-ignore
  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
