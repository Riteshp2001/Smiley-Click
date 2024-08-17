import dynamic from 'next/dynamic';

export const Demos = dynamic(() => import('./Demos'));
export const Initial = dynamic(() => import('./Initial'));
export const InitialKeyframe = dynamic(() =>
  import('./InitialKeyframe')
);
export const InitialSplit = dynamic(() => import('./InitialSplit'));
export const IntervalDemos = dynamic(() => import('./IntervalDemos'));
