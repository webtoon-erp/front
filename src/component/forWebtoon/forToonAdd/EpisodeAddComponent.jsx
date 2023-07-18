import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../../style/theme';

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
  padding: 18px;
`;

const Div2 = styled.div`
  padding: 17px;
`;


const Title = styled.div`
  font-size: 30px;
  padding-top: 120px;
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
    padding-left: 75%;
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

const EpisodeAddComponent = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setThumbnailPreview(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Title>회차 등록</Title>
      <RegistBtnContainer>
                    <RegistBtn>임시 저장</RegistBtn>
                    <RegistBtn>업로드</RegistBtn>
      </RegistBtnContainer>
      <MainContainer>
        <RangeContainer>
        <Container>
              <InputTitle>작품 제목</InputTitle><Div/><Input type="text" placeholder="작품 제목" />
          </Container>
          <Container>
              <InputTitle>회차 제목</InputTitle><Div/><Input type="text" placeholder="회차 제목" />
          </Container>

          <Container>
              <InputTitle>작가의 말</InputTitle><Div2/><TextArea placeholder="작가의 말" />
          </Container>
        </RangeContainer>
        <RangeContainer>
          <Container>
            <InputTitle>작품 파일</InputTitle>
            <Input type="file" accept="image/*" onChange={handleThumbnailChange} />
          </Container>
          {thumbnailPreview && (
            <Container>
              <ImagePreview src={thumbnailPreview} alt="Thumbnail Preview" />
            </Container>
          )}
        </RangeContainer>
      </MainContainer>
    </>
  );
};

export default EpisodeAddComponent;
