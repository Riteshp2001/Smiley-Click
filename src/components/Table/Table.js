import React from 'react';

import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';

const Table = ({ data, fields, mobileHeadingLevel = 'h2', ...delegated }) => {
  return (
    <>
      <DesktopTable data={data} fields={fields} {...delegated} />
      <MobileTable
        data={data}
        fields={fields}
        headingLevel={mobileHeadingLevel}
        {...delegated}
      />
    </>
  );
};

export default Table;
