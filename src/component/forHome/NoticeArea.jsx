import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NoticeAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 21px;
  border: 1px solid #ccc;
`;

const Title = styled.h1`
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
  grid-gap: 11px;
`;

const CardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 140px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 8px;
  background-color: #f1f1f1;
  cursor: pointer;
`;

const FakeData = [
  {
    id: 1,
    title: 'Card 1',
    url: '/card1',
  },
  {
    id: 2,
    title: 'Card 2',
    url: '/card2',
  },
  {
    id: 3,
    title: 'Card 3',
    url: '/card3',
  },
  {
    id: 4,
    title: 'Card 4',
    url: '/card4',
  },
  {
    id: 5,
    title: 'Card 5',
    url: '/card5',
  },
  {
    id: 6,
    title: 'Card 6',
    url: '/card6',
  },
  // Add more cards as needed
];

const NoticeArea = () => {
  return (
    <NoticeAreaContainer>
      <Title>공지사항</Title>
      <ButtonContainer>
        <Link to="/notice">
          <button>전체 공지사항 보기</button>
        </Link>
      </ButtonContainer>
      <CardGrid>
        {FakeData.map((card) => (
          <Link to={card.url} key={card.id}>
            <CardButton>{card.title}</CardButton>
          </Link>
        ))}
      </CardGrid>
    </NoticeAreaContainer>
  );
};

export default NoticeArea;
