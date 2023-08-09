import React from 'react';
import { Link } from 'react-router-dom';

const Tab = ({ tabElements, onClose }) => {
  const handleCloseTab = (index) => {
    if (tabElements[index].fixed) {
      return;
    }

    const newTabElements = [...tabElements];
    newTabElements.splice(index, 1);
    localStorage.setItem('tabs', JSON.stringify(newTabElements));

    if (tabElements[index].title === localStorage.getItem('activeTab')) {
      const newActiveTab = newTabElements[newTabElements.length - 1]?.title || null;
      localStorage.setItem('activeTab', newActiveTab);
    }

    onClose(index);
  };

  return (
    <div className="tab-container" style={{ display: 'flex', flexDirection: 'row' }}>
      {tabElements.map((tab, index) => (
        <div
          key={index}
          className={`tab ${tab.fixed ? 'fixed' : ''}`}
          style={{ border: '1px solid #ccc', padding: '2px' }}
        >
          <Link to={ tab.title === 'Home'? `/` : `/${tab.title.toLowerCase()}`} className="tab-link">
            {tab.title}
          </Link>
          {!tab.fixed && (
            <button onClick={() => handleCloseTab(index)} className="close-button">
              X
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tab;


