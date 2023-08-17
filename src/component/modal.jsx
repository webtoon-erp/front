import React, { useEffect, useState } from 'react';

const Modal = ({ onClose, tabInfo }) => {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (tabInfo) {
      const componentPromise = import(`./${tabInfo.key}`);
      componentPromise.then((module) => {
        setComponent(module.default);
      });
    }
  }, [tabInfo]);

  if (!tabInfo) {
    return null;
  }

  const handleModalClose = () => {
    setComponent(null);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={handleModalClose} className="modal-close-button">
          Close
        </button>
        {component && <component />}
      </div>
    </div>
  );
};

export default Modal;





