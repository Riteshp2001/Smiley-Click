import dynamic from 'next/dynamic';

export const HitCounterCodeSamples = dynamic(() =>
  import('./CodeSamples')
);
export const HitCounterDemo = dynamic(() =>
  import('./HitCounterDemo')
);
export const ScreenTriggerer = dynamic(() =>
  import('./ScreenTriggerer')
);
