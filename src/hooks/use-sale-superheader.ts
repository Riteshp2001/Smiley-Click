import * as React from 'react';
import {
  IS_SALE_RUNNING,
  SALE_SUPERHEADER_STATUS_KEY,
} from '@/constants';

function useSaleSuperheader() {
  // Initialize to dismissed, since we don't want to show during SSR.
  const [superheaderStatus, setSuperheaderStatus] = React.useState(
    'dismissed'
  );

  React.useEffect(() => {
    if (!IS_SALE_RUNNING) {
      return;
    }

    const savedSuperheaderStatus = window.localStorage.getItem(
      SALE_SUPERHEADER_STATUS_KEY
    );

    switch (savedSuperheaderStatus) {
      case 'dismissed': {
        // No action needed. It's already dismissed.
        return;
      }

      case 'seen': {
        // If they've seen it before, show it, but without the big flashy animation. This is to prevent it from getting annoying as they navigate around.
        setSuperheaderStatus('show-quick');
        break;
      }

      default: {
        // The first time they see it, we’ll give them a big show. But we'll also mark that it's been seen, to prevent the animation from rerunning.
        setSuperheaderStatus('show-full-fat');
        window.localStorage.setItem(
          SALE_SUPERHEADER_STATUS_KEY,
          'seen'
        );
      }
    }
  }, []);

  const handleDismiss = React.useCallback(() => {
    setSuperheaderStatus('dismissed');
    window.localStorage.setItem(
      SALE_SUPERHEADER_STATUS_KEY,
      'dismissed'
    );
  }, []);

  return [superheaderStatus, handleDismiss];
}

export default useSaleSuperheader;
