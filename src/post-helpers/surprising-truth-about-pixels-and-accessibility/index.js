import dynamic from 'next/dynamic';

export const EmDemo = dynamic(() => import('./EmDemo'));
export const RemDemo = dynamic(() => import('./RemDemo'));
export const RemPaddingDemo = dynamic(() =>
  import('./RemPaddingDemo')
);
export const ButtonWidthDemo = dynamic(() =>
  import('./ButtonWidthDemo')
);
export const VerticalMarginsDemo = dynamic(() =>
  import('./VerticalMarginsDemo')
);
export const PxRemComparisonDemo = dynamic(() =>
  import('./PxRemComparisonDemo')
);
