"use client";

import * as React from "react";
import styled from "styled-components";

import FadeOnChange from "@/components/FadeOnChange";
import UnstyledButton from "@/components/UnstyledButton";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  initialValue?: string;
  values: Array<string>;
}

type Status = "initial" | "running";

function CycleTextOnClick({
  initialValue = "________",
  values,
  onClick,
  ...rest
}: Props) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(-1);
  const [status, setStatus] = React.useState<Status>("initial");

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Wrapper
      {...rest}
      ref={ref}
      onClick={(ev) => {
        if (onClick) {
          onClick(ev);
        }

        if (status === "initial") {
          setStatus("running");
        }

        setCurrentIndex((currentIndex + 1) % values.length);
      }}
    >
      <FadeOnChange>
        {status === "initial" ? initialValue : values[currentIndex]}
      </FadeOnChange>
    </Wrapper>
  );
}

const Wrapper = styled(UnstyledButton)`
  display: inline;
`;

export default React.memo(CycleTextOnClick);
