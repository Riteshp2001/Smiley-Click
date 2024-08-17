import useBrowser from '@/hooks/use-browser.hook';

function FirefoxOnly({ children }) {
  const browser = useBrowser();

  if (browser !== 'firefox') {
    return null;
  }

  return children;
}

export default FirefoxOnly;
