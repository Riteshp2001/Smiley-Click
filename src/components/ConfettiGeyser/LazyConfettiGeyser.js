import dynamic from 'next/dynamic';

const LazyConfettiGeyser = dynamic(() => import('./ConfettiGeyser'), {
  ssr: false,
});

export default LazyConfettiGeyser;
