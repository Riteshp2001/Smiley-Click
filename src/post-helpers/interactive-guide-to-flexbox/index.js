import dynamic from 'next/dynamic';

export { default as Clippy } from './Clippy';

export const ArgyleDemo = dynamic(() => import('./ArgyleDemo'));
export const DirectionSvg = dynamic(() => import('./DirectionSvg'));
export const FlexVennDiagram = dynamic(() =>
  import('./FlexVennDiagram')
);
export const WienersDemo = dynamic(() => import('./WienersDemo'));
export const SouvlakiDemo = dynamic(() => import('./SouvlakiDemo'));

export const FlexDemoLayoutMode = dynamic(() =>
  import('./LayoutMode')
);
export const GapWarning = dynamic(() => import('./GapWarning'));
export const FlexDemoDirection = dynamic(() => import('./Direction'));
export const FlexDemoJustify = dynamic(() => import('./Justify'));
export const FlexDemoJustifyAndAlign = dynamic(() =>
  import('./JustifyAndAlign')
);
export const FlexDemoAlignSelf = dynamic(() => import('./AlignSelf'));
export const FlexDemoFlexBasis = dynamic(() => import('./FlexBasis'));
export const FlexDemoFlexGrowIntro = dynamic(() =>
  import('./FlexGrowIntro')
);
export const FlexDemoFlexGrowMultiple = dynamic(() =>
  import('./FlexGrowMultiple')
);
export const FlexDemoShrinkBasis = dynamic(() =>
  import('./ShrinkBasis')
);
export const FlexDemoShrinkContainer = dynamic(() =>
  import('./ShrinkContainer')
);
export const FlexDemoShrinkProperDemo = dynamic(() =>
  import('./ShrinkProperDemo')
);
export const FlexDemoShrinkSearchField = dynamic(() =>
  import('./ShrinkSearchField')
);
export const FlexDemoShrinkZero = dynamic(() =>
  import('./ShrinkZero')
);
export const FlexDemoShrinkZeroFixed = dynamic(() =>
  import('./ShrinkZeroFixed')
);
export const FlexDemoShrinkWords = dynamic(() =>
  import('./ShrinkWords')
);
export const FlexDemoGapIntro = dynamic(() => import('./GapIntro'));
export const FlexDemoGapHeader = dynamic(() => import('./GapHeader'));
export const FlexDemoAutoMargins = dynamic(() =>
  import('./AutoMargins')
);
export const FlexDemoWrappingIntro = dynamic(() =>
  import('./WrappingIntro')
);
export const FlexDemoWrappingAlignItems = dynamic(() =>
  import('./WrappingAlignItems')
);
