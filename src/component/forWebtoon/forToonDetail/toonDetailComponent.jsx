import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import theme from '../../../style/theme';

const ToonDetailComponent = ({ webtoonId }) => {
  const [webtoonData, setWebtoonData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAuthor, setEditedAuthor] = useState('');
  const [editedDrawer, setEditedDrawer] = useState('');
  const [editedDay, setEditedDay] = useState('');
  const [editedKeyword, setEditedKeyword] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://146.56.98.153:8080/webtoon/${webtoonId}`;
  
    axios.get(url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Rest of your code
          // ...
        } else {
          window.alert('데이터를 불러오는데 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('데이터를 불러오는데 실패했습니다.', error);
        window.alert('데이터를 불러오는데 실패했습니다.');
      });
  }, [webtoonId]);
  

  const handleClick = () => {
    navigate("/episodeAdd");
  };

  const handleToggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleAuthorChange = (e) => {
    setEditedAuthor(e.target.value);
  };

  const handleDrawerChange = (e) => {
    setEditedDrawer(e.target.value);
  };

  const handleDayChange = (e) => {
    setEditedDay(e.target.value);
  };

  const handleKeywordChange = (e) => {
    setEditedKeyword(e.target.value);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

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

  const handleSaveChanges = () => {
    // 수정된 데이터를 서버에 전송
    axios.post(`http://146.56.98.153:8080/register/${webtoonId}`,
      {
        editedAuthor,
        editedDrawer,
        editedDay,
        editedKeyword,
        editedContent,
        thumbnailPreview,
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((result) => {
        console.log(result);
        console.log("enroll!");
        window.alert('작품 상세정보가 정상적으로 수정되었습니다.');
      })
      .catch((error) => {
        window.alert('작품 상세정보가 정상적으로 수정되지 않았습니다.');
        console.log(error);
      });
  };

    return (
        <WebtoonContainer>
        <WebtoonImgContainer>
          <Img src={webtoonData ? webtoonData.thumbnailFileName : ''} alt={webtoonData ? `${webtoonData.thumbnailFileName}의 썸네일 사진` : ''} />
        </WebtoonImgContainer>
        <ToonInsideInfoBox>
          <ToonTitle>{webtoonData ? webtoonData.title : ''}</ToonTitle>
          {!isEditing ? (
            <>
              <ToonInfoContainer>
                <ToonInfoBox>작가 <ToonInfoData>{webtoonData ? webtoonData.artist : ''}</ToonInfoData></ToonInfoBox>
                <ToonInfoBox>그림 <ToonInfoData>{webtoonData ? webtoonData.illustrator : ''}</ToonInfoData></ToonInfoBox>
                <ToonInfoBox>업로드 요일 <ToonInfoData>{webtoonData ? webtoonData.category : ''}</ToonInfoData></ToonInfoBox>
                <ToonInfoBox>키워드 <ToonInfoData>{webtoonData ? webtoonData.keyword : ''}</ToonInfoData></ToonInfoBox>
              </ToonInfoContainer>
              <ToonInsideInfoTextBox>
                <ToonInfoBox>작품 설명 <ToonInfoTextData>{webtoonData ? webtoonData.intro : ''}</ToonInfoTextData></ToonInfoBox>
              </ToonInsideInfoTextBox>
            </>
          ) : (
            <>
              <ToonInfoContainer>
                <ToonInfoBox>작가 <InputContainer><InputField type="text" value={editedAuthor} onChange={handleAuthorChange} /></InputContainer></ToonInfoBox>
                <ToonInfoBox>그림 <InputContainer><InputField type="text" value={editedDrawer} onChange={handleDrawerChange} /></InputContainer></ToonInfoBox>
                <ToonInfoBox>업로드 요일 <InputContainer><InputField type="text" value={editedDay} onChange={handleDayChange} /></InputContainer></ToonInfoBox>
                <ToonInfoBox>키워드 <InputContainer><InputField type="text" value={editedKeyword} onChange={handleKeywordChange} /></InputContainer></ToonInfoBox>
              </ToonInfoContainer>
              <ToonInsideInfoTextBox>
                <ToonInfoBox>작품 설명 <InputContainer><InputTextField type="text" value={editedContent} onChange={handleContentChange} /></InputContainer></ToonInfoBox>
              </ToonInsideInfoTextBox>
            </>
          )}
        </ToonInsideInfoBox>
      </WebtoonContainer>
      
    )
};

export default ToonDetailComponent;

const Btn = styled.button`
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

const InputTextField = styled.textarea`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
    width: 650px;
    height: 80px;
`;

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 58%;
    margin-bottom: 20px;
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

const WebtoonContainer = styled.div`
    display: flex;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const WebtoonImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`

const Img = styled.img`
    width: 180px;
    height: 270px;
`;

const ToonInfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`
const ToonInfoBox = styled.div`
    display: flex;
    margin: 20px;
`
const ToonInsideInfoBox = styled.div`
    display: flex;
    flex-direction: column;
`
const ToonInsideInfoTextBox = styled.div`
    
`

const ToonInfoData = styled.div`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.10);
`
const ToonInfoTextData = styled.div`
    background-color: ${theme.colors.textBox};
    height: 75px;
    width: 650px;
    padding: 5px;
    padding-top: 10px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.10);
`
const ToonTitle = styled.div`
    font-size: 23px;
    margin: 15px;
    font-weight: bold;
`