import dynamic from 'next/dynamic';

export const SiteDemo = dynamic(() => import('./SiteDemo'));
export const GlugDemo = dynamic(() => import('./GlugDemo'));
export const PopsDemo = dynamic(() => import('./PopsDemo'));
export const PlayPauseDemo = dynamic(() => import('./PlayPauseDemo'));
export const DrumMachineDemo = dynamic(() =>
  import('./DrumMachineDemo')
);
export const CheckboxDemo = dynamic(() => import('./CheckboxDemo'));
