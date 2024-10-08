/**
 * This context holds user configuration stuff, like:
 * - Dark or light mode
 * - Sound enabled or disabled
 */
import React from 'react';

import {
  DARK_COLORS,
  LIGHT_COLORS,
  PREFERS_DARK_KEY,
  PREFERS_DARK_CSS_PROP,
} from '@/constants';
import usePersistedState from '@/hooks/use-persisted-state.hook';

export const ConfigContext = React.createContext();

const SOUND_ENABLED_KEY = 'sound-enabled';

export const ConfigProvider = ({ children }) => {
  let initialColorValue = 'light';
  let initialSoundEnabled = true;
  let initialAllowColorTransitions = false;

  const [colorMode, rawSetColorMode] = React.useState(
    initialColorValue
  );
  const [soundEnabled, rawSetSoundEnabled] = React.useState(
    initialSoundEnabled
  );
  const [
    disableTabInCodeSnippets,
    setDisableTabInCodeSnippets,
  ] = usePersistedState(true, 'tab-in-code-snippets');

  const [
    allowColorTransitions,
    setAllowColorTransitions,
  ] = React.useState(initialAllowColorTransitions);

  React.useEffect(() => {
    // Immediately after mount, trigger a re-render IF the values
    // in localStorage don't match the values in the statically-
    // generated HTML
    let root = window.document.documentElement;

    const localColorValue =
      root.style.getPropertyValue(PREFERS_DARK_CSS_PROP) === 'true'
        ? 'dark'
        : 'light';
    const localSoundEnabled =
      window.localStorage?.getItem(SOUND_ENABLED_KEY) === 'false'
        ? false
        : true;

    if (localColorValue !== initialColorValue) {
      rawSetColorMode(localColorValue);
    }

    if (localSoundEnabled !== initialSoundEnabled) {
      rawSetSoundEnabled(localSoundEnabled);
    }
  }, []);

  const setColorMode = React.useCallback(
    (value) => {
      if (!allowColorTransitions) {
        setAllowColorTransitions(true);
      }

      let root = window.document.documentElement;

      root.setAttribute('data-color-mode', value);

      const prefersDark = value === 'dark';
      root.style.setProperty(PREFERS_DARK_CSS_PROP, prefersDark);
      const newColors = prefersDark ? DARK_COLORS : LIGHT_COLORS;

      root.style.setProperty('--color-text', newColors.text);
      root.style.setProperty(
        '--color-background',
        newColors.background
      );
      root.style.setProperty(
        '--color-blurred-background',
        newColors.blurredBackground
      );
      root.style.setProperty('--color-primary', newColors.primary);
      root.style.setProperty(
        '--color-secondary',
        newColors.secondary
      );
      root.style.setProperty('--color-tertiary', newColors.tertiary);
      root.style.setProperty(
        '--color-decorative',
        newColors.decorative
      );
      root.style.setProperty('--color-muted', newColors.muted);
      root.style.setProperty(
        '--color-muted-background',
        newColors.mutedBackground
      );
      root.style.setProperty('--color-info', newColors.info);
      root.style.setProperty('--color-success', newColors.success);
      root.style.setProperty(
        '--color-success-background',
        newColors.successBackground
      );
      root.style.setProperty('--color-error', newColors.error);
      root.style.setProperty(
        '--color-error-background',
        newColors.errorBackground
      );
      root.style.setProperty('--color-alert', newColors.alert);
      root.style.setProperty(
        '--color-alert-background',
        newColors.alertBackground
      );
      root.style.setProperty('--color-venn-0', newColors.venn[0]);
      root.style.setProperty('--color-venn-1', newColors.venn[1]);
      root.style.setProperty('--color-gray-100', newColors.gray[100]);
      root.style.setProperty('--color-gray-200', newColors.gray[200]);
      root.style.setProperty('--color-gray-300', newColors.gray[300]);
      root.style.setProperty('--color-gray-400', newColors.gray[400]);
      root.style.setProperty('--color-gray-500', newColors.gray[500]);
      root.style.setProperty('--color-gray-600', newColors.gray[600]);
      root.style.setProperty('--color-gray-700', newColors.gray[700]);
      root.style.setProperty('--color-gray-900', newColors.gray[900]);
      root.style.setProperty(
        '--color-gray-1000',
        newColors.gray[1000]
      );
      root.style.setProperty(
        '--color-subtle-background',
        newColors.subtleBackground
      );
      root.style.setProperty(
        '--color-subtle-floating',
        newColors.subtleFloating
      );
      root.style.setProperty(
        '--color-homepage-light',
        newColors.homepageLight
      );
      root.style.setProperty(
        '--color-homepage-dark',
        newColors.homepageDark
      );
      root.style.setProperty(
        '--color-homepage-bg',
        newColors.homepageBg
      );

      root.style.setProperty('--syntax-bg', newColors.syntax.bg);
      root.style.setProperty(
        '--syntax-highlight',
        newColors.syntax.highlight
      );
      root.style.setProperty('--syntax-txt', newColors.syntax.txt);
      root.style.setProperty(
        '--syntax-comment',
        newColors.syntax.comment
      );
      root.style.setProperty('--syntax-prop', newColors.syntax.prop);
      root.style.setProperty('--syntax-bool', newColors.syntax.bool);
      root.style.setProperty('--syntax-val', newColors.syntax.val);
      root.style.setProperty('--syntax-str', newColors.syntax.str);
      root.style.setProperty('--syntax-name', newColors.syntax.name);
      root.style.setProperty('--syntax-del', newColors.syntax.del);
      root.style.setProperty(
        '--syntax-regex',
        newColors.syntax.regex
      );
      root.style.setProperty('--syntax-fn', newColors.syntax.fn);

      rawSetColorMode(value);

      localStorage.setItem(PREFERS_DARK_KEY, prefersDark);
    },
    [allowColorTransitions]
  );

  // Listen for changes in the media query
  React.useEffect(() => {
    const QUERY = '(prefers-color-scheme: dark)';

    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event) => {
      const isDark = event.matches;
      setColorMode(isDark ? 'dark' : 'light');
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);

  const value = React.useMemo(() => {
    const setSoundEnabled = (newValue) => {
      window.localStorage?.setItem(SOUND_ENABLED_KEY, newValue);
      rawSetSoundEnabled(newValue);
    };

    return {
      colorMode,
      setColorMode,
      soundEnabled,
      setSoundEnabled,
      allowColorTransitions,
      disableTabInCodeSnippets,
      setDisableTabInCodeSnippets,
    };
  }, [
    colorMode,
    setColorMode,
    rawSetColorMode,
    soundEnabled,
    rawSetSoundEnabled,
    allowColorTransitions,
    disableTabInCodeSnippets,
    setDisableTabInCodeSnippets,
  ]);

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};
