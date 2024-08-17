// import React from "react";
// import { useSpring, animated, to } from "react-spring";
// import { MAX_NUM_OF_LIKES } from "@/constants";
// import useMousePositionWhenNearElement from "@/hooks/use-mouse-position-when-near-element.hook";
// import useBoundingBox from "@/hooks/use-bounding-box.hook";
// import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion.hook";
// import { generateId } from "@/utils";
// import UnstyledButton from "../UnstyledButton";
// import VisuallyHidden from "@/components/VisuallyHidden";

// import {
//   getBodyRotation,
//   getEyeTranslation,
//   getIsWithinRadius,
// } from "./LikeButton.helpers";

// // NOTE: These constants are provided as a convenience, but they are *NOT*
// // used throughout. This means you can't change these values and expect
// // everything to scale properly :( sorry about that!
// const VIEWBOX_WIDTH = 50;
// const VIEWBOX_HEIGHT = 42;

// const FAST_SPRING = { tension: 1270, friction: 200 };

// // This hook controls the masking to show the pink/red background.
// const useFillingUpAnimation = (numOfMyLikes, prefersReducedMotion) => {
//   const progress = numOfMyLikes / MAX_NUM_OF_LIKES;

//   const skewedProgress = 0.75 * Math.log10(progress * 1.75) + 0.818;

//   const spring = useSpring({
//     amount:
//       numOfMyLikes === 0
//         ? VIEWBOX_HEIGHT
//         : VIEWBOX_HEIGHT - skewedProgress * VIEWBOX_HEIGHT,
//     config: FAST_SPRING,
//     immediate: prefersReducedMotion,
//   });

//   return spring;
// };

// const useFrownIfDisengaged = (
//   size,
//   svgBoundingBox,
//   cursorPoint,
//   numOfMyLikes,
//   status,
//   setStatus
// ) => {
//   const wasWithinRadiusRef = React.useRef(false);
//   const isWithinRadius = getIsWithinRadius(size, svgBoundingBox, cursorPoint);

//   React.useEffect(() => {
//     if (isWithinRadius) {
//       wasWithinRadiusRef.current = true;
//     } else {
//       if (!isWithinRadius && wasWithinRadiusRef.current) {
//         wasWithinRadiusRef.current = false;
//         if (numOfMyLikes === 0) {
//           setStatus("sad");

//           window.setTimeout(() => {
//             setStatus((status) => {
//               if (status === "sad") {
//                 return "slightly-happy";
//               } else {
//                 return status;
//               }
//             });
//           }, 3000);
//         }
//       }
//     }
//   }, [isWithinRadius, numOfMyLikes, status, setStatus]);
// };

// const useBodyRotation = (
//   size,
//   svgBoundingBox,
//   cursorPoint,
//   prefersReducedMotion
// ) => {
//   const bodyRotationRaw = getBodyRotation(size, svgBoundingBox, cursorPoint);

//   const rotation = prefersReducedMotion ? 0 : bodyRotationRaw;

//   return useSpring({
//     transform: `rotate(${rotation}deg)`,
//   });
// };

// // This hook provides values for the way the button reacts to mousemove.
// // The eyes translate around, the overall shape rotates.
// const useEyePosition = (
//   size,
//   svgBoundingBox,
//   cursorPoint,
//   prefersReducedMotion
// ) => {
//   const eyeTranslationRaw = getEyeTranslation(
//     size,
//     svgBoundingBox,
//     cursorPoint
//   ) || { x: 0, y: 0 };

//   const spring = useSpring({
//     x: prefersReducedMotion ? 0 : eyeTranslationRaw.x,
//     y: prefersReducedMotion ? 0 : eyeTranslationRaw.y,
//   });

//   return spring;
// };

// // This hook controls the status of the button
// // There are 3 statuses:
// // - super-happy - When liked
// // - slightly-happy - the default state. Slight slime
// // - sad - a temporary status, persists for 2s after being untoggled.
// const useStatus = (numOfMyLikes, size, svgBoundingBox, cursorPoint) => {
//   const defaultStatus =
//     numOfMyLikes === MAX_NUM_OF_LIKES ? "super-happy" : "slightly-happy";

