import React from 'react';

export default function useOverscrollBackground(color, ref) {
  React.useEffect(() => {
    if (!color) {
      return;
    }

    const { current } = ref;

    const observer = new window.IntersectionObserver((entries) => {
      const isVisible = entries[0].intersectionRatio > 0;

      document.body.style.background = isVisible ? color : null;
    });

    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  }, [ref, color]);
}
