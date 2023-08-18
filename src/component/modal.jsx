import React, { useState } from 'react';

const Modal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <p>Modal Content</p>
      </div>
    </div>
  );
};

export default Modal;
