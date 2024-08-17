import dynamic from 'next/dynamic';

export const PersistedLiveDemo = dynamic(() => import('./LiveDemo'));
