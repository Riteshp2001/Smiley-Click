import dynamic from 'next/dynamic';

export const ReassignableVariable = dynamic(() =>
  import('./ReassignableVariable')
);
export const LockedVariable = dynamic(() =>
  import('./LockedVariable')
);
export const MutableFruits = dynamic(() => import('./MutableFruits'));
export const MutableObject = dynamic(() => import('./MutableObject'));
export const InfiniteNumberPicker = dynamic(() =>
  import('./InfiniteNumberPicker')
);
