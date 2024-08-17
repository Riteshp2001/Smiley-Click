import dynamic from 'next/dynamic';

export const BlenderGallery = dynamic(() =>
  import('./BlenderGallery')
);
