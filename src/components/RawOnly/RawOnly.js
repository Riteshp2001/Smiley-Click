/**
 * This component is used in emails, as a way to include special
 * "email-only" content. When the user views the live version on the
 * web, we'll render a fallback instead (if provided).
 */
import React from 'react';

import Paragraph from '@/components/Paragraph';

const RawOnly = ({ inline, fallback }) => {
  if (!fallback) {
    return null;
  }

  if (typeof fallback === 'string' && !inline) {
    return <Paragraph>{fallback}</Paragraph>;
  }

  return fallback;
};

export default RawOnly;
