import dynamic from 'next/dynamic';

const LazyBinaryPoll = dynamic(() => import('./BinaryPoll'), {
  ssr: false,
});

export default LazyBinaryPoll;
