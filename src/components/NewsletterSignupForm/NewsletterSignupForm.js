/**
 * This will become the **only** component that manages the
 * mechanics of signing up for the newsletter.
 *
 * Right now I have `NewsletterSignup` which wraps it with
 * the content shown in blog posts, and includes the confetti
 * on success. I also have a bunch of other wrappers that
 * need to be cleaned up and consolidated.
 */
import React from 'react';
import styled from 'styled-components';
import va from '@/vercel/analytics';

import { CONVERTKIT_TAGS_BY_ID } from '@/constants';

import TextInput from '@/components/TextInput';
import VisuallyHidden from '@/components/VisuallyHidden';
import PoofyRainbowButton from '@/components/RainbowButton/PoofyRainbowButton';
import Spinner from '@/components/Spinner';

function NewsletterSignupForm({
  source,
  tags = [],
  emailLabel = 'Email',
  hideNameField,
  handleSuccess,
  ...delegated
}) {
  const honeypotId = React.useId();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [honeypotTripped, setHoneypotTripped] = React.useState(false);

  const [status, setStatus] = React.useState('idle');

  // All subscribers will receive the `primary-newsletter`
  // tag, as well as any additional submitted tags.
  const tagIds = [
    CONVERTKIT_TAGS_BY_ID['primary-newsletter'],
    ...tags.map((tag) => CONVERTKIT_TAGS_BY_ID[tag]),
  ];

  return (
    <Wrapper
      {...delegated}
      onSubmit={(ev) => {
        ev.preventDefault();

        if (status === 'submitting') {
          // Prevent double submissions
          return;
        }

        setStatus('submitting');

        fetch('/api/subscribe-user', {
          method: 'POST',
          body: JSON.stringify({
            email,
            first_name: name,
            honeypotTripped,
            tags: tagIds,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            setStatus('completed');

            handleSuccess();

            va.track('newsletter-signup', {
              source,
            });
          });
      }}
    >
      {!hideNameField && (
        <NameCol>
          <TextInput
            label="First Name"
            autoComplete="given-name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            readOnly={status === 'submitting'}
          />
        </NameCol>
      )}
      <EmailCol>
        <TextInput
          label={emailLabel}
          required={true}
          autoComplete="email"
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          readOnly={status === 'submitting'}
        />
      </EmailCol>

      <PoofyRainbowButton
        id="newsletter-signup-button"
        type="submit"
        style={{ width: 175 }}
      >
        {status === 'submitting' ? (
          <Spinner color="white" />
        ) : (
          'Subscribe'
        )}
      </PoofyRainbowButton>

      {/*
        This is a honeypot! Intended to trap bots.
      */}
      <VisuallyHidden>
        <label htmlFor={honeypotId}>Do you agree to the terms?</label>
        <p>If you're a human, please ignore this field.</p>
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
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: flex;
  gap: 32px;
  align-items: flex-end;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const NameCol = styled.div`
  flex: 2;

  @media (max-width: 650px) {
    width: 100%;
  }
`;
const EmailCol = styled.div`
  flex: 3;

  @media (max-width: 650px) {
    width: 100%;
  }
`;

export default NewsletterSignupForm;
