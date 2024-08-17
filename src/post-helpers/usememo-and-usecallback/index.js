import dynamic from 'next/dynamic';

export const DraggableSnapshots = dynamic(() =>
  import('./DraggableSnapshots')
);
