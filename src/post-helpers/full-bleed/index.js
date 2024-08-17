import dynamic from 'next/dynamic';

export const Box = dynamic(() => import('./Box'));
export const FullBleedGrid = dynamic(() => import('./FullBleedGrid'));
export const FullBleedGridWithContent = dynamic(() =>
  import('./FullBleedGridWithContent')
);
export const HolyGrail = dynamic(() => import('./HolyGrail'));
