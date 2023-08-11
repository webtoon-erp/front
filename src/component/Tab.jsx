import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../style/theme';

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
    <div className="tab-container" style={{ display: 'flex', flexDirection: 'row'}}>
      {tabElements.map((tab, index) => (
        <div
          key={index}
          className={`tab ${tab.fixed ? 'fixed' : ''}`}
          style={{ border: '1px solid #ccc', padding: '5px' }}
        >
          <Link to={ tab.title === 'Home'? `/` : `/${tab.title.toLowerCase()}`} className="tab-link" style={{ textDecoration: "none" }}>
            {tab.title}
          </Link>
          {!tab.fixed && (
            <DeleteBtn onClick={() => handleCloseTab(index)} className="close-button" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tab;

const DeleteBtn = styled.button`
  border: none;
  width: 16.5px;
  height: 16.5px;
  border-radius: 50%;
  padding: 1px 1px 0px 0px;
  margin-left: 5px;
  background-color: #6FC4FD;
  cursor: pointer;
  color: ${theme.colors.ff};
  &:after {
    content: "\\00d7";
    font-size: 15.3px;
  }
`;