//   const [status, setStatus] = React.useState(defaultStatus);

//   useFrownIfDisengaged(
//     size,
//     svgBoundingBox,
//     cursorPoint,
//     numOfMyLikes,
//     status,
//     setStatus
//   );

//   return [status, setStatus];
// };

// // This hook controls the transition between the `slightly-happy` and `sad`
// // statuses.
// const useMouthControlPoint = (status) => {
//   // When our button is not liked, it has a quadratic curve for a mouth.
//   // That curve can be pointing down, when 'slightly-happy', or up, when 'sad'.
//   // We want to animate that transition, so we'll interpolate the point that
//   // controls that quadratic Bezier curve.
//   const happyControlPosition = VIEWBOX_HEIGHT * 0.8;
//   const sadControlPosition = VIEWBOX_HEIGHT * 0.6;

//   const getPosition = (status) =>
//     status === "sad" ? sadControlPosition : happyControlPosition;

//   const defaultPosition = getPosition(status);

//   const spring = useSpring({
//     position: defaultPosition,
//     config: FAST_SPRING,
//   });

//   return spring;
// };

// //
// //
// // Ok! This is the actual component here:
// const LikeButton = ({
//   size = 48,
//   numOfMyLikes,
//   onLike,
//   onUnlike,
//   onMaxLike,
// }) => {
//   const { current: id } = React.useRef(generateId());

//   const prefersReducedMotion = usePrefersReducedMotion();

//   const [svgNode, svgBoundingBox] = useBoundingBox();

//   const cursorPoint = useMousePositionWhenNearElement({
//     boundingBox: svgBoundingBox,
//     radius: size * 3,
//   });

//   const bodyStyle = useBodyRotation(
//     size,
//     svgBoundingBox,
//     cursorPoint,
//     prefersReducedMotion
//   );

//   const [status, setStatus] = useStatus(
//     numOfMyLikes,
//     size,
//     svgBoundingBox,
//     cursorPoint
//   );

//   // Magnification controls the zoom on mouseover/click.
//   // TODO: Turn this into a custom hook, might be a good candidate for
//   // `useReducer`
//   const [magnification, setMagnification] = React.useState(1);

//   const width = size;
//   const height = width * 0.84;

//   return (
//     <UnstyledButton
//       // TODO: Touch support
//       onMouseEnter={() => setMagnification(1.1)}
//       onMouseLeave={() => setMagnification(1)}
//       onMouseDown={(ev) => {
//         if (ev.buttons === 1) {
//           setMagnification(1.2);
//         }
//       }}
//       onMouseUp={() => setMagnification(1.1)}
//       onClick={() => {
//         if (numOfMyLikes < MAX_NUM_OF_LIKES) {
//           onLike();
//           setStatus(
//             numOfMyLikes + 1 === MAX_NUM_OF_LIKES
//               ? "super-happy"
//               : "slightly-happy"
//           );
//         } else {
//           onMaxLike();
//         }
//       }}
//       onContextMenu={(ev) => {
//         ev.preventDefault();
//         if (numOfMyLikes > 0) {
//           onUnlike();
//         }

//         setStatus("sad");
//       }}
//       style={{
//         transform: `scale(${prefersReducedMotion ? 1 : magnification})`,
//         transition: "transform 250ms",
//       }}
//     >
//       <VisuallyHidden>"Like" this post</VisuallyHidden>
//       <animated.svg
//         ref={svgNode}
//         width={size}
//         height={height}
//         viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
//         fill="none"
//         style={bodyStyle}
//       >
//         <GradientsAndMasks
//           id={id}
//           numOfMyLikes={numOfMyLikes}
//           prefersReducedMotion={prefersReducedMotion}
//         />

//         {/* Backgrounds */}
//         <g mask={`url(#like-button-mask-${id})`}>
//           <path
//             d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
//             fill={`url(#inactive-gradient-${id})`}
//           />
//           <g mask={`url(#active-gradient-mask-${id})`}>
//             <path
//               d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
//               fill={`url(#active-gradient-${id})`}
//             />
//           </g>

