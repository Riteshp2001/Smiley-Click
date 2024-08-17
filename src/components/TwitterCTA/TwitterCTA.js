import React from 'react';

import { ContentContext } from '../ContentContext';
import ClientOnly from '../ClientOnly';
import WhimsicalTwitterCTA from './WhimsicalTwitterCTA';

const TwitterCTA = (props) => {
  const { contentType, title, location, isPublished } =
    React.useContext(ContentContext) || {};

  if (process.env.NODE_ENV === 'production' && !isPublished) {
    return null;
  }

  let quotedTitle = title.replace('“', '‘').replace('”', '’');

  const contentTypeWithArticle =
    contentType === 'tutorial' ? 'a tutorial' : 'an article';

  const shareMessage = `“${quotedTitle}”, ${contentTypeWithArticle} from Josh Comeau. `;

  const currentUrl = location.origin + location.pathname;
  const href = generateUrl(currentUrl, shareMessage);

  return <WhimsicalTwitterCTA href={href} {...props} />;
};

const generateUrl = (shareUrl, message) => {
  const text = encodeURIComponent(message);

  return `https://twitter.com/share?url=${shareUrl}&text=${text}&via=JoshWComeau`;
};

export default function TwitterCTAWrapper(props) {
  return (
    <ClientOnly>
      <TwitterCTA {...props} />
    </ClientOnly>
  );
}
