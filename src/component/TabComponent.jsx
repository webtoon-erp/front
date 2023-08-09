import React from 'react';
import { useLocation } from 'react-router-dom';

const TabComponent = ({ title }) => {
  const location = useLocation();

  return (
    <div>
      {/* 현재 탭에 해당하는 컨텐츠를 여기에 렌더링 */}
      {title}의 내용을 여기에 보여주세요. (현재 경로: {location.pathname})
    </div>
  );
};

export default TabComponent;
