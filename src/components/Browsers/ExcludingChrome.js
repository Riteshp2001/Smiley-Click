import useBrowser from '@/hooks/use-browser.hook';

function ExcludingChrome({ children }) {
  const browser = useBrowser();

  if (browser === 'chrome') {
    return null;
  }

  return children;
}

export default ExcludingChrome;
