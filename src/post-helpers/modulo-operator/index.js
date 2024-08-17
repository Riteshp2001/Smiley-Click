import dynamic from 'next/dynamic';

export const DivisionGroupsDemo = dynamic(() =>
  import('./DivisionGroupsDemo')
);

export const CircularColorsDemo = dynamic(() =>
  import('./CircularColorsDemo')
);