//           <Eyes
//             status={status}
//             svgBoundingBox={svgBoundingBox}
//             size={size}
//             cursorPoint={cursorPoint}
//             prefersReducedMotion={prefersReducedMotion}
//           />

//           <Mouth status={status} hasMaxed={numOfMyLikes === MAX_NUM_OF_LIKES} />

//           <Effects />
//         </g>
//       </animated.svg>
//     </UnstyledButton>
//   );
// };

// const Effects = () => (
//   <g>
//     <path
//       d="M53.5 18.5L47 5C47 5 53.5 31.9722 24.5 36C-4.5 40.0278 1 1.5 1 1.5L-6.5 25L8.00002 44.5L15.5 52L39 49L53.5 18.5Z"
//       fill="black"
//       fillOpacity="0.1"
//     />
//     <path
//       d="M6.14471 8.44525C6.64924 7.12038 7.41962 5.99208 8.36394 5.15003C9.30652 4.30953 10.3901 3.78182 11.5089 3.58622"
//       stroke="white"
//       strokeOpacity="0.45"
//       strokeWidth="3"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M31.7084 5.95975C32.7822 4.70067 34.1021 3.81419 35.484 3.37609"
//       stroke="white"
//       strokeOpacity="0.45"
//       strokeWidth="3"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </g>
// );

// const GradientsAndMasks = React.memo(
//   ({ id, numOfMyLikes, prefersReducedMotion }) => {
//     const pinkFillSpring = useFillingUpAnimation(
//       numOfMyLikes,
//       prefersReducedMotion
//     );

//     return (
//       <>
//         <defs>
//           {/* "Filled" gradient (pink and red) */}
//           <linearGradient
//             id={`active-gradient-${id}`}
//             x1="25"
//             y1="42"
//             x2="26.3796"
//             y2="0.0453673"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop stopColor="hsl(353deg, 100%, 52%)" />
//             <stop offset="1" stopColor="hsl(313deg, 100%, 52%)" />
//           </linearGradient>
//           <linearGradient
//             id={`inactive-gradient-${id}`}
//             x1="15"
//             y1="41"
//             x2="42"
//             y2="-1.5"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop stopColor="#666" stopOpacity={0.4} />
//             <stop offset="1" stopColor="#AAA" stopOpacity={0.4} />
//           </linearGradient>
//         </defs>

//         {/*
//           This mask is essentially `overflow: hidden` for the heart outline.
//           It helps make sure our wide-sweeping lower shadow only shows on
//           the heart.
//         */}
//         <mask
//           id={`like-button-mask-${id}`}
//           mask-type="alpha"
//           maskUnits="userSpaceOnUse"
//           x="0"
//           y="0"
//           width={VIEWBOX_WIDTH}
//           height={VIEWBOX_HEIGHT}
//         >
//           <path
//             d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
//             fill="#000000"
//           />
//         </mask>

//         <mask
//           id={`active-gradient-mask-${id}`}
//           mask-type="alpha"
//           maskUnits="userSpaceOnUse"
//           x="0"
//           y="0"
//           width={VIEWBOX_WIDTH}
//           height={VIEWBOX_HEIGHT}
//         >
//           <animated.polygon
//             points={pinkFillSpring.amount.to(
//               (height) => `
//                 0,${VIEWBOX_HEIGHT}
//                 ${VIEWBOX_WIDTH},${VIEWBOX_HEIGHT}
//                 ${VIEWBOX_WIDTH},${height}
//                 0,${height}
//               `
//             )}
//             fill="#000000"
//           />
//         </mask>
//       </>
//     );
//   }
// );

// const Mouth = React.memo(({ status, hasMaxed }) => {
//   const spring = useMouthControlPoint(status);

