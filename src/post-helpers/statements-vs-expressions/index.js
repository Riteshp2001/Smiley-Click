import dynamic from 'next/dynamic';

export const ExpressionHighlighter = dynamic(() =>
  import('./ExpressionHighlighter')
);
