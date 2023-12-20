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
        noticeId: Id,
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
            setSelectedFiles(`http://146.56.98.153:8080/home/opc/file_repo/${noticeInfo.files[0].filePath}`);
            console.log("파일이름: " + noticeInfo.files[0].filePath);
          } 
        })
        .catch((error) => {
          console.error('데이터를 불러오는데 실패했습니다.', error);
        });
    }, []);

  const handleSaveChanges = () => {
    // JSON 데이터 객체 생성
    const jsonData = {
      title: selectedTitle,
      content: selectedContent,
      //readCount: selectedReadCount,
      noticeType: selectedTag,
      //noticeDate: selectedDate,
      //name: selectedAuthor,
      files: selectedFiles
    };

    const formData = new FormData();

    formData.append('dto', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));
    formData.append('files', selectedFiles);

    const noticeId = Id;

    axios
      .put(`http://146.56.98.153:8080/notice/${noticeId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then((response) => {
        if (response.status === 200) {
          message.success('공지사항 상세정보가 정상적으로 수정되었습니다.');
          setIsEditing(false);
          setNoticeData((prevData) => ({
            ...prevData,
            content: selectedContent,
            noticeType: selectedTag,
            title: selectedTitle,
            files: selectedFiles
          }));
        }
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
        }, 1000);
        })
        .catch((error) => {
          message.error('공지 삭제 실패', error);
        });
    }
  };

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
    setSelectedFiles(file);
};

  return (
    <NoticeDetailContainer>
    <FlexBox>
      <Title>공지사항 상세</Title>
      <BtnContainer>
        <Btn onClick={isEditing ? handleSaveChanges : handleToggleEdit}>
          {isEditing ? '등 록' : '수 정'}
        </Btn>
        <Btn onClick={() => deleteNoticeHandler()}>삭 제</Btn>
      </BtnContainer>
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
            <SmallTitle>첨부파일</SmallTitle>
            <FileImg src={selectedFiles} />
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

          
          <FileChangeContainer>
            <FileTitle>첨부 파일</FileTitle>
            <Input type="file" accept="image/*" onChange={handleFilesChange} />
          </FileChangeContainer>
                
          </NoticeContainer>
        )}
      </NoticeDetailContainer>
    );
};
  
export default NoticeDetailComponent; 

const NoticeDetailContainer = styled.div`
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

const Container = styled.div`
  border: 1px dashed #ccc;
  width: 50px;
  height: 25px;
  padding: 20px;
`;

const FileContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10px;
  margin-top: 80px;
`;

const FileChangeContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
`;

const FileTitle = styled.div`
    font-size: 15px;
    font-weight: bold;
    padding-top: 5px;
    padding-right: 15px;
`;

const Input = styled.input`
    height: 30px;
    border: transparent;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const ImagePreview = styled.img`
    max-width: 300px;
    max-height: 200px;
    margin-top: 10px;
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
`;

  const Title = styled.div`
  width: 300px;
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
    margin-left: 650px;
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
    width: 600px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
`;

const FileImg = styled.img`
  width: 300px;
  height: 400px;
  margin-left: 20px;
`;