import dynamic from 'next/dynamic';

export const GridDemoInitialExample = dynamic(() =>
  import('./InitialExample')
);

export const GridDemoImplicitGrid = dynamic(() =>
  import('./ImplicitGrid')
);
export const GridDemoImplicitGridFixedHeight = dynamic(() =>
  import('./ImplicitGridFixedHeight')
);
export const GridDemoFullBleed = dynamic(() => import('./FullBleed'));

export const GridDemoPercentageVsFraction = dynamic(() =>
  import('./PercentageVsFraction')
);
export const GridDemoPercentageVsFractionWithGap = dynamic(() =>
  import('./PercentageVsFractionWithGap')
);

export const GridDemoNarrowColumns = dynamic(() =>
  import('./NarrowColumns')
);
export const GridDemoJustifyContent = dynamic(() =>
  import('./JustifyContent')
);
export const GridDemoJustifyContentMultiRow = dynamic(() =>
  import('./JustifyContentMultiRow')
);
export const GridDemoJustifyItems = dynamic(() =>
  import('./JustifyItems')
);
export const GridDemoJustifyAlign = dynamic(() =>
  import('./JustifyAlign')
);
export const GridDemoTwoLineCenter = dynamic(() =>
  import('./TwoLineCenter')
);

export const GridDemoAssignableChildren = dynamic(() =>
  import('./AssignableChildren')
);
export const GridDemoGridLinesGotcha = dynamic(() =>
  import('./GridLinesGotcha')
);
export const GridDemoCalendar = dynamic(() => import('./Calendar'));

export const GridDemoGridAreas = dynamic(() => import('./GridAreas'));
export const GridDemoGridAreasLayout = dynamic(() =>
  import('./GridAreasLayout')
);