//   return (
//     <g>
//       <mask
//         id="tongue-mask"
//         mask-type="alpha"
//         maskUnits="userSpaceOnUse"
//         x="20"
//         y="27"
//         width="11"
//         height="6"
//       >
//         <path
//           d="M28.3333 27H21.6666C21.6666 27 20.0001 27 20 29C19.9999 31 22.3875 33 25 33C27.6125 33 30 31 30 29C30 27 28.3333 27 28.3333 27Z"
//           fill="#000000"
//           fillOpacity="0.4"
//         />
//       </mask>
//       {/* Really-happy mouth */}
//       <g
//         mask="url(#tongue-mask)"
//         style={{
//           opacity: hasMaxed ? 1 : 0,
//         }}
//       >
//         <path
//           d="M28.3333 27H21.6666C21.6666 27 20.0001 27 20 29C19.9999 31 22.3875 33 25 33C27.6125 33 30 31 30 29C30 27 28.3333 27 28.3333 27Z"
//           fill="#000000"
//           fillOpacity="1"
//         />
//         <circle cx="25" cy="35" r="5" fill="#DB2C49" fillOpacity={0.5} />
//       </g>
//       {/* Happy/Sad inverting mouth */}
//       <animated.path
//         d={spring.position.to(
//           (y) => `
//             M 20 30
//             Q 25 ${y} 30 30
//           `
//         )}
//         stroke="#000000"
//         strokeOpacity="0.4"
//         strokeLinecap="round"
//         style={{
//           opacity: !hasMaxed ? 1 : 0,
//         }}
//       />
//     </g>
//   );
// });

// const Eyes = React.memo(
//   ({ status, size, svgBoundingBox, cursorPoint, prefersReducedMotion }) => {
//     const eyePosition = useEyePosition(
//       size,
//       svgBoundingBox,
//       cursorPoint,
//       prefersReducedMotion
//     );

//     return (
//       <>
//         {/* eyes - default */}
//         <animated.g
//           style={{
//             opacity: status === "super-happy" ? 0 : 1,
//             transform: to(
//               [eyePosition.x, eyePosition.y],
//               (x, y) => `translate(${x}px, ${y}px)`
//             ),
//           }}
//         >
//           <circle cx="15" cy="22" r="2" fill="#000000" fillOpacity="0.4" />
//           <circle cx="35" cy="22" r="2" fill="#000000" fillOpacity="0.4" />
//         </animated.g>
//         {/* Eyes - extra happy */}
//         <g
//           style={{
//             opacity: status === "super-happy" ? 1 : 0,
//           }}
//         >
//           <path
//             d={`M 13 23 Q 15 19, 17 23 `}
//             stroke="#000000"
//             strokeOpacity="0.4"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//           />
//           <path
//             d={`M 33 23 Q 35 19, 37 23 `}
//             stroke="#000000"
//             strokeOpacity="0.4"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//           />
//         </g>
//       </>
//     );
//   }
// );

// export default LikeButton;




import React from "react";
import { useSpring, animated, to } from "react-spring";
import { MAX_NUM_OF_LIKES } from "@/constants";
import useMousePositionWhenNearElement from "@/hooks/use-mouse-position-when-near-element.hook";
import useBoundingBox from "@/hooks/use-bounding-box.hook";
import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion.hook";
import { generateId } from "@/utils";
import UnstyledButton from "../UnstyledButton";
import VisuallyHidden from "@/components/VisuallyHidden";

import {
  getBodyRotation,
  getEyeTranslation,
  getIsWithinRadius,
} from "./LikeButton.helpers";

// NOTE: These constants are provided as a convenience, but they are *NOT*
// used throughout. This means you can't change these values and expect
// everything to scale properly :( sorry about that!
const VIEWBOX_WIDTH = 50;
const VIEWBOX_HEIGHT = 42;

const FAST_SPRING = { tension: 1270, friction: 200 };

// This hook controls the masking to show the pink/red background.
const useFillingUpAnimation = (numOfMyLikes, prefersReducedMotion) => {
  const progress = numOfMyLikes / MAX_NUM_OF_LIKES;

  const skewedProgress = 0.75 * Math.log10(progress * 1.75) + 0.818;

  const spring = useSpring({
    amount:
      numOfMyLikes === 0
        ? VIEWBOX_HEIGHT
        : VIEWBOX_HEIGHT - skewedProgress * VIEWBOX_HEIGHT,
    config: FAST_SPRING,
    immediate: prefersReducedMotion,
  });

  return spring;
};

