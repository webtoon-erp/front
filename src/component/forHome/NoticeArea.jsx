import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios'; // axios 추가

const NoticeArea = () => {
  const [data, setData] = useState([]); // 데이터 상태 추가
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // HTTP GET 요청 보내기
    axios.get('http://146.56.98.153:8080/home', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // 응답이 성공하면 데이터를 설정하고 로딩 상태를 false로 변경
        setData(response.data);
        setIsLoading(false);
        console.log("response.data", response.data);
      } else {
        console.error('데이터를 불러오는데 실패했습니다.');
      }
    })
    .catch((error) => {
      console.error('데이터를 불러오는데 실패했습니다.', error);
    });
  }, []); // 한 번만 실행되도록 빈 배열을 전달합니다.

  return (
    <NoticeAreaContainer>
      <Title>공지사항</Title>
      <ButtonContainer>
        <Link to="/notice">
          <button>전체 공지사항 보기</button>
        </Link>
      </ButtonContainer>
      <CardGrid>
        {data.map((card) => (
          <Link to={`/noticeDetail/${card.id}`} key={card.id}>
            {/* Replace CardButton with SkeletonCardButton during loading */}
            {isLoading ? (
              <SkeletonCardButton>
                <Skeleton width={80} height={120} />
              </SkeletonCardButton>
            ) : (
              <CardButton>
                <CardTitle>{card.title}</CardTitle>
                <CardContent>{card.noticeType}</CardContent>
                <CardContent>{card.noticeDate}</CardContent>
              </CardButton>
            )}
          </Link>
        ))}
      </CardGrid>
    </NoticeAreaContainer>
  );
};

export default NoticeArea;

const NoticeAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid #ccc;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`;

const CardButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 180px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 8px;
  background-color: #f1f1f1;
  cursor: pointer;
`;

const SkeletonCardButton = styled(CardButton)`
  background-color: #f9f9f9;
`;

const CardTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 8px;
`;

const CardContent = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;