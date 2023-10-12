import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { message } from 'antd';

const ToonAddComponent = () => {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedDrawer, setSelectedDrawer] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null); // 변경된 변수명

  // 각각의 input 값에 대한 핸들러 함수들
  const SelectTitlehandler = (e) => {
    setSelectedTitle(e.target.value);
  };

  const SelectAuthorhandler = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const SelectDrawerhandler = (e) => {
    setSelectedDrawer(e.target.value);
  };

  const SelectDayhandler = (e) => {
    setSelectedDay(e.target.value);
  };

  const SelectKeywordhandler = (e) => {
    setSelectedKeyword(e.target.value);
  };

  const SelectContenthandler = (e) => {
    setSelectedContent(e.target.value);
  };

  // 썸네일 이미지 업로드 핸들러
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file); // 썸네일 파일 저장
  };

 // 작품 등록 버튼 클릭 핸들러
const handleSubmitClick = () => {
  // 필수 필드가 비어있는지 확인
  if (
    !selectedTitle ||
    !selectedAuthor ||
    !selectedDrawer ||
    !selectedDay ||
    !selectedKeyword ||
    !selectedContent ||
    !thumbnailFile
  ) {
    message.error('모든 필수 항목을 입력해주세요.');
    return; // 필수 필드 중 하나라도 비어 있으면 요청을 보내지 않습니다.
  }


  // JSON 데이터 객체 생성
  const jsonData = {
    title: selectedTitle,
    artist: selectedAuthor,
    illustrator: selectedDrawer,
    category: selectedDay,
    keyword: selectedKeyword,
    intro: selectedContent,
  };

  // FormData 객체 생성
  const formData = new FormData();

  // JSON 데이터를 'dto' 키로 추가
  formData.append('dto', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));

  // 썸네일 파일을 'file' 키로 추가
  formData.append('file', thumbnailFile);


  // 데이터 출력
  // FormData 객체 순회
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }


  // POST 요청
  axios
    .post('http://146.56.98.153:8080/webtoon', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    })
    .then((result) => {
      console.log('result', result);
      if (result.status === 200) {
        message.success('작품이 정상적으로 등록되었습니다.');
      } else {
        message.error('작품이 정상적으로 등록되지 않았습니다.');
      }
    })
    .catch((error) => {
      message.error('작품이 정상적으로 등록되지 않았습니다.');
    });
};


  
  return (
    <>
      <Title>작품 등록</Title>
      <RegistBtnContainer> 
                    <RegistBtn onClick={handleSubmitClick}>업로드</RegistBtn>
      </RegistBtnContainer>
      <MainContainer>
        <RangeContainer>
        <Container>
              <InputTitle>제목</InputTitle><Div/><Input type="text" placeholder="제목" onChange={SelectTitlehandler}/>
          </Container>
          <Container>
              <InputTitle>작가</InputTitle><Div/><Input type="text" placeholder="작가" onChange={SelectAuthorhandler}/>
          </Container>
          <Container>
              <InputTitle>그림</InputTitle><Div/><Input type="text" placeholder="그림" onChange={SelectDrawerhandler}/>
          </Container>
          <Container>
              <InputTitle>업로드 요일</InputTitle>
              <Select value={selectedDay} onChange={SelectDayhandler}>
                          <Option value="월">월</Option>
                          <Option value="화">화</Option>
                          <Option value="수">수</Option>
                          <Option value="목">목</Option>
                          <Option value="금">금</Option>
                          <Option value="토">토</Option>
                          <Option value="일">일</Option>
              </Select>
          </Container>
          
          <Container>
              <InputTitle>키워드</InputTitle><Div3/>
              <Select value={selectedKeyword} onChange={SelectKeywordhandler}>
                          <Option value="로맨스">로맨스</Option>
                          <Option value="판타지/SF">판타지/SF</Option>
                          <Option value="시대/역사물">시대/역사물</Option>
                          <Option value="미스터리/스릴러물">미스터리/스릴러물</Option>
                          <Option value="캠퍼스물">캠퍼스물</Option>
                          <Option value="학원물">학원물</Option>
                          <Option value="드라마/일상물">드라마/일상물</Option>
                          <Option value="코믹물">코믹물</Option>
                          <Option value="액션/무협물">액션/무협물</Option>
              </Select>
          </Container>

          <Container>
              <InputTitle>작품 설명</InputTitle><Div2/><TextArea placeholder="작품 설명" onChange={SelectContenthandler}/>
          </Container>
        </RangeContainer>
        <RangeContainer>
        <Container>
  <InputTitle>썸네일</InputTitle>
  <Input type="file" accept="image/*" onChange={handleThumbnailChange} />
      </Container>
      {thumbnailFile && (
        <Container>
          <ImagePreview src={URL.createObjectURL(thumbnailFile)} alt="Thumbnail Preview" />
        </Container>
      )}

        </RangeContainer>
      </MainContainer>
    </>
  );
};

export default ToonAddComponent;


const MainContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  margin: 30px 50px;
  height: 420px;
  padding-top: 10px;
`;

const Input = styled.input`
  height: 30px;
  border: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const TextArea = styled.textarea`
  height: 70px;
  width: 300px;
  border: transparent;
  background: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
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
  padding: 25px;
`;

const Div2 = styled.div`
  padding: 8px;
`;

const Div3 = styled.div`
  padding: 18px;
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

const Select = styled.select`
  width: inherit;
  height: 30px;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  padding: 0 10px;
  padding-top: 2px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const Option = styled.option`
  background: #ffffff;
  font-size: 15px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
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
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #00B757;
    }
    cursor: pointer;
    margin: 0px 15px 0px 15px;
`