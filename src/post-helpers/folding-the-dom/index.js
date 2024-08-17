import dynamic from 'next/dynamic';

export const FoldCodeSnippet = dynamic(() =>
  import('./FoldCodeSnippet')
);
export const FoldingDemo = dynamic(() => import('./FoldingDemo'));
export const FoldOriginDemo = dynamic(() =>
  import('./FoldOriginDemo')
);
export const FoldPerspectiveDemo = dynamic(() =>
  import('./FoldPerspectiveDemo')
);
export const FoldTransformDemo = dynamic(() =>
  import('./FoldTransformDemo')
);
export const TheTrickDemo = dynamic(() => import('./TheTrickDemo'));
