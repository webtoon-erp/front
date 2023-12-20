import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import Modal from './modal';
import styled from 'styled-components';
import theme from '../style/theme';
import { savedData } from '../data.js'; 

const Tab = ({ tabElements, onClose, onOpenModal }) => {
  // 탭 상태 및 사용자 데이터 상태 관리
  const [activeTabIndex, setActiveTabIndex] = useState(JSON.parse(localStorage.getItem('activeTabIndex')) || null);
  const [tabs, setTabs] = useState(JSON.parse(localStorage.getItem('tabs')) || tabElements);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || {});


  useEffect(() => {
    localStorage.setItem('lastVisited', location.pathname);
    localStorage.setItem('tabs', JSON.stringify(tabs));
    localStorage.setItem('userData', JSON.stringify(userData)); // 사용자 데이터 저장
  }, [location, tabs, userData]);

  const handleCloseModal = () => {
    setActiveTabIndex(null);
    localStorage.removeItem('activeTabIndex'); // 모달 닫힐 때 상태 저장 제거
  };

  useEffect(() => {
    setTabs(tabElements);
  }, [tabElements]);


  const handleCloseTab = (index) => {
    if (tabs[index].fixed) {
      return;
    }
  
    const updatedTabs = tabs.filter((_, tabIndex) => tabIndex !== index);
    setTabs(updatedTabs); // 탭 상태 업데이트
    navigate(tabs[index - 1].title);
  
    if (activeTabIndex === index) {
      handleCloseModal();
    }
  
    onClose(index);
  };

  // 사용자 데이터 업데이트 함수
  const updateUserData = (tabIndex, newData) => {
    const updatedData = { ...userData, [tabs[tabIndex].title]: newData };
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData)); // 사용자 데이터를 localStorage에 저장
  };
  
  
  const handleOpenModal = (index) => {
    setActiveTabIndex(index);
    localStorage.setItem('activeTabIndex', JSON.stringify(index)); // 모달 열릴 때 상태 저장
    onOpenModal();
  };
  

  return (
    <div className="tab-container" style={{ display: 'flex', flexDirection: 'row'}}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab ${tab.fixed ? 'fixed' : ''}`}
          style={{ border: '1px solid #ccc', padding: '5px' }}
        >

          <Link to={tab.title === 'Home' ? `/home` : `/${tab.title}`} className="tab-link" style={{ textDecoration: "none" }}>

            {tab.title}
          </Link>
          {!tab.fixed && (
            <DeleteBtn onClick={() => handleCloseTab(index)} className="close-button" />
          )}
          
          {activeTabIndex === index && (
            <Modal onClose={handleCloseModal} tabInfo={tab} userData={userData[tab.title]} updateUserData={updateUserData} />
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

