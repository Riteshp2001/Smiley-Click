import dynamic from 'next/dynamic';

export const DesignerPerspectiveIllustration = dynamic(() =>
  import('./DesignerPerspectiveIllustration')
);

export const LeftAlignDemo = dynamic(() => import('./LeftAlignDemo'));
