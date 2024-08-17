import dynamic from 'next/dynamic';

export const FadeInDemo = dynamic(() => import('./FadeInDemo'));
export const ScaleWithPseudoAfter = dynamic(() =>
  import('./ScaleWithPseudoAfter')
);
export const ScaleWithPseudoBefore = dynamic(() =>
  import('./ScaleWithPseudoBefore')
);
