'use client';

import dynamic from 'next/dynamic';

// 01
export const SingleClick = dynamic(
  () => import('./instances/SingleClick'),
  {
    ssr: true,
  }
);
// 02
export const RenderPileUp = dynamic(
  () => import('./instances/RenderPileUp'),
  {
    ssr: true,
  }
);
// 03
export const SingleClickDeferred = dynamic(
  () => import('./instances/SingleClickDeferred'),
  {
    ssr: true,
  }
);
// 04
export const DeferredWorkingPerfectly = dynamic(
  () => import('./instances/DeferredWorkingPerfectly'),
  {
    ssr: true,
  }
);

export const RenderEventMagicSchoolBus = dynamic(
  () => import('./RenderEventMagicSchoolBus'),
  {
    ssr: true,
  }
);
