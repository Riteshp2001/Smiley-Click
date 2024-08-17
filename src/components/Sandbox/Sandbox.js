import React from 'react';

import CodeWrapper from './CodeWrapper';
import BlogUnit from './BlogUnit';
import BlogUnitSplitConsole from './BlogUnitSplitConsole';
import SandboxProvider from './SandboxProvider';
import { useFullscreen } from './Sandbox.helpers';

const Sandbox = ({
  id,
  showLineNumbers,
  title,
  preset,
  files,
  activePath,
  maxHeight,
  minPreviewHeight = 360,
  splitRatio = 0.5,
  startFullscreened = false,
  fullBleed = true,
  resultTabs = ['result', 'console'],
  initialTabIndex = 0,
  dependencies = {},
  splitConsole,
  transparentBackground,
  ...delegated
}) => {
  const [activeResultTab, setActiveResultTab] = React.useState(
    resultTabs[initialTabIndex]
  );

  const [isFullscreened, toggleFullscreen] = useFullscreen(
    startFullscreened
  );

  // TODO: Should I allow the other units, in some cases?
  let Unit = splitConsole ? BlogUnitSplitConsole : BlogUnit;

  return (
    <SandboxProvider
      id={id}
      preset={preset}
      files={files}
      activePath={activePath}
      fullBleed={fullBleed}
      dependencies={dependencies}
    >
      <CodeWrapper
        id={id}
        isFullscreened={isFullscreened}
        fullBleed={fullBleed}
        toggleFullscreen={toggleFullscreen}
      >
        <Unit
          id={id}
          title={title}
          isFullscreened={isFullscreened}
          toggleFullscreen={toggleFullscreen}
          splitRatio={splitRatio}
          maxHeight={maxHeight}
          minPreviewHeight={minPreviewHeight}
          showLineNumbers={showLineNumbers}
          transparentBackground={transparentBackground}
          resultTabs={resultTabs}
          activeResultTab={activeResultTab}
          handleSelectResultTab={setActiveResultTab}
          {...delegated}
        />
      </CodeWrapper>
    </SandboxProvider>
  );
};

export default Sandbox;
