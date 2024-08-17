import React from 'react';

import { detectBrowser } from '@/helpers/browser.helpers';

export default function useBrowser() {
  const [browser, setBrowser] = React.useState(null);

  React.useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  return browser;
}
