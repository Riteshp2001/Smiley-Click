import dynamic from 'next/dynamic';

export const ApplicationTreeInitial = dynamic(() =>
  import('./Initial')
);
export const ApplicationTreeWithDirective = dynamic(() =>
  import('./WithDirective')
);
export const ApplicationTreeWithBoundary = dynamic(() =>
  import('./WithBoundary')
);
