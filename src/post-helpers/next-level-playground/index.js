import dynamic from 'next/dynamic';

// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackCodeEditor,
//   SandpackPreview,
// } from "@codesandbox/sandpack-react";

export const Sandpack = dynamic(() => import('./Sandpack'), {
  ssr: false,
});
export const SandpackProvider = dynamic(
  () => import('./SandpackProvider'),
  {
    ssr: false,
  }
);

export const SandpackWrapper = dynamic(
  () => import('./SandpackWrapper'),
  {
    ssr: true,
  }
);

// Forward along lazy-loaded components from Sandpack
export const SandpackCodeEditor = dynamic(
  () =>
    import('@codesandbox/sandpack-react').then((mod) => {
      const { SandpackCodeEditor } = mod;
      return SandpackCodeEditor;
    }),
  {
    ssr: false,
  }
);
export const SandpackPreview = dynamic(
  () =>
    import('@codesandbox/sandpack-react').then((mod) => {
      const { SandpackPreview } = mod;
      return SandpackPreview;
    }),
  {
    ssr: false,
  }
);

// Packaged demos
export const SandpackActiveFileDemo = dynamic(
  () => import('./SandpackActiveFileDemo'),
  {
    ssr: false,
  }
);
export const SandpackCustomRefreshDemo = dynamic(
  () => import('./SandpackCustomRefreshDemo'),
  {
    ssr: false,
  }
);
