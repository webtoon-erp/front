import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './modal';

const Tab = ({ tabElements, onClose }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(null);

  const handleOpenModal = (index) => {
    setActiveTabIndex(index);
  };

  const handleCloseModal = () => {
    setActiveTabIndex(null);
  };

  const handleCloseTab = (index) => {
    if (tabElements[index].fixed) {
      return;
    }

    if (activeTabIndex === index) {
      handleCloseModal();
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
          <Link
            to={tab.title === 'Home' ? '/' : `/${tab.title}`}
            className="tab-link"
          >
            {tab.title}
          </Link>
          {!tab.fixed && (
            <button onClick={() => handleCloseTab(index)} className="close-button">
              X
            </button>
          )}
          {!tab.fixed && (
            <button onClick={() => handleOpenModal(index)} className="open-modal-button">
              Open Modal
            </button>
          )}
          {activeTabIndex === index && (
            <Modal onClose={handleCloseModal} tabInfo={tab} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tab;
