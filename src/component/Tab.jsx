import React from 'react';

const Tab = ({ tabElements, onClose, onAdd }) => {
  return (
    <div className="tab-container" style={{display: 'flex', flexDirection: 'row'}}>
      {tabElements.map((tab, index) => (
        <div key={index} className={`tab ${tab.fixed ? 'fixed' : ''}`} style={{border: '1px solid #ccc', padding: '2px'}}>
          {tab.title}
          {!tab.fixed && onClose && (
            <button onClick={() => onClose(index)} className="close-button">
              X
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tab;
