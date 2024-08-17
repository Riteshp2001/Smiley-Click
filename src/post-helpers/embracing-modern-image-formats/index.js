import dynamic from 'next/dynamic';

export const CompressionTable = dynamic(() =>
  import('./CompressionTable')
);
