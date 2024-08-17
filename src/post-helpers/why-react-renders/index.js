import dynamic from 'next/dynamic';

export const CounterNodeGraph = dynamic(() =>
  import('./CounterNodeGraph')
);
export const CounterDecorationNodeGraph = dynamic(() =>
  import('./CounterDecorationNodeGraph')
);
export const UseMemoGraph = dynamic(() => import('./UseMemoGraph'));
export const DecorativeBoxesNodeGraph = dynamic(() =>
  import('./DecorativeBoxesNodeGraph')
);
export const PrimeClockGraph = dynamic(() =>
  import('./PrimeClockGraph')
);
export const PurePrimeClockGraph = dynamic(() =>
  import('./PurePrimeClockGraph')
);

export { default as GreenTextFlash } from './GreenTextFlash';
