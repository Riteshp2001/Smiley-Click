import React from 'react';
import ReactDOM from 'react-dom';

const InPortal = ({ id, children }) => {
  const [hostElement, setHostElement] = React.useState(null);

  React.useEffect(() => {
    const elm = id
      ? document.querySelector(`#${id}`)
      : document.createElement('div');

    if (!elm) {
      return;
    }

    setHostElement(elm);

    if (!id) {
      document.body.appendChild(elm);
    }

    return () => {
      if (!id) {
        document.body.removeChild(elm);
      }
    };
  }, [id]);

  if (!hostElement) {
    return null;
  }

  return ReactDOM.createPortal(children, hostElement);
};

export default InPortal;
