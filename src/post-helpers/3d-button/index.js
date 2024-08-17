import dynamic from 'next/dynamic';

export const ButtonGradient = dynamic(() =>
  import('./ButtonGradient')
);
export const ButtonLayers = dynamic(() => import('./ButtonLayers'));
export const ButtonLayersWithShadow = dynamic(() =>
  import('./ButtonLayersWithShadow')
);
export const FinalButton = dynamic(() => import('./FinalButton'));
export const FinalButtonRound = dynamic(() =>
  import('./FinalButtonRound')
);
export const IntroDemo = dynamic(() => import('./IntroDemo'));
export const SoftShadow = dynamic(() => import('./SoftShadow'));
