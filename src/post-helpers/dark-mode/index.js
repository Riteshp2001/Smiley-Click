import dynamic from 'next/dynamic';

export const OrderOfOperations = dynamic(() =>
  import('./OrderOfOperations')
);
