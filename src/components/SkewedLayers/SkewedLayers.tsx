import React from "react";
import styled from "styled-components";

import UnstyledButton from "@/components/UnstyledButton";
import Layer from "./Layer";
import { Step } from "./types";

type Layer = {
  name: string;
  contents: any;
};

interface Props {
  layerWidth: number;
  layers: Array<Layer>;
  mode: "auto" | "interactive";
}

const SkewedLayers = ({ layerWidth = 250, layers, mode = "auto" }: Props) => {
  const [step, setStep] = React.useState<Step>("initial");

  const handleMouseEnter = () => {
    if (mode === "auto") {
      return;
    }
    setStep("transitioning");
  };

  const handleMouseLeave = () => {
    if (mode === "auto") {
      return;
    }
    setStep("initial");
  };

  React.useEffect(() => {
    if (mode === "auto") {
      return;
    }

    let timeoutId;

    switch (step) {
      case "transitioning": {
        timeoutId = window.setTimeout(() => {
          setStep("split");
        }, 500);
        break;
      }
    }

    return () => window.clearTimeout(timeoutId);
  }, [step]);

  React.useEffect(() => {
    if (mode === "interactive") {
      return;
    }

    let nextStep, duration;
    if (step === "initial") {
      nextStep = "transitioning";
      duration = 2000;
    } else if (step === "transitioning") {
      nextStep = "split";
      duration = 250;
    } else if (step === "split") {
      nextStep = "reverting";
      duration = 1750;
    } else {
      nextStep = "initial";
      duration = 250;
    }

    const timeoutId = window.setTimeout(() => {
      setStep(nextStep);
    }, duration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [mode, step]);

  return (
    <OuterWrapper>
      <Wrapper
        as={mode === "interactive" ? UnstyledButton : "div"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        style={{ cursor: mode === "auto" && "default" }}
      >
        {layers.map((layer, index) => {
          return (
            <Layer
              key={index}
              index={index}
              name={layer.name}
              width={layerWidth}
              step={step}
              mode={mode}
              numOfLayers={layers.length}
            >
              {layer.contents}
            </Layer>
          );
        })}
      </Wrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 128px 0 64px;
`;

const Wrapper = styled(UnstyledButton)`
  position: relative;
  isolation: isolate;
`;

export default SkewedLayers;
