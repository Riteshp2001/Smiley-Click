import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { TIGHT_SPRING } from '@/constants';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion.hook';

import InPortal from '../InPortal';
import Tip from './Tip';

const Dropdown = React.forwardRef(
  ({ isVisible, triggerBB, children }, ref) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const spring = useSpring({
      from: {
        opacity: 0,
        transform: 'translateY(-8px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0px)',
      },
      config: TIGHT_SPRING,
      immediate: prefersReducedMotion,
    });

    const top = triggerBB.bottom + 20;
    const left = triggerBB.left - 24;

    return (
      <InPortal id="nav-tooltip-portal">
        {isVisible && children && (
          <DropdownElem
            ref={ref}
            style={{
              ...spring,
              top,
              left,
            }}
          >
            <TippyTip />
            {children}
          </DropdownElem>
        )}
      </InPortal>
    );
  }
);

const DropdownElem = styled(animated.div)`
  position: fixed;
  z-index: 1000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 8px;
  grid-column-gap: 32px;
  padding: 16px 24px;
  border-radius: 12px;
  background: white;
  will-change: transform;
  /* prettier-ignore */
  filter:
    drop-shadow(0 -5.9px 2.7px hsl(var(--dropdown-shadow-color, 0deg 0% 0%) / 0.025))
    drop-shadow(0 -1.2px 6.9px hsl(var(--dropdown-shadow-color, 0deg 0% 0%) / 0.025))
    drop-shadow(0 8px 14.2px hsl(var(--dropdown-shadow-color, 0deg 0% 0%) / 0.05))
    drop-shadow(0 21.9px 29.2px hsl(var(--dropdown-shadow-color, 0deg 0% 0%) / 0.05))
    drop-shadow(0 49px 80px hsl(var(--dropdown-shadow-color, 0deg 0% 0%) / 0.07))
  ;
`;

const TippyTip = styled(Tip)`
  position: absolute;
  left: 25px;
  top: -11.5px;
`;

export default Dropdown;
