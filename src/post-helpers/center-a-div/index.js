import dynamic from 'next/dynamic';

export const CenteringAutoMargins = dynamic(() =>
  import('./AutoMargins')
);
export const CenteringFlexCenter = dynamic(() =>
  import('./FlexCenter')
);
export const CenteringFlexMulti = dynamic(() =>
  import('./FlexMulti')
);
export const CenteringFixedPopup = dynamic(() =>
  import('./FixedPopup')
);
export const CenteringPickTwo = dynamic(() => import('./PickTwo'));
export const CenteringGDPRPopup = dynamic(() =>
  import('./GDPRPopup')
);
export const CenteringUnknownSize = dynamic(() =>
  import('./UnknownSize')
);
export const CenteringGridTwoLine = dynamic(() =>
  import('./GridTwoLine')
);
export const CenteringGridVsFlexbox = dynamic(() =>
  import('./GridVsFlexbox')
);
export const CenteringGridIssueExplained = dynamic(() =>
  import('./GridIssueExplained')
);
export const CenteringGridStack = dynamic(() =>
  import('./GridStack')
);
export const CenteringTextAlign = dynamic(() =>
  import('./TextAlign')
);
export const CenteringFutureAlignContent = dynamic(() =>
  import('./FutureAlignContent')
);
