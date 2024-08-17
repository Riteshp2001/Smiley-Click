import React from "react";
import styled from "styled-components";
import { Play } from "react-feather";

import { DARK_COLORS } from "@/constants";

import UnstyledButton from "@/components/UnstyledButton";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

function MiniGlowingPlayButton({ ...delegated }: Props) {
  return (
    <Wrapper>
      <Button
        {...delegated}
        style={{
          "--default-y": "-2px",
          "--hover-y": "-2px",
          "--active-y": "0px",
        }}
      >
        <Shaft />
        <Front>
          <Play size={14} style={{ transform: "translate(1px, 0px)" }} />
        </Front>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
  width: var(--play-button-size, 28px);
  height: var(--play-button-size, 28px);
  border-radius: 100px;
  background: linear-gradient(
    to top,
    var(--color-gray-600),
    var(--color-background)
  );
  isolation: isolate;
  vertical-align: middle;

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: ${DARK_COLORS.background};
    border-radius: 1000px;
  }
`;

const Button = styled(UnstyledButton)`
  position: absolute;
  inset: 0;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  margin: auto;
  border-radius: 1000px; /* for the focus outline */
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:focus-visible {
    outline-offset: 6px;
    outline-color: hsl(150deg 100% 60%);
  }

  filter: brightness(95%) contrast(1);
  transition: filter 300ms;

  &:hover {
    filter: brightness(105%) contrast(1.05);
  }
`;

const Front = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 100px;
  color: hsl(150deg 100% 28%);
  background: hsl(150deg 100% 60%);
  background: radial-gradient(
    circle at 50% 50%,
    hsl(150deg 100% 60%) 0%,
    hsl(150deg 100% 60%) 60%,
    hsl(150deg 100% 30%) 70%,
    hsl(150deg 100% 30%) 100%
  );
  overflow: hidden;
  transform: translateY(var(--default-y));
  transition: transform 400ms cubic-bezier(0.17, 0.67, 0.5, 1);

  ${Button}:hover & {
    transform: translateY(var(--hover-y));
    transition: transform 400ms;
  }

  ${Button}:active & {
    transform: translateY(var(--active-y));
    transition: transform 0ms;
  }

  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 4px;
    right: 4px;
    height: calc(50% - 4px);
    background: white;
    border-radius: 1000px 1000px 10px 10px;
    filter: blur(4px);
    opacity: 1;
    transition: all 200ms;

    ${Button}:hover & {
      opacity: 1;
    }
  }

  svg {
    display: block;
  }
`;

const Shaft = styled.span`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 100px;
  background: hsl(150deg 100% 30%);
  background: radial-gradient(
    circle at 50% 40%,
    hsl(150deg 100% 30%) 0% 65%,
    hsl(150deg 100% 10%) 80% 100%
  );
`;

export default MiniGlowingPlayButton;
