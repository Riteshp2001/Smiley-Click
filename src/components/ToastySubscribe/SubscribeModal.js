import React from 'react';
import { useSpring, animated } from 'react-spring';
import { DialogOverlay, DialogContent } from '@/reach/dialog';
import styled, { keyframes } from 'styled-components';
import { X as XIcon, ArrowLeft } from 'react-feather';

import { CONVERTKIT_TAGS_BY_ID } from '@/constants';
import useToggle from '@/hooks/use-toggle.hook';
import useSound from '@/hooks/use-sound.hook';

import UnstyledButton from '@/components/UnstyledButton';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import VisuallyHidden from '@/components/VisuallyHidden';
import Sparkles from '@/components/Sparkles';
import Spacer from '@/components/Spacer';
import TextInput from '@/components/TextInput';
import Checkbox from '@/components/Checkbox';
import PoofyRainbowButton from '@/components/RainbowButton/PoofyRainbowButton';
import Spinner from '@/components/Spinner';
import ConfettiGeyser from '@/components/ConfettiGeyser';
import BurstGeyser from '@/components/ConfettiGeyser/BurstGeyser';
import InPortal from '@/components/InPortal';

import {
  ME_PERCENTAGE_FROM_TOP,
  MODAL_WIDTH,
  MODAL_HEIGHT,
} from './constants';

const useFanfareAndConfetti = () => {
  const [playFanfare] = useSound('/sounds/fanfare.mp3', {
    volume: 0.3,
  });
  const [playPfff] = useSound('/sounds/pfff.mp3', {
    volume: 0.3,
  });
  const [shouldShowConfetti, setShowConfetti] = React.useState(false);

  const timeoutId = React.useRef(null);

  const fireTheCannon = () => {
    playFanfare();

    timeoutId.current = window.setTimeout(() => {
      playPfff();
      setShowConfetti(true);
    }, 1750);
  };

  React.useEffect(() => {
    return () => {
      window.clearTimeout(timeoutId.current);
    };
  }, []);

  return [fireTheCannon, shouldShowConfetti];
};

