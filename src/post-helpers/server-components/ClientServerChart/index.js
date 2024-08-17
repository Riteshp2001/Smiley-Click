import dynamic from 'next/dynamic';

export const ClientServerChart = dynamic(() =>
  import('./ClientServerChart')
);
