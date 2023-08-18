import React from 'react';
import { useLocation } from 'react-router-dom';

function TabComponent({ title, modalContent, onOpenModal, onCloseModal }) {
  const location = useLocation();

  return (
    <div>
      {/* 현재 탭에 해당하는 컨텐츠를 여기에 렌더링 */}
      {title}의 내용을 여기에 보여주세요. (현재 경로: {location.pathname})
      {/* modalContent가 존재하면 모달을 렌더링 */}
      {modalContent && (
        <div>
          모달 컨텐츠: {modalContent.title}
          <button onClick={onCloseModal}>모달 닫기</button>
        </div>
      )}
      <button onClick={onOpenModal}>모달 열기</button>
    </div>
  );
}

export default TabComponent;
