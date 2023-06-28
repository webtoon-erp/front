import React from 'react';

const NoticeArea = () => {
  const notices = [
    { id: 1, title: 'Notice 1', content: 'Content 1' },
    { id: 2, title: 'Notice 2', content: 'Content 2' },
    { id: 3, title: 'Notice 3', content: 'Content 3' },
  ];

  const handleViewAllNotices = () => {
    // 전체 공지사항 보기 버튼을 클릭했을 때의 로직 추가 필요
    console.log('View all notices');
  };

  return (
    <div>
      {/* 다른 컴포넌트들 */}
      <NoticeArea notices={notices} onViewAll={handleViewAllNotices} />
      {/* 다른 컴포넌트들 */}
    </div>
  );
};

export default NoticeArea;

