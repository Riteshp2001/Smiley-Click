import React from 'react';

import RenderWhenOnscreen from '@/components/RenderWhenOnscreen';
import Chunk from '@/components/Chunk';
import { ConfigContext } from '@/components/ConfigContext';

const CodeSandboxEmbed = ({ sandboxId, title, view = 'preview' }) => {
  const { colorMode } = React.useContext(ConfigContext);

  const url = `https://codesandbox.io/embed/${sandboxId}?autoresize=1&fontsize=14&hidenavigation=1&theme=${colorMode}&view=${view}`;

  return (
    <iframe
      src={url}
      style={{
        width: '100%',
        height: 500,
        border: 0,
        borderRadius: 4,
        overflow: 'hidden',
      }}
      title={title}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};

const ClientOnlyWrapper = props => {
  return (
    <Chunk>
      <RenderWhenOnscreen height={500} style={{ flex: 1 }}>
        <CodeSandboxEmbed {...props} />
      </RenderWhenOnscreen>
    </Chunk>
  );
};

export default ClientOnlyWrapper;