const useFrownIfDisengaged = (
  size,
  svgBoundingBox,
  cursorPoint,
  numOfMyLikes,
  status,
  setStatus
) => {
  const wasWithinRadiusRef = React.useRef(false);
  const isWithinRadius = getIsWithinRadius(size, svgBoundingBox, cursorPoint);

  React.useEffect(() => {
    if (isWithinRadius) {
      wasWithinRadiusRef.current = true;
    } else {
      if (!isWithinRadius && wasWithinRadiusRef.current) {
        wasWithinRadiusRef.current = false;
        if (numOfMyLikes === 0) {
          setStatus("sad");

          window.setTimeout(() => {
            setStatus((status) => {
              if (status === "sad") {
                return "slightly-happy";
              } else {
                return status;
              }
            });
          }, 3000);
        }
      }
    }
  }, [isWithinRadius, numOfMyLikes, status, setStatus]);
};

const useBodyRotation = (
  size,
  svgBoundingBox,
  cursorPoint,
  prefersReducedMotion
) => {
  const bodyRotationRaw = getBodyRotation(size, svgBoundingBox, cursorPoint);

  const rotation = prefersReducedMotion ? 0 : bodyRotationRaw;

  return useSpring({
    transform: `rotate(${rotation}deg)`,
  });
};

// This hook provides values for the way the button reacts to mousemove.
// The eyes translate around, the overall shape rotates.
const useEyePosition = (
  size,
  svgBoundingBox,
  cursorPoint,
  prefersReducedMotion
) => {
  const eyeTranslationRaw = getEyeTranslation(
    size,
    svgBoundingBox,
    cursorPoint
  ) || { x: 0, y: 0 };

  const spring = useSpring({
    x: prefersReducedMotion ? 0 : eyeTranslationRaw.x,
    y: prefersReducedMotion ? 0 : eyeTranslationRaw.y,
  });

  return spring;
};

// This hook controls the status of the button
// There are 3 statuses:
// - super-happy - When liked
// - slightly-happy - the default state. Slight slime
// - sad - a temporary status, persists for 2s after being untoggled.
const useStatus = (numOfMyLikes, size, svgBoundingBox, cursorPoint) => {
  const defaultStatus =
    numOfMyLikes === MAX_NUM_OF_LIKES ? "super-happy" : "slightly-happy";

  const [status, setStatus] = React.useState(defaultStatus);

  useFrownIfDisengaged(
    size,
    svgBoundingBox,
    cursorPoint,
    numOfMyLikes,
    status,
    setStatus
  );

  return [status, setStatus];
};

// This hook controls the transition between the `slightly-happy` and `sad`
// statuses.
const useMouthControlPoint = (status) => {
  // When our button is not liked, it has a quadratic curve for a mouth.
  // That curve can be pointing down, when 'slightly-happy', or up, when 'sad'.
  // We want to animate that transition, so we'll interpolate the point that
  // controls that quadratic Bezier curve.
  const happyControlPosition = VIEWBOX_HEIGHT * 0.8;
  const sadControlPosition = VIEWBOX_HEIGHT * 0.6;

  const getPosition = (status) =>
    status === "sad" ? sadControlPosition : happyControlPosition;

  const defaultPosition = getPosition(status);

  const spring = useSpring({
    position: defaultPosition,
    config: FAST_SPRING,
  });

  return spring;
};

