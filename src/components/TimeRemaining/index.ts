'use client';

import dynamic from 'next/dynamic';

// No idea why TypeScript doesn't like this
// @ts-ignore
const LazyTimeRemaining = dynamic(() => import('./TimeRemaining'), {
  ssr: true,
});

export default LazyTimeRemaining;
