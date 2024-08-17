import dynamic from 'next/dynamic';

const LazySandbox = dynamic(() => import('./Sandbox'), {
  ssr: true,
});

export default LazySandbox;