//
//
// Ok! This is the actual component here:
const LikeButton = ({
  size = 48,
  numOfMyLikes,
  onLike,
  onUnlike,
  onMaxLike,
}) => {
  const { current: id } = React.useRef(generateId());

  const prefersReducedMotion = usePrefersReducedMotion();

  const [svgNode, svgBoundingBox] = useBoundingBox();

  const cursorPoint = useMousePositionWhenNearElement({
    boundingBox: svgBoundingBox,
    radius: size * 3,
  });

  const bodyStyle = useBodyRotation(
    size,
    svgBoundingBox,
    cursorPoint,
    prefersReducedMotion
  );

  const [status, setStatus] = useStatus(
    numOfMyLikes,
    size,
    svgBoundingBox,
    cursorPoint
  );

  // Magnification controls the zoom on mouseover/click.
  // TODO: Turn this into a custom hook, might be a good candidate for
  // `useReducer`
  const [magnification, setMagnification] = React.useState(1);

  const width = size;
  const height = width * 0.84;

  return (
    <UnstyledButton
      // TODO: Touch support
      onMouseEnter={() => setMagnification(1.1)}
      onMouseLeave={() => setMagnification(1)}
      onMouseDown={(ev) => {
        if (ev.buttons === 1) {
          setMagnification(1.2);
        }
      }}
      onMouseUp={() => setMagnification(1.1)}
      onClick={() => {
        if (numOfMyLikes < MAX_NUM_OF_LIKES) {
          onLike();
          setStatus(
            numOfMyLikes + 1 === MAX_NUM_OF_LIKES
              ? "super-happy"
              : "slightly-happy"
          );
        } else {
          onMaxLike();
        }
      }}
      onContextMenu={(ev) => {
        ev.preventDefault();
        if (numOfMyLikes > 0) {
          onUnlike();
        }

        setStatus("sad");
      }}
      style={{
        transform: `scale(${prefersReducedMotion ? 1 : magnification})`,
        transition: "transform 250ms",
      }}
    >
      <VisuallyHidden>"Like" this post</VisuallyHidden>
      <animated.svg
        ref={svgNode}
        width={size}
        height={height}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        fill="none"
        style={bodyStyle}
      >
        <GradientsAndMasks
          id={id}
          numOfMyLikes={numOfMyLikes}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Backgrounds */}
        <g mask={`url(#like-button-mask-${id})`}>
          <path
            d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
            fill={`url(#inactive-gradient-${id})`}
          />
          <g mask={`url(#active-gradient-mask-${id})`}>
            <path
              d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
              fill={`url(#active-gradient-${id})`}
            />
          </g>

          <Eyes
            status={status}
            svgBoundingBox={svgBoundingBox}
            size={size}
            cursorPoint={cursorPoint}
            prefersReducedMotion={prefersReducedMotion}
          />

          <Mouth status={status} hasMaxed={numOfMyLikes === MAX_NUM_OF_LIKES} />

          <Effects />
        </g>
      </animated.svg>
    </UnstyledButton>
  );
};

const Effects = () => (
  <g>
    <path
      d="M53.5 18.5L47 5C47 5 53.5 31.9722 24.5 36C-4.5 40.0278 1 1.5 1 1.5L-6.5 25L8.00002 44.5L15.5 52L39 49L53.5 18.5Z"
      fill="black"
      fillOpacity="0.1"
    />
    <path
      d="M6.14471 8.44525C6.64924 7.12038 7.41962 5.99208 8.36394 5.15003C9.30652 4.30953 10.3901 3.78182 11.5089 3.58622"
      stroke="white"
      strokeOpacity="0.45"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M31.7084 5.95975C32.7822 4.70067 34.1021 3.81419 35.484 3.37609"
      stroke="white"
      strokeOpacity="0.45"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
);

