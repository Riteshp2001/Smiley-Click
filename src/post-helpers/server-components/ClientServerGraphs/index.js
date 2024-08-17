import dynamic from 'next/dynamic';

export const ClientServerGraph = dynamic(() =>
  import('./ClientServerGraph')
);
