import dynamic from 'next/dynamic';

export const ShadowDemo = dynamic(() => import('./ShadowDemo'));
export const ShadowComparisonDemo = dynamic(() =>
  import('./ShadowComparisonDemo')
);
