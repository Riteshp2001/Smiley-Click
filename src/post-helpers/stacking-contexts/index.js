import dynamic from 'next/dynamic';

export const EnvelopeDemo = dynamic(() => import('./EnvelopeDemo'));
export const EnvelopeLayers = dynamic(() =>
  import('./EnvelopeLayers')
);
