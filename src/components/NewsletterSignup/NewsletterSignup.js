import React from 'react';
import styled, { keyframes } from 'styled-components';

import useWindowDimensions from '@/hooks/use-window-dimensions.hook';
import useSound from '@/hooks/use-sound.hook';

import SignupForm from '@/components/NewsletterSignupForm';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import BurstGeyser from '@/components/ConfettiGeyser/BurstGeyser';
import Em from '@/components/Em';
import Me from '@/components/Me';
import Spacer from '@/components/Spacer';
import WobblyFloat from '../WobblyFloat';

const useConfetti = () => {
  const [playFanfare] = useSound('/sounds/fanfare.mp3', {
    volume: 0.3,
  });
  const [playPfff] = useSound('/sounds/pfff.mp3', { volume: 0.3 });
  const [isConfettiShown, setIsConfettiShown] = React.useState(false);

  const timeoutId = React.useRef(null);

  const triggerConfetti = () => {
    playFanfare();

    timeoutId.current = window.setTimeout(() => {
      playPfff();
      setIsConfettiShown(true);
    }, 1750);
  };

  React.useEffect(() => {
    return () => {
      window.clearTimeout(timeoutId.current);
    };
  }, []);

  return [isConfettiShown, triggerConfetti];
};

const Success = ({ variant }) => {
  const SuccessWrapper =
    variant === 'minimal'
      ? MinimalSuccessWrapper
      : DefaultSuccessWrapper;

  return (
    <SuccessWrapper>
      <Heading as="h2" type="medium-title">
        Success!
      </Heading>
      <Description>
        <Em color="var(--color-secondary)">You're in!</Em> Please
        check your inbox — you should receive a “Josh Starter Pack”
        full of my most valuable free content. 😄
      </Description>
    </SuccessWrapper>
  );
};

const noop = () => {};

const HEADINGS = {
  default: 'A front-end web development newsletter that sparks joy',
};

const CTAS = {
  default: (
    <>
      My goal with this blog is to create helpful content for
      front-end web devs, and my newsletter is no different! I'll let
      you know when I publish new content, and I'll even share{' '}
      <Em>exclusive newsletter-only content</Em> now and then.
      <br />
      <br />
      No spam, unsubscribe at any time.
    </>
  ),
};

const NewsletterSignup = ({
  variant = 'default', // careers, minimal
  cta,
  source = 'inline',
  handleSuccess = noop,
  noFloating,
  tags = [],
}) => {
  const [hasSignedUp, setHasSignedUp] = React.useState(false);

  const [isConfettiShown, triggerConfetti] = useConfetti();

  const windowDimensions = useWindowDimensions();

  const geyserPosition = React.useMemo(() => {
    return [
      windowDimensions.width,
      Math.min(700, windowDimensions.height),
    ];
  }, [windowDimensions.width, windowDimensions.height]);

  const justTheForm = variant === 'minimal';

  return (
    <>
      {isConfettiShown && (
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
      )}

      <Wrapper variant={variant}>
        {!justTheForm && (
          // HACK: using `noFloating` as a stand-in for whether
          // this is Tutorial or Article, so that the fella sits
          // on top of the hill in Tutorial.
          <MeWrapper
            style={{ '--top': noFloating ? '120px' : '32px' }}
          >
            <WobblyFloat disabled={noFloating}>
              <Me />
            </WobblyFloat>
          </MeWrapper>
        )}
        <Content>
          {hasSignedUp ? (
            <Success variant={variant} />
          ) : (
            <>
              {!justTheForm && (
                <>
                  <Title
                    forwardedAs="h2"
                    id="newsletter-signup-heading"
                    type="medium-title"
                  >
                    {HEADINGS.default}
                  </Title>
                  <Description>{cta || CTAS.default}</Description>
                </>
              )}
              <Spacer size={variant === 'minimal' ? 8 : 64} />
              <SignupForm
                source={source}
                tags={tags}
                handleSuccess={() => {
                  setHasSignedUp(true);
                  triggerConfetti();

                  handleSuccess();
                }}
              />
              <Spacer size={8} />
            </>
          )}
        </Content>
      </Wrapper>
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

const Wrapper = styled.div`
  position: relative;
  display: ${(p) => (p.variant === 'minimal' ? 'block' : 'flex')};
`;

const DefaultSuccessWrapper = styled.div`
  animation: ${fadeIn} 1250ms;
  min-height: 354px;

  @media (min-width: 1000px) {
    width: 686px;
  }
`;

const MinimalSuccessWrapper = styled(DefaultSuccessWrapper)`
  padding: 32px;
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  background: var(--color-gray-100);
  min-height: revert;

  p {
    margin-bottom: 0;
  }

  @media (min-width: 1000px) {
    width: revert;
  }
`;

const Content = styled.div`
  position: relative;

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const Description = styled(Paragraph)`
  margin-top: 16px;
  max-width: 34rem;
`;

const MeWrapper = styled.div`
  position: absolute;
  top: var(--top);
  right: -28px;
  transform: translateX(100%);
  display: none;
  backface-visibility: hidden;

  @media (min-width: 1000px) {
    display: block;
  }
`;

const Title = styled(Heading)`
  max-width: 550px;
  margin-bottom: 24px;
`;

export default NewsletterSignup;
