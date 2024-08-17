import dynamic from 'next/dynamic';

export const SpringVsEase = dynamic(() => import('./SpringVsEase'));
export const SpringComparison = dynamic(() =>
  import('./SpringComparison')
);
export const SpringMechanism = dynamic(() =>
  import('./SpringMechanism')
);
export const Environment = dynamic(() => import('./Environment'));
export const Sandbox = dynamic(() => import('./Sandbox'));
export const OldBrowserWarning = dynamic(() =>
  import('./OldBrowserWarning')
);
export const MotionWarning = dynamic(() => import('./MotionWarning'));
