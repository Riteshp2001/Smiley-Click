import dynamic from 'next/dynamic';

export const RGBColorPicker = dynamic(
  () => import('./RGBColorPicker/RGBColorPicker'),
  {
    ssr: true,
  }
);

export const HexColorPicker = dynamic(
  () => import('./HexColorPicker/HexColorPicker'),
  {
    ssr: true,
  }
);

export const RedContrast = dynamic(() => import('./RedContrast'), {
  ssr: true,
});

export const HSLColors = dynamic(() => import('./HSLColors'), {
  ssr: true,
});
export const LCHColors = dynamic(() => import('./LCHColors'), {
  ssr: true,
});
export const LCHColorPicker = dynamic(
  () => import('./LCHColorPicker/LCHColorPicker'),
  {
    ssr: true,
  }
);
export const NamedColorPicker = dynamic(
  () => import('./NamedColorPicker/NamedColorPicker'),
  {
    ssr: true,
  }
);
export const NamedGrays = dynamic(() => import('./NamedGrays'), {
  ssr: true,
});
