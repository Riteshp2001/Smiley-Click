import dynamic from 'next/dynamic';

export const PrideFlag = dynamic(() => import('./PrideFlag'));
export const PrideFlagDemoUnit = dynamic(() =>
  import('./PrideFlagDemoUnit')
);

export const GradientBarDemo = dynamic(() =>
  import('./GradientBarDemo')
);

export const ColumnRippleDemo = dynamic(() =>
  import('./ColumnRippleDemo')
);
