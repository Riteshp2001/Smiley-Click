import dynamic from 'next/dynamic';

export const BezierGraph = dynamic(() => import('./BezierGraph'));
export const BoxAnimation = dynamic(() => import('./BoxAnimation'));
export const EarlyButton = dynamic(() => import('./EarlyButton'));
export const EnteringAndExiting = dynamic(() =>
  import('./EnteringAndExiting')
);
