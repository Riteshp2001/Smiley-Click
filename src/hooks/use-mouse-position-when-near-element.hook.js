import * as React from 'react';

import { getDistanceBetweenPoints } from '@/utils';

function useMousePositionWhenNearElement({ boundingBox, radius }) {
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });

  React.useEffect(() => {
    const updateMousePosition = (ev) => {
      if (!boundingBox) {
        return;
      }

      const mousePoint = { x: ev.clientX, y: ev.clientY };

      const centerPoint = {
        x: boundingBox.left + boundingBox.width / 2,
        y: boundingBox.top + boundingBox.height / 2,
      };

      const distance = getDistanceBetweenPoints(
        mousePoint,
        centerPoint
      );

      if (distance < radius) {
        setMousePosition(mousePoint);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () =>
      window.removeEventListener('mousemove', updateMousePosition);
  }, [boundingBox, radius]);

  return mousePosition;
}

export default useMousePositionWhenNearElement;
