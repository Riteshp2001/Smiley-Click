import React from "react";
import styled, { keyframes } from "styled-components";
import { X } from "react-feather";

import { fadeIn } from "@/helpers/animation.helpers";

import UnstyledButton from "@/components/UnstyledButton";
import VisuallyHidden from "@/components/VisuallyHidden";
import Sparkles from "@/components/Sparkles";
import Em from "@/components/Em";

interface Props {
  status: "show-full-fat" | "show-quick";
  handleDismiss: () => void;
}

const SaleSuperheader = ({ status, handleDismiss }: Props) => {
  return (
    <Wrapper data-full-fat={String(status === "show-full-fat")}>
      <Side></Side>
      <Link
        href="https://www.joyofreact.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text>
          <strong>🌸 I’m having a Spring Sale!</strong> Get my interactive React
          course for <Em>$200 off</Em>.
        </Text>
      </Link>
      <Side>
        <CloseBtn
          type="button"
          onClick={(ev) => {
            ev.stopPropagation();
            handleDismiss();
          }}
        >
          <X />
          <VisuallyHidden>Dismiss</VisuallyHidden>
        </CloseBtn>
      </Side>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  --height: 3rem;
  --color-background: hsl(250deg 100% 85%);

  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  align-items: center;
  min-height: var(--height);
  background: linear-gradient(
    -3deg,
    hsl(250deg 100% 80%),
    hsl(270deg 100% 90%)
  );
  color: black;
  /* The default animation, used for subsequent page loads / for reduced-motion users */
  animation: fadeIn 300ms;

  @keyframes superheaderSlideIn {
    from {
      transform: translateY(-100%);
    }
  }
  @media (prefers-reduced-motion: no-preference) {
    &[data-full-fat="true"] {
      animation: superheaderSlideIn 950ms 200ms both
        cubic-bezier(0.1, 0.78, 0.42, 1);
    }
  }

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    display: none;
  }
`;

const Side = styled.div`
  flex-basis: var(--height);
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
`;

const wipeIn = keyframes`
  from {
    clip-path: polygon(-5% 0%, -5% 0%, 0% 100%, -5% 100%);
  }
  to {
    clip-path: polygon(0% 0%, 100% 0%, 105% 100%, 0% 100%);
  }
`;

const Link = styled.a`
  line-height: 1.6;
  flex: 1;
  padding: 8px 0px;
  color: inherit;
  text-decoration: none;
  text-align: center;
`;

const Text = styled.span`
  display: inline-block;

  @media (prefers-reduced-motion: no-preference) {
    ${Wrapper}[data-full-fat='true'] & {
      animation: ${wipeIn} 1200ms both cubic-bezier(0.27, 0.2, 0.2, 1);
      animation-delay: 500ms;
    }
  }
`;

const CloseBtn = styled(UnstyledButton)`
  color: black;

  ${Wrapper}[data-full-fat='true'] & {
    animation: ${fadeIn} 500ms 1400ms both;
  }
`;

export default SaleSuperheader;
