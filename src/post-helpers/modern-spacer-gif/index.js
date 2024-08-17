import dynamic from 'next/dynamic';

export const HomeButtonSnippet = dynamic(() =>
  import('./HomeButtonSnippet')
);
