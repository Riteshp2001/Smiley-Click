import React from 'react';
import styled from 'styled-components';

import useHasMounted from '../../hooks/use-has-mounted.hook.js';

import { ConfigContext } from '@/components/ConfigContext';

const ArticleHeroImage = ({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
}) => {
  const { colorMode } = React.useContext(ConfigContext);

  const src = colorMode === 'light' ? lightSrc : darkSrc;

  const [hasLoaded, setHasLoaded] = React.useState(false);

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`
            ${src.replace('.png', '.avif')} 1x,
            ${src.replace('.png', '@2x.avif')} 2x,
          `}
      />
      <source
        type="image/png"
        srcSet={`
            ${src} 1x,
            ${src.replace('.png', '@2x.png')} 2x,
          `}
      />
      <HeroImage
        src={src}
        alt={alt}
        style={{ width, height, opacity: hasLoaded ? 1 : 0 }}
        onLoad={() => setHasLoaded(true)}
      />
    </picture>
  );
};

const ClientOnlyWrapper = (props) => {
  const hasMounted = useHasMounted();

  // HACK: Assuming all images fit the same aspect ratio for now.
  // Will need to update in the future.
  const width = 500;
  const height = 250;

  if (!hasMounted) {
    return <Placeholder style={{ width, height }} />;
  }

  return (
    <ArticleHeroImage {...props} width={width} height={height} />
  );
};

const HeroImage = styled.img`
  display: block;
  max-width: 100%;
  margin: 0 auto 32px;
  transition: opacity 600ms;
  object-fit: cover;
  /* HACK: This only really makes sense for styled-components img */
  object-position: right center;
`;

const Placeholder = styled.div`
  display: block;
  max-width: 100%;
  margin: 0 auto 32px;
`;

export default ClientOnlyWrapper;
