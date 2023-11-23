import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { message } from 'antd';
import CommentComponent from '../../comments/commentComponent';


const ForEpisodeDetail = ({Id}) => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
      setUserId(sessionStorage.getItem("employeeId"));
    }, [userId]);


    //editing
    const [webtoonData, setWebtoonData] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 
    const [editedAuthor, setEditedAuthor] = useState('작가');
    const [editedManager, setEditedManager] = useState();
    const [editedTitle, setEditedTitle] = useState();
    const [editedContent, setEditedContent] = useState('작가의 말');
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [episodePreview, setEpisodePreview] = useState(null);

    useEffect(() => {
        const data = {
            webtoonDtID : Id,
        };
    
        axios
            .get('http://146.56.98.153:8080/webtoonDt/'+Id, {
            data: data,  
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            })
            .then((response) => {
            if (response.status === 200) {
                console.log("epiDetail", response.data)
                setWebtoonData(response.data.info);
                setEditedTitle(response.data.info.subTitle)
                setThumbnailPreview(`http://146.56.98.153:8080/home/opc/file_repo/${response.data.info.thumbnailFileName}`)
                setEditedAuthor(response.data.info.manager)
                setEditedManager(response.data.info.episodeNum)
                //setEditedContent(response.data.resourceEpisode)
                setEpisodePreview(`http://146.56.98.153:8080/home/opc/file_repo/${response.data.info.episodeFileName}`)
            }
            })
            .catch((error) => {
            message.error('데이터를 불러오는데 실패했습니다.', error);
            });
    }, []);

    const handleSaveChanges = () => {
        // JSON 데이터 객체 생성
        const jsonData = {
            subTitle: editedTitle,
            content: editedContent,
            managerId: userId, 
        };
        const formData = new FormData();

        // JSON 데이터를 'dto' 키로 추가
        formData.append('dto', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));
    
        //여기가 다른데 이 부분에서 400에러?
        //formData.append('file', thumbnailPreview);

        // 웹툰 회차 ID (Path Parameter)
        const webtoonId = Id;
    
        axios
            .put(`http://146.56.98.153:8080/webtoonDt/${webtoonId}`, formData, {
                params: {
                    webtoonDtId: webtoonId,
                },
                headers: {
                    'Content-Type': 'multipart/form-data', // 파일 업로드를 위해 Content-Type 변경
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    message.success('회차 상세정보가 정상적으로 수정되었습니다.');
                    setIsEditing(false);
                    // 작품 정보 업데이트
                    setWebtoonData((prevData) => ({
                        ...prevData,
                        subTitle: editedTitle,
                        content: editedContent,
                        managerId: userId,
                    }));
                }
            })
            .catch((error) => {
                message.error('회차 상세정보가 정상적으로 수정되지 않았습니다.');
            });
    };
    

    const handleDelete = () => {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
        };
        axios
        .delete('http://146.56.98.153:8080/webtoonDt/'+Id, {
            headers: headers,
        })
        .then((response) => {
            message.success('삭제 성공:', response);
            navigate(`/toonDetail/${Id}`);
        })
        .catch((error) => {
            message.error('삭제 실패:', error);
        });
    }

    const handleUpload = () => {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
        };
        axios
        .post('http://146.56.98.153:8080/webtoonDt/'+Id, {
            headers: headers,
        })
        .then((response) => {
            message.success(' 회차 최종 업로드 성공', response);
            navigate(`/webtoon`);
        })
        .catch((error) => {
            message.error('회차 최종 업로드 실패', error);
        });
    }

    
    const navigate = useNavigate();

    const handleToggleEdit = () => {
        setIsEditing((prevState) => !prevState);
    };
    

    const handleAuthorChange = (e) => {
        setEditedAuthor(e.target.value);
    };

    const handleManagerChange = (e) => {
        setEditedManager(e.target.value);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
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

    return (
        <>
            <RegistBtnContainer>
                <Btn onClick={isEditing ? handleSaveChanges : handleToggleEdit}>
                {isEditing ? '등 록' : '수 정'}
                </Btn>
                <Btn onClick={handleDelete}> 삭제 </Btn>
            </RegistBtnContainer>

    
            <WebtoonContainer>
                        <WebtoonImgContainer>
                            <Img src={thumbnailPreview} alt={` ${thumbnailPreview}의 썸네일 사진`} />
                        </WebtoonImgContainer>
                        
                        {!isEditing ? ( 
                        <>
                            <ToonInsideInfoBox>
                            <ToonTitle>{editedTitle}</ToonTitle>
                            
                            <ToonInfoContainer>
                                <ToonInfoBox>담당자 <ToonInfoData>{editedAuthor}</ToonInfoData></ToonInfoBox>
                                <ToonInfoBox>회차 <ToonInfoData>{editedManager}</ToonInfoData></ToonInfoBox>
                            </ToonInfoContainer>
                            <ToonInsideInfoTextBox>
                                <ToonInfoBox>작가의 말 <ToonInfoTextData>{editedContent}</ToonInfoTextData></ToonInfoBox>
                            </ToonInsideInfoTextBox>
                            </ToonInsideInfoBox>
                            </>
                            ):(
                        <>
                            <ToonInsideInfoBox>
                            <ToonTitle><InputContainer><InputTitleField type="text" value={editedTitle} onChange={handleTitleChange} /></InputContainer></ToonTitle>
                            
                            <ToonInfoContainer>
                            <ToonInfoBox>담당자 <InputContainer><InputField type="text" value={editedAuthor} onChange={handleAuthorChange} /></InputContainer></ToonInfoBox>
                            <ToonInfoBox>회차 <InputContainer><InputField type="text" value={editedManager} onChange={handleManagerChange} /></InputContainer></ToonInfoBox>
                            </ToonInfoContainer>
                            <ToonInsideInfoTextBox>
                                <ToonInfoBox>작가의 말 <InputContainer><InputTextField type="text" value={editedContent} onChange={handleContentChange} /></InputContainer></ToonInfoBox>
                            </ToonInsideInfoTextBox>
                            </ToonInsideInfoBox>
                        </>
                        ) }     
                        
                    </WebtoonContainer>
            <WebtoonWorksContainer>
                <ToonImg src={episodePreview} alt={` ${episodePreview}의 작품 사진`} />
            </WebtoonWorksContainer>

            <CommentContainer>
            <UploadBtnContainer>
                <UploadBtn onClick={handleUpload}> 최종등록 </UploadBtn>
            </UploadBtnContainer>
            </CommentContainer>
            
            <CommentContainer>
                <CommentComponent webtoonDtId={Id}/>
            </CommentContainer>

        </>
    )
};

export default ForEpisodeDetail;

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

const InputTitleField = styled.input`
    background-color: ${theme.colors.textBox};
    height: 25px;
    width: 400px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
`;

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

const UploadBtn = styled.button`
    width: 400px;
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

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 75%;
    margin-bottom: 20px;
`;

const UploadBtnContainer = styled.div`
    display: flex;
    padding-left: 25%;
    margin-bottom: 20px;
`;

const WebtoonContainer = styled.div`
    display: flex;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const CommentContainer = styled.div`
    display: flex;
    padding: 20px;
    width: 1000px;
    padding-left: 10%;
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

//수정 필요
const WebtoonWorksContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #eee;
    width: 100%;
`

const Img = styled.img`
    width: 180px;
    height: 270px;
`;

const ToonImg = styled.img`
    padding: 20px;
    width: 480px;
    height: 700px;
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