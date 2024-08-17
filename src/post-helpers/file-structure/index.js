import dynamic from 'next/dynamic';

export const IntroFileViewerDemo = dynamic(
  () => import('./IntroFileViewerDemo'),
  {
    ssr: true,
  }
);
export const MetaFileViewerDemo = dynamic(
  () => import('./MetaFileViewerDemo'),
  {
    ssr: true,
  }
);
export const HooksFileViewerDemo = dynamic(
  () => import('./HooksFileViewerDemo'),
  {
    ssr: true,
  }
);
