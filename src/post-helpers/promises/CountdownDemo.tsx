import React from "react";
import styled, { keyframes } from "styled-components";

import Spinner from "@/components/Spinner";

type Step = 0 | 1 | 2 | 3 | 4;

function CountdownDemo() {
  const [step, setStep] = React.useState<Step>(0);

  React.useEffect(() => {
    if (step === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      const nextStep = step + 1;
      if (nextStep >= 5) {
        return;
      }

      setStep(nextStep as Step);
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [step]);

  const isRunning = step > 0 && step < 4;
  const value = values[step];

  return (
    <Wrapper>
      <Value>
        {isRunning ? <FadeVal key={value}>{value}</FadeVal> : value}
      </Value>
      <Button disabled={isRunning} onClick={() => setStep(1)}>
        {step === 0 && "Start Countdown"}
        {isRunning && (
          <>
            <Spinner color="inherit" size={14} /> Running…
          </>
        )}
        {step >= 4 && "Restart"}
      </Button>
    </Wrapper>
  );
}

const values = ["––", "3", "2", "1", "Happy New Year! 🎉"];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 32px;
  border: 1px solid var(--color-gray-300);
  margin-bottom: 48px;
  margin-inline: auto;
  max-width: 450px;
  border-radius: 8px;
`;

const Value = styled.p`
  font-size: 1.625rem;
  text-align: center;
`;

const Button = styled.button`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 200px;
  max-width: 100%;
  color: black;
`;

const fadeDown = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0.2;
  }
`;

const FadeVal = styled.span`
  animation: ${fadeDown} 1000ms cubic-bezier(0.4, 0.01, 0.98, 0.49);
`;

export default CountdownDemo;
