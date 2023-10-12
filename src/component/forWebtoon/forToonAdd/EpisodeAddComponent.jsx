import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import theme from '../../../style/theme';
import { Button, Upload, message } from 'antd';
import { useParams } from 'react-router-dom';

const EpisodeAddComponent = ({ ToonId }) => {
  const { Id } = useParams();
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedWorks, setSelectedWorks] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [toonId, setToonId] = useState('');

  useEffect(() => {
    setEmployeeId(sessionStorage.getItem("employeeId"));
    setToonId(localStorage.getItem('Id'));
  }, []);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setSelectedThumbnail(event.target.result); // 썸네일 파일 저장
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleWorksChange = (e) => {
    const file = e.target.files[0];
    setSelectedWorks(file); // 컨텐츠 파일 저장
  };

  const handleSubmitClick = () => {
    // 필수 필드 확인
    if (!toonId || !selectedTitle || !selectedContent || !employeeId || !selectedThumbnail || !selectedWorks) {
      message.error('모든 필수 항목을 입력해주세요.');
      return;
    }

    // FormData 객체 생성
    const formData = new FormData();

    // JSON 데이터 객체 생성
    const jsonData = {
      webtoonId: toonId,
      subTitle: selectedTitle,
      content: selectedContent,
      employeeId: employeeId,
    };

    // JSON 데이터를 'dto' 키로 추가
    formData.append('dto', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));

    // 썸네일 파일을 'thumbnailFile' 키로 추가
    formData.append('thumbnailFile', selectedThumbnail);

    // 컨텐츠 파일을 'episodeFile' 키로 추가
    formData.append('webtoonFile', selectedWorks);

    console.log("formData", formData);
    // POST 요청
    axios
      .post('http://146.56.98.153:8080/webtoonDt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        console.log('result', result);
        if (result.status === 200) {
          message.success('회차가 정상적으로 등록되었습니다.');
        } else {
          message.error('회차가 정상적으로 등록되지 않았습니다.');
        }
      })
      .catch((error) => {
        message.error('회차가 정상적으로 등록되지 않았습니다.');
      });
  };

  const SelectTitlehandler = (e) => {
    setSelectedTitle(e.target.value);
  };

  const SelectContenthandler = (e) => {
    setSelectedContent(e.target.value);
  };

  return (
    <>
      <Title>회차 등록</Title>
      <RegistBtnContainer>
        <RegistBtn onClick={handleSubmitClick}>업로드</RegistBtn>
      </RegistBtnContainer>
      <MainContainer>
        <RangeContainer>
          <Container>
            <InputTitle>회차 제목</InputTitle><Div /><Input type="text" placeholder="회차 제목" onChange={SelectTitlehandler} />
          </Container>

          <Container>
            <InputTitle>작가의 말</InputTitle><Div2 /><TextArea placeholder="작가의 말" onChange={SelectContenthandler} />
          </Container>
        </RangeContainer>
        <RangeContainer>
          <Container>
            <InputTitle>썸네일 파일</InputTitle>
            <Input type="file" accept="image/*" onChange={handleThumbnailChange} />
          </Container>
          {selectedThumbnail && (
            <Container>
              <ImagePreview src={selectedThumbnail} alt="Thumbnail Preview" />
            </Container>
          )}
          <Container>
            <InputTitle>작품 파일</InputTitle><Div3 />
            <Input type="file" accept="image/*" onChange={handleWorksChange} />
          </Container>
          {selectedWorks && (
            <Container>
              <ImagePreview src={URL.createObjectURL(selectedWorks)} alt="Works Preview" />
            </Container>
          )}
        </RangeContainer>
      </MainContainer>
    </>
  );
};

export default EpisodeAddComponent;

const MainContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  margin: 30px 50px;
  height: 300px;
  padding-top: 50px;
`;

const Input = styled.input`
  height: 30px;
  border: transparent;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.10), 0 2px 2px rgba(0, 0, 0, 0.20);
`;

const TextArea = styled.textarea`
  height: 70px;
  width: 300px;
  border: transparent;
  background: transparent;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.10), 0 2px 2px rgba(0, 0, 0, 0.20);
  resize: none;
`;

const InputTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 15px;
  padding-top: 7px;
`;

const RangeContainer = styled.div`
  width: 50%;
  height: 100%;
`;

const Div = styled.div`
  padding: 18px;
`;

const Div2 = styled.div`
  padding: 17px;
`;

const Div3 = styled.div`
  padding: 8px;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 40px;
  padding-left: 4%;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 18px;
  padding-top: 12px;
`;

const ImagePreview = styled.img`
  max-width: 300px;
  max-height: 200px;
  margin-top: 10px;
`;

const RegistBtnContainer = styled.div`
  display: flex;
  padding-left: 85%;
`;

const RegistBtn = styled.button`
  width: 100px;
  height: 40px;
  background-color: ${theme.colors.btn};
  border: none;
  color: ${theme.colors.white};
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.10), 0 2px 2px rgba(0, 0, 0, 0.20);
  &:hover {
    background-color: #00B757;
  }
  cursor: pointer;
  margin: 0px 15px 0px 15px;
`;
