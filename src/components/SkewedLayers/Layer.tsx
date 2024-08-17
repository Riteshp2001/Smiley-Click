import React from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

import { normalize } from "@/utils";

import { Step } from "./types";

interface Props {
  index: number;
  name: string;
  width: number;
  step: Step;
  numOfLayers: number;
  mode: "auto" | "interactive";
  children: any;
}

const Layer = ({
  index,
  name,
  width,
  step,
  numOfLayers,
  mode,
  children,
}: Props) => {
  const [isHovering, setIsHovering] = React.useState(false);

  const Wrapper = index === 0 ? FirstLayer : StandardLayer;
  const offset =
    step === "initial" ? 0 : normalize(index, 0, numOfLayers - 1, 50, -50);

  const Label = TopLabel;

  const style = useSpring({
    transform: `translate(${offset}%) skewY(20deg)`,
    opacity:
      mode === "auto" ||
      isHovering ||
      step === "initial" ||
      step === "transitioning"
        ? 1
        : 0.5,
  });

  const showLabel = (isHovering || mode === "auto") && step === "split";

  return (
    <Wrapper
      key={name}
      style={{
        width: width,
        ...style,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Label style={{ opacity: showLabel ? 1 : 0 }}>
        <LabelText>{name}</LabelText>
      </Label>
      {children}
    </Wrapper>
  );
};

const StandardLayer = styled(animated.span)`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
  cursor: default;
`;
const FirstLayer = styled(animated.span)`
  display: block;
  position: relative;
  will-change: transform;
`;

const Label = styled.div`
  position: absolute;
  height: 48px;
  width: 1px;
  background: black;
  transition: opacity 300ms;
  will-change: opacity;
`;

const TopLabel = styled(Label)`
  top: 0;
  left: 25%;
  transform: translateY(-100%);
`;

const LabelText = styled.div`
  position: absolute;
  transform: skewY(-20deg) translateX(-50%);
  width: max-content;

  ${TopLabel} & {
    top: -32px;
    transform-origin: top left;
  }
`;

export default Layer;