const GradientsAndMasks = React.memo(
  ({ id, numOfMyLikes, prefersReducedMotion }) => {
    const pinkFillSpring = useFillingUpAnimation(
      numOfMyLikes,
      prefersReducedMotion
    );

    return (
      <>
        <defs>
          {/* "Filled" gradient (pink and red) */}
          <linearGradient
            id={`active-gradient-${id}`}
            x1="25"
            y1="42"
            x2="26.3796"
            y2="0.0453673"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="hsl(353deg, 100%, 52%)" />
            <stop offset="1" stopColor="hsl(313deg, 100%, 52%)" />
          </linearGradient>
          <linearGradient
            id={`inactive-gradient-${id}`}
            x1="15"
            y1="41"
            x2="42"
            y2="-1.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#666" stopOpacity={0.4} />
            <stop offset="1" stopColor="#AAA" stopOpacity={0.4} />
          </linearGradient>
        </defs>

        {/*
          This mask is essentially `overflow: hidden` for the heart outline.
          It helps make sure our wide-sweeping lower shadow only shows on
          the heart.
        */}
        <mask
          id={`like-button-mask-${id}`}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
        >
          <path
            d="M13.2537 0.0255029C23.4033 0.0255029 25.0273 10.5191 25.0273 10.5191C25.0273 10.5191 26.6512 -0.60088 37.6129 0.0255029C44.3441 0.410148 48.7484 6.32169 48.9804 12.1981C49.7924 32.7656 28.7678 41.5 25.0273 41.5C21.2868 41.5 -0.549833 32.3459 1.07416 12.1981C1.54782 6.32169 6.29929 0.0255029 13.2537 0.0255029Z"
            fill="#000000"
          />
        </mask>

        <mask
          id={`active-gradient-mask-${id}`}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
        >
          <animated.polygon
            points={pinkFillSpring.amount.to(
              (height) => `
                0,${VIEWBOX_HEIGHT}
                ${VIEWBOX_WIDTH},${VIEWBOX_HEIGHT}
                ${VIEWBOX_WIDTH},${height}
                0,${height}
              `
            )}
            fill="#000000"
          />
        </mask>
      </>
    );
  }
);

const Mouth = React.memo(({ status, hasMaxed }) => {
  const spring = useMouthControlPoint(status);

  return (
    <g>
      <mask
        id="tongue-mask"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="20"
        y="27"
        width="11"
        height="6"
      >
        <path
          d="M28.3333 27H21.6666C21.6666 27 20.0001 27 20 29C19.9999 31 22.3875 33 25 33C27.6125 33 30 31 30 29C30 27 28.3333 27 28.3333 27Z"
          fill="#000000"
          fillOpacity="0.4"
        />
      </mask>
      {/* Really-happy mouth */}
      <g
        mask="url(#tongue-mask)"
        style={{
          opacity: hasMaxed ? 1 : 0,
        }}
      >
        <path
          d="M28.3333 27H21.6666C21.6666 27 20.0001 27 20 29C19.9999 31 22.3875 33 25 33C27.6125 33 30 31 30 29C30 27 28.3333 27 28.3333 27Z"
          fill="#000000"
          fillOpacity="1"
        />
        <circle cx="25" cy="35" r="5" fill="#DB2C49" fillOpacity={0.5} />
      </g>
      {/* Happy/Sad inverting mouth */}
      <animated.path
        d={spring.position.to(
          (y) => `
            M 20 30
            Q 25 ${y} 30 30
          `
        )}
        stroke="#000000"
        strokeOpacity="0.4"
        strokeLinecap="round"
        style={{
          opacity: !hasMaxed ? 1 : 0,
        }}
      />
    </g>
  );
});

const Eyes = React.memo(
  ({ status, size, svgBoundingBox, cursorPoint, prefersReducedMotion }) => {
    const eyePosition = useEyePosition(
      size,
      svgBoundingBox,
      cursorPoint,
      prefersReducedMotion
    );

    return (
      <>
        {/* eyes - default */}
        <animated.g
          style={{
            opacity: status === "super-happy" ? 0 : 1,
            transform: to(
              [eyePosition.x, eyePosition.y],
              (x, y) => `translate(${x}px, ${y}px)`
            ),
          }}
        >
          <circle cx="15" cy="22" r="2" fill="#000000" fillOpacity="0.4" />
          <circle cx="35" cy="22" r="2" fill="#000000" fillOpacity="0.4" />
        </animated.g>
        {/* Eyes - extra happy */}
        <g
          style={{
            opacity: status === "super-happy" ? 1 : 0,
          }}
        >
          <path
            d={`M 13 23 Q 15 19, 17 23 `}
            stroke="#000000"
            strokeOpacity="0.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <path
            d={`M 33 23 Q 35 19, 37 23 `}
            stroke="#000000"
            strokeOpacity="0.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </g>
      </>
    );
  }
);

export default LikeButton;
