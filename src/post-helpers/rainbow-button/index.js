import dynamic from 'next/dynamic';

export const CasinoLights = dynamic(() => import('./CasinoLights'));
export const RainbowDemoButton = dynamic(() =>
  import('./DemoButton')
);
export const GradientIdeaImage = dynamic(() =>
  import('./GradientIdeaImage')
);
export const RainbowButtonOldMethod = dynamic(() =>
  import('./OldMethod')
);
