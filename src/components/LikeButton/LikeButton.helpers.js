import {
  clamp,
  getDistanceBetweenPoints,
  convertRadiansToDegrees,
} from '../../utils';

export const getIsWithinRadius = (
  size,
  svgBoundingBox,
  cursorPoint
) => {
  if (!svgBoundingBox) {
    return false;
  }

  const areaOfEffectRadius = size * 2;

  const headCenterPoint = {
    x: svgBoundingBox.left + svgBoundingBox.width / 2,
    y: svgBoundingBox.top + svgBoundingBox.height / 2,
  };

  const distanceToHead = getDistanceBetweenPoints(
    cursorPoint,
    headCenterPoint
  );

  return distanceToHead <= areaOfEffectRadius;
};

export const getBodyRotation = (
  size,
  svgBoundingBox,
  cursorPoint
) => {
  if (!svgBoundingBox) {
    return 0;
  }

  const areaOfEffectRadius = size * 2;

  const headCenterPoint = {
    x: svgBoundingBox.left + svgBoundingBox.width / 2,
    y: svgBoundingBox.top + svgBoundingBox.height / 2,
  };

  const distanceToHead = getDistanceBetweenPoints(
    cursorPoint,
    headCenterPoint
  );

  if (distanceToHead > areaOfEffectRadius) {
    return 0;
  }

  const deltaX = headCenterPoint.x - cursorPoint.x;
  const deltaY = headCenterPoint.y - cursorPoint.y;

  const angleInRads = Math.atan2(deltaY, deltaX);
  const angleInDegrees = 180 + convertRadiansToDegrees(angleInRads);

  const rotationMax = 10;

  let a, b;
  if (angleInDegrees < 180) {
    a = (rotationMax / 90) * -1;
    b = rotationMax;
  } else {
    a = rotationMax / 90;
    b = rotationMax * -3;
  }

  return a * angleInDegrees + b;
};

export const getEyeTranslation = (
  size,
  svgBoundingBox,
  cursorPoint
) => {
  if (!svgBoundingBox) {
    return 0;
  }

  const areaOfEffectRadius = size * 2;

  const headCenterPoint = {
    x: svgBoundingBox.left + svgBoundingBox.width / 2,
    y: svgBoundingBox.top + svgBoundingBox.height / 2,
  };

  const distanceToHead = getDistanceBetweenPoints(
    cursorPoint,
    headCenterPoint
  );

  if (distanceToHead > areaOfEffectRadius) {
    return 0;
  }

  const deltaX = cursorPoint.x - headCenterPoint.x;
  const deltaY = cursorPoint.y - headCenterPoint.y;

  const maxDisplacement = size * 0.025;
  const reachMaxAt = areaOfEffectRadius / 2;

  const unboundTranslateX = (deltaX / reachMaxAt) * maxDisplacement;
  const unboundTranslateY = (deltaY / reachMaxAt) * maxDisplacement;

  return {
    x: clamp(unboundTranslateX, -maxDisplacement, maxDisplacement),
    y: clamp(unboundTranslateY, -maxDisplacement, maxDisplacement),
  };
};
