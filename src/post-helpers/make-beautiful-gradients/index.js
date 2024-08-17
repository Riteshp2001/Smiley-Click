import dynamic from 'next/dynamic';

export const GradientSlider = dynamic(() =>
  import('./GradientSlider')
);
export const ManuallyCalculateMidpoints = dynamic(() =>
  import('./ManuallyCalculateMidpoints')
);
export const RGBColors = dynamic(() => import('./RGBColors'));
export const HSLColors = dynamic(() => import('./HSLColors'));
