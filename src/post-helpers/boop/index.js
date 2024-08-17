import dynamic from 'next/dynamic';

export const PreBoop = dynamic(() => import('./PreBoop'));
export const BoopV1 = dynamic(() => import('./BoopV1'));
export const BoopV2 = dynamic(() => import('./BoopV2'));
export const BoopV3 = dynamic(() => import('./BoopV3'));
export const BoopV4 = dynamic(() => import('./BoopV4'));
export const DoubleIconDemo = dynamic(() =>
  import('./DoubleIconDemo')
);
export const ShowMoreDemo = dynamic(() => import('./ShowMoreDemo'));
export const FancyDemos = dynamic(() => import('./FancyDemos'));
export const CircleDemo = dynamic(() => import('./CircleDemo'));