const SubscribeModal = ({
  variant,
  isOpen,
  windowWidth,
  windowHeight,
  handleClose,
  handleSubscribe,
}) => {
  const honeypotId = React.useId();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [honeypotTripped, setHoneypotTripped] = React.useState(false);

  const [status, setStatus] = React.useState('idle');

  const [fireTheCannon, shouldShowConfetti] = useFanfareAndConfetti();
  const [constantConfetti, toggleConstantConfetti] = useToggle(false);
  const geyserPosition = React.useMemo(() => {
    return [windowWidth, Math.min(700, windowHeight)];
  }, [windowWidth, windowHeight]);

  // We want it to start off the left edge of the screen.
  const leftPadding = (windowWidth - MODAL_WIDTH) / 2;
  const topPadding = (windowHeight - MODAL_HEIGHT) / 2;
  const mePxFromTop = (ME_PERCENTAGE_FROM_TOP / 100) * windowHeight;
  const initialXOffset = (leftPadding + MODAL_WIDTH) * -1.5;
  const initialYOffset = (mePxFromTop - topPadding) * 1.5;

  const tags = [
    CONVERTKIT_TAGS_BY_ID['primary-newsletter'],
    variant === 'careers'
      ? CONVERTKIT_TAGS_BY_ID.careers
      : CONVERTKIT_TAGS_BY_ID.technical,
  ];

  const defaultStyle = `translateX(${initialXOffset}px) translateY(${initialYOffset}px) rotate(-120deg)`;
  const openStyle = `translateX(0px) translateY(0px) rotate(0deg)`;

  const style = useSpring({
    transform: isOpen ? openStyle : defaultStyle,
    delay: 395,
    config: {
      tension: 270,
      friction: 60,
      precision: 0.001,
    },
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    setStatus('submitting');

    fetch('/api/subscribe-user', {
      method: 'POST',
      body: JSON.stringify({
        email,
        first_name: name,
        honeypotTripped,
        tags,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setStatus('subscribed');

        handleSubscribe();
        fireTheCannon();
      })
      .catch((err) => {
        setStatus('error');
      });
  };

  const wrappedHandleClose = () => {
    handleClose();

    if (constantConfetti) {
      toggleConstantConfetti();
    }
  };

  return (
    <>
      <ModalWrapper isOpen={isOpen} onDismiss={wrappedHandleClose}>
        <Overlay />
        <ModalInnerWrapper style={style}>
          <Modal
            aria-label="Sign up for my newsletter"
            data-cy="subscribe-modal"
          >
            {isOpen && (
              <CloseButtonWrapper>
                <CloseButton
                  onClick={wrappedHandleClose}
                  aria-label="Dismiss modal"
                  data-cy="dismiss-modal"
                >
                  <XIcon size={32} />
                </CloseButton>
              </CloseButtonWrapper>
            )}
            {status === 'subscribed' ? (
              <Success data-cy="subscribed-successfully">
                <div>
                  <Title as="h2">You're in!</Title>
                  <Paragraph style={{ maxWidth: 445 }}>
                    Thanks so much for giving my newsletter a chance.
                    I'm super excited to welcome you aboard!
                  </Paragraph>
                  <Spacer size={96} />
                  <ConstantConfettiCheckboxWrapper>
                    <Checkbox
                      name="confetti"
                      checked={constantConfetti}
                      label="Nonstop Confetti Party"
                      onChange={toggleConstantConfetti}
                    />
                  </ConstantConfettiCheckboxWrapper>
                  <Spacer size={64} />
                  <BackButton
                    onClick={wrappedHandleClose}
                    data-cy="subscribe-modal-back-to-article"
                  >
                    <ArrowLeft /> Back to article
                  </BackButton>
                </div>
              </Success>
            ) : (
              <Section>
                <Main>
                  <Paragraph>
                    My goal with this blog is to create helpful
                    content for front-end web devs. I have a{' '}
                    <Sparkles
                      delayBy={2000}
                      colors={['#FFA800', '#FFD600']}
                    >
                      new and improved
                    </Sparkles>{' '}
                    newsletter, and it shares the same goal!
                  </Paragraph>
                  <Paragraph>
                    I'll let you know when I publish new content, and
                    I'll also send the occasional newsletter-only
                    article. The hope is to make something that sparks
                    joy when you see it in your inbox ✨
                  </Paragraph>
                  <Paragraph>
                    If you're not into it, you can unsubscribe
                    instantly. 💨
                  </Paragraph>
                </Main>

                <Form
                  onSubmit={handleSubmit}
                  data-cy="subscribe-form"
                >
                  <Inputs>
                    <Col style={{ flex: 2 }}>
                      <TextInput
                        data-cy="subscribe-modal-name-field"
                        label="First Name"
                        required={true}
                        autoComplete="given-name"
                        value={name}
                        placeholder="Mrs. Human"
                        onChange={(ev) => setName(ev.target.value)}
                        disabled={status === 'submitting'}
                        style={{ flex: 1 }}
                      />
                    </Col>
                    <Spacer size={16} />
                    <Col style={{ flex: 3 }}>
                      <TextInput
                        data-cy="subscribe-modal-email-field"
                        label="Email"
                        required={true}
                        autoComplete="email"
                        type="email"
                        value={email}
                        placeholder="person@cool-domain.com"
                        onChange={(ev) => setEmail(ev.target.value)}
                        disabled={status === 'submitting'}
                      />
                    </Col>
                  </Inputs>
                  <Spacer size={32} />

                  <SubmitButton disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <Spinner color="var(--color-background)" />
                    ) : (
                      'Subscribe!'
                    )}
                  </SubmitButton>

                  {/*
                    This is a honeypot! Intended to trap bots.
                  */}
                  <VisuallyHidden>
                    <label htmlFor={honeypotId}>
                      Do you agree to the terms?
                    </label>
                    <p>
                      If you're a human, please ignore this field.
                    </p>
                    <input
                      name="accept-terms"
                      type="checkbox"
                      id={honeypotId}
                      checked={honeypotTripped}
                      onChange={(event) => {
                        setHoneypotTripped(event.target.checked);
                      }}
                    />
                  </VisuallyHidden>
                </Form>

                {status === 'error' && (
                  <Error>
                    An unknown error has occurred. Give it another go?
                  </Error>
                )}

                <IssueLink
                  href="/email/005/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check out a <strong>previous issue</strong> first?
                </IssueLink>
              </Section>
            )}
          </Modal>
        </ModalInnerWrapper>
      </ModalWrapper>

      {shouldShowConfetti && (
        <InPortal>
          <BurstGeyser
            position={geyserPosition}
            enableCollisions={false}
            airFriction={0.04}
            velocity={30}
            angularVelocity={0.6}
            angle={-135}
            spread={5}
            volatility={0.6}
            concentration={16}
            duration={750}
          />
          <ConfettiGeyser
            position={geyserPosition}
            enableCollisions={false}
            airFriction={0.04}
            velocity={30}
            angularVelocity={0.6}
            angle={-135}
            spread={5}
            volatility={0.6}
            concentration={constantConfetti ? 12 : 0}
          />
        </InPortal>
      )}
    </>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) scaleY(0.75);
  }
  to {
    opacity: 1;
    transform: translateY(0px) scaleY(1);
  }
`;

const ModalWrapper = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalInnerWrapper = styled(animated.div)`
  position: relative;
  z-index: 3;
  width: ${MODAL_WIDTH}px;
  height: ${MODAL_HEIGHT}px;
  transform-origin: top left;
  backface-visibility: hidden;
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-muted-background);
  /* backdrop-filter: blur(4px); */
  animation: ${fadeIn} 750ms both;
`;

const Modal = styled(DialogContent)`
  background: var(--color-background);
  border-radius: 6px;
  width: 100%;
  height: 100%;
  padding: 32px;
  outline: none;
`;

const Main = styled.div`
  flex: 1;
`;

const Form = styled.form``;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-100%);

  @media (max-height: 767px) {
    /*
      On shorter windows, push the close button off the right edge,
      instead of off the top.
    */
    transform: translateX(100%);
  }
`;

const CloseButton = styled(UnstyledButton)`
  padding: 16px;
  color: var(--color-text);

  animation: ${riseIn} 400ms 1600ms both;
`;

const Title = styled(Heading)`
  color: var(--color-success);
  margin-bottom: 24px;
  font-size: 32px;
`;

const Inputs = styled.div`
  display: flex;
`;

const Col = styled.div``;

const SubmitButton = styled(PoofyRainbowButton)`
  width: 100%;
`;

const IssueLink = styled.a`
  text-align: center;
  margin-top: 8px;
  margin-bottom: -16px;
  padding: 16px;
  font-size: 14px;
  font-style: italic;
  color: var(--color-gray-700);
  text-decoration: none;
`;

const Section = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Success = styled(Section)`
  text-align: center;
  align-items: center;
  animation: ${fadeIn} 1400ms 250ms both;
`;

const ConstantConfettiCheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  animation: ${fadeIn} 500ms 2000ms both;
`;

const BackButton = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  color: inherit;
  margin: auto;
  padding: 16px 48px;
  border-radius: 8px;

  &:hover {
    background: var(--color-gray-100);
  }
`;

const Error = styled.div`
  font-size: 15px;
  color: var(--color-error);
  text-align: center;
  margin-top: 8px;
`;

export default SubscribeModal;
