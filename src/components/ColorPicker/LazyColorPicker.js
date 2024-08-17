import dynamic from 'next/dynamic';

const LazyColorPicker = dynamic(() => import('./ColorPicker'), {
  ssr: false,
});

export default LazyColorPicker;
