import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import theme from './../../../style/theme';
import { useNavigate } from 'react-router-dom'
import HorizonLine from '../../horizonLine';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import FileDownloader from '../../fileDownloader';

const FakeNoticeData = [
    {
        id: 1,
        tag: '서비스',
        dept: '인사부',
        author: '작성자',
        title: '제목',
        date: '2023.08.22',
        content: `안녕하세요, 네이버웍스입니다.
        ​
        네이버웍스 비정기 업데이트가 2023년 7월 27일(목)에 진행됩니다.
        자세한 업데이트 사항은 아래 내용을 확인해 주시기 바랍니다.
        ​
        ■ 업데이트 일정 : 2023년 7월 27일(목) 오후 2시경
        ※ 앱 노출 시간은 앱스토어 사정에 따라 상이할 수 있습니다.
        ※ Mobile앱은 선택 업데이트 방식으로 [Mobile앱 > 더보기 > 애플리케이션 정보]를 통해서도 최신 버전으로 업데이트 할 수 있습니다.`,
        file: 'fileName'
    },
];


const NoticeDetailComponent = () => {

  const [selectedId, setSelectedId] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  
  //아래는 파일 첨부 필요하면 넣기
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  
    //const [data, setData] = useState({});

    //seEffect(() => {
    //    axios.get('http://localhost:5050/quals/'+Id).then((response)=> {
    //      setData(response.data);
    //      //console.log("ddddddd");
    //    })
    //  }, []);

    const navigate = useNavigate();

    const handleHomeClick = () => {
      navigate('/');
    }

    const handleNoticeClick = () => {
      navigate('/notice');
    }

  return (
    <NoticeDetailContainer>
      <BtnContainer>
        <Btn>수 정</Btn>
        <Btn>삭 제</Btn>
      </BtnContainer>
    <FlexBox>
      <Title>공지사항</Title>
      <BreadContainer>
        <Breadcrumb
            items={[
              {
                onClick: handleHomeClick,
                title: <HomeOutlined />,
              },
              {
                onClick: handleNoticeClick,
                title: (
                  <>
                    <UserOutlined />
                    <span>공지사항 조회</span>
                  </>
                ),
              },
              {
                title: `${FakeNoticeData[0].title}`,
              },
            ]}
          />
      </BreadContainer>
    </FlexBox>
    
        <NoticeContainer>
          <ContentTitle>{FakeNoticeData[0].title}</ContentTitle>

          <ContainerBox>
            <ContainerBox>
              <Container>
                <SmallTitle>태그</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{FakeNoticeData[0].tag}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>

            <ContainerBox>
              <Container>
                <SmallTitle>부서</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{FakeNoticeData[0].dept}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>
          </ContainerBox>

          <ContainerBox>
            <ContainerBox>
              <Container>
                <SmallTitle>등록일</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{FakeNoticeData[0].date}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>

            <ContainerBox>
              <Container>
                <SmallTitle>작성자</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{FakeNoticeData[0].author}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>
          </ContainerBox>
        <HorizonLine />
        <ContentContainer>{FakeNoticeData[0].content}</ContentContainer>

        <FileContainer>
          <FileDownloader files={[{ name: FakeNoticeData[0].title, filename: FakeNoticeData[0].file }]}/>
        </FileContainer>
        </NoticeContainer>
        
      </NoticeDetailContainer>

    );
};
  
export default NoticeDetailComponent; 

const NoticeDetailContainer = styled.div`
  padding-top: 20px;
  padding-left: 4%;
`;

const NoticeContainer = styled.div`
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 550px;
  width: 100%;
  align-items: center;
`;

const BreadContainer = styled.div`
  margin-left: 70%;
`;

const Container = styled.div`
  border: 1px dashed #ccc;
  width: 50px;
  height: 25px;
  padding: 20px;
`;

const FileContainer = styled.div`
  border: 1px dashed #ccc;
  width: 100%;
  height: 10px;
  margin: 30px;
  margin-top: 0px;
  border-radius: 8px;
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
`;

  const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const ContentTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 20px;
`;

const SmallTitle = styled.div`
    font-size: 15px;
    font-weight: bold;
`;

const SmallContent= styled.div`
    font-size: 15px;
`;

const SmallContentContainer = styled.div`
  border: 1px dashed #ccc;
  width: 450px;
  height: 25px;
  padding: 20px;
`;

const ContentContainer = styled.div`
  width: 90%;
  height: 200px;
  padding: 50px;;
`;

const BtnContainer = styled.div`
    display: flex;
    margin-left: 930px;
    align-items: center;
`;

const Btn = styled.button`
    width: 90px;
    height: 40px;
    background-color: ${theme.colors.btn};
    border: none;
    color: ${theme.colors.white};
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #00B757;
    }
    cursor: pointer;
    margin: 0px 15px 0px 15px;
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`