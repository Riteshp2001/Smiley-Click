import useBrowser from '@/hooks/use-browser.hook';

function SafariOnly({ children }) {
  const browser = useBrowser();

  if (browser !== 'safari') {
    return null;
  }

  return children;
}

export default SafariOnly;
