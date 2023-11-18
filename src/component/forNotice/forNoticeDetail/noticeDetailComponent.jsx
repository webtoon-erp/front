import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from './../../../style/theme';
import { useNavigate } from 'react-router-dom'
import HorizonLine from '../../horizonLine';
import { message } from 'antd';
import FileDownloader from '../../fileDownloader';
import axios from 'axios';

const NoticeDetailComponent = ({Id}) => {
  const [noticeData, setNoticeData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedCellData, setSelectedCellData] = useState(null);
  const [selectedReadCount, setSelectedReadCount] = useState('');

  const navigate = useNavigate();
  
    useEffect(() => {

      const data = {
        webtoonId: Id,
      };

      axios
        .get(`http://146.56.98.153:8080/notice/${Id}`, {
          data: data,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const noticeInfo = response.data;
            setNoticeData(noticeInfo);
            setSelectedTag(noticeInfo.noticeType);
            setSelectedAuthor(noticeInfo.name);
            setSelectedTitle(noticeInfo.title);
            setSelectedDate(noticeInfo.noticeDate);
            setSelectedContent(noticeInfo.content);
            setSelectedReadCount(noticeInfo.readCount);
            setSelectedFiles(`http://146.56.98.153:8080/home/opc/file_repo/${noticeInfo.files}`);
          } 
        })
        .catch((error) => {
          console.error('데이터를 불러오는데 실패했습니다.', error);
        });
    }, []);

  const handleToggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleTitleChange = (e) => {
    setSelectedTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setSelectedContent(e.target.value);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const handleFilesChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setSelectedFiles(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // JSON 데이터 객체 생성
    const jsonData = {
      title: noticeData.selectedTitle,
      content: selectedContent,
      readCount: selectedReadCount,
      noticeType: selectedTag,
      noticeDate: selectedDate,
      name: selectedAuthor,
      files: selectedFiles
    };

    // FormData 객체 생성
    const formData = new FormData();

    // JSON 데이터를 'dto' 키로 추가
    formData.append('dto', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));

    // notice ID (Path Parameter)
    const noticeId = Id;

    // PUT 요청 보내기
    axios
      .put(`http://146.56.98.153:8080/notice/${noticeId}`, formData, {
        params: {
          noticeId: noticeId,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        message.success('공지사항 상세정보가 정상적으로 수정되었습니다.');
        setIsEditing(false);
        // 작품 정보 업데이트
        setNoticeData((prevData) => ({
          ...prevData,
          content: selectedContent,
          noticeType: selectedTag,
          noticeDate: selectedDate
        }));
      })
      .catch((error) => {
        message.error('공지사항 상세정보가 정상적으로 수정되지 않았습니다.');
        console.log(error);
      });
  };

  const deleteNoticeHandler = () => {
    if (Id) {
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
      };
  
      axios
        .delete(`http://146.56.98.153:8080/notice/${Id}`, 
        {
          noticeId: Id
        }
        ,
        {
          headers: headers,
        })
        .then((response) => {
          message.success('공지 삭제 성공');
          setSelectedCellData(null);
          setTimeout(() => {
            navigate('/notice');
        }, 3000);
        })
        .catch((error) => {
          message.error('공지 삭제 실패', error);
        });
    }
  };

  return (
    <NoticeDetailContainer>
      <BtnContainer>
        <Btn onClick={isEditing ? handleSaveChanges : handleToggleEdit}>
          {isEditing ? '등 록' : '수 정'}
        </Btn>
        <Btn onClick={() => deleteNoticeHandler()}>삭 제</Btn>
      </BtnContainer>
    <FlexBox>
      <Title>공지사항</Title>
      
    </FlexBox>
    {!isEditing ? (
      <NoticeContainer>
            <ContentTitle>{selectedTitle}</ContentTitle>
            
            <ContainerBox>
              <ContainerBox>
                <Container>
                  <SmallTitle>태그</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{selectedTag}</SmallContent>
                </SmallContentContainer>
              </ContainerBox>

              <ContainerBox>
                <Container>
                  <SmallTitle>조회수</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{selectedReadCount}</SmallContent>
                </SmallContentContainer>
              </ContainerBox>
            </ContainerBox>

            <ContainerBox>
              <ContainerBox>
                <Container>
                  <SmallTitle>등록일</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{selectedDate}</SmallContent>
                </SmallContentContainer>
              </ContainerBox>

              <ContainerBox>
                <Container>
                  <SmallTitle>작성자</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{selectedAuthor}</SmallContent>
                </SmallContentContainer>
              </ContainerBox>
            </ContainerBox>
          <HorizonLine />
          <ContentContainer>{selectedContent}</ContentContainer>

          <FileContainer>
            <FileDownloader files={[{ name: '파일', filename: selectedFiles }]}/>
          </FileContainer>
          </NoticeContainer>
        ) : (
            <NoticeContainer>
            <ContentTitle><InputContainer><InputField type="text" value={selectedTitle} onChange={handleTitleChange} /></InputContainer></ContentTitle>
            
            <ContainerBox>
              <ContainerBox>
                <Container>
                  <SmallTitle>태그</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent><InputContainer><InputField type="text" value={selectedTag} onChange={handleTagChange} /></InputContainer></SmallContent>
                </SmallContentContainer>
              </ContainerBox>

              <ContainerBox>
                <Container>
                  <SmallTitle>조회수</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{selectedReadCount}</SmallContent>
                </SmallContentContainer>
              </ContainerBox>
            </ContainerBox>

            <ContainerBox>
              <ContainerBox>
                <Container>
                  <SmallTitle>등록일</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{selectedDate}</SmallContent>
                </SmallContentContainer>
              </ContainerBox>

              <ContainerBox>
                <Container>
                  <SmallTitle>작성자</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{selectedAuthor}</SmallContent>
                </SmallContentContainer>
              </ContainerBox>
            </ContainerBox>
          <HorizonLine />
          <ContentContainer><InputContainer><InputField type="text" value={selectedContent} onChange={handleContentChange} /></InputContainer></ContentContainer>

          <FileContainer>
            <FileDownloader files={[{ name: '파일', filename: selectedFiles }]}/>
          </FileContainer>
          </NoticeContainer>
        )}
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

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const InputField = styled.input`
    background-color: ${theme.colors.textBox};
    height: 25px;
    width: 60px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
`;