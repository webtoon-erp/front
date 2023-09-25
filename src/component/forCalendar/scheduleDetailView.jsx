import React, { useState, useEffect, useCallback, useRef } from 'react';
import theme from '../../style/theme';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import { HomeOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Breadcrumb, message } from 'antd';
import axios from 'axios';

const FakeNoticeData = [
    {
        id: 1,
        title: '클라이언트 미팅',
        author: '김이박',
        regDate: '2023.08.22',
        start: '2023.08.25',
        end: '2023.08.25',
    },
];

const ScheduleDetailView = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/home');
    }

    const handleNoticeClick = () => {
        navigate('/schedule');
    }

    //수정 가능 여부
    const [editable, setEditable] = useState('false');
    const [enrollable, setEnrollable] = useState('false');

    //editing
    const [isEditing, setIsEditing] = useState(false); 
    const [editedTitle, setEditedTitle] = useState(FakeNoticeData[0].title);
    const [editedAuthor, setEditedAuthor] = useState(FakeNoticeData[0].author);
    const [editedRegDate, setEditedRegDate] = useState(FakeNoticeData[0].regDate);
    const [editedStart, setEditedStart] = useState(FakeNoticeData[0].start);
    const [editedEnd, setEditedEnd] = useState(FakeNoticeData[0].end);
    
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get('http://146.56.98.153:8080/plans').then((response)=> {
            setData(response.Result.plans);
            console.log(response);
        })
    }, []);

    const handleSaveChanges = () => {
        (axios.post('http://146.56.98.153:8080/plans'),
        {
            title : editedTitle,
            name : editedAuthor,
            registerDate : editedRegDate,
            startDate : editedStart,
            endDate : editedEnd
        },
        {
            headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Location : "/plans/{planId}"
            },
        })
        .then((result) => {
            if (result.planId) {
            message.success('일정이 정상적으로 수정되었습니다.');
        } 
        })
        .catch((error) => {
            message.error('일정이 정상적으로 수정되지 않았습니다.');
        })
    }

    const handleToggleEdit = () => {
        setIsEditing((prevState) => !prevState);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setEditedAuthor(e.target.value);
    };

    const handleRegDateChange = (e) => {
        setEditedRegDate(e.target.value);
    };

    const handleStartChange = (e) => {
        setEditedStart(e.target.value);
    };

    const handleEndChange = (e) => {
        setEditedEnd(e.target.value);
    };

    return (
        <>
            <BtnContainer>
                <Btn onClick={isEditing ? handleSaveChanges : handleToggleEdit}>
                    {isEditing ? '등 록' : '수 정'}
                </Btn>
                <Btn>삭 제</Btn>
            </BtnContainer>
            <FlexBox>
                <Title>일정 상세</Title>
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
                                    <CarryOutOutlined />
                                    <span>일정 조회</span>
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
                {!isEditing ? ( 
                    <>
                        <ContainerBox>
                            <ContainerBox>
                                <Container>
                                    <SmallTitle>제목</SmallTitle>
                                </Container>
                                <SmallContentContainer>
                                    <SmallContent>{data.title}</SmallContent>
                                </SmallContentContainer>
                            </ContainerBox>

                            <ContainerBox>
                                <Container>
                                    <SmallTitle>작성자</SmallTitle>
                                </Container>
                                <SmallContentContainer>
                                    <SmallContent>{data.name}</SmallContent>
                                </SmallContentContainer>
                            </ContainerBox>
                        </ContainerBox>

                        <ContainerBox>
                            <ContainerBox>
                                <Container>
                                    <SmallTitle>작성일자</SmallTitle>
                                </Container>
                                <SmallContentContainer>
                                    <SmallContent>{data.registerDate}</SmallContent>
                                </SmallContentContainer>
                            </ContainerBox>

                            <ContainerBox>
                                <Container>
                                    <SmallTitle>시작일자</SmallTitle>
                                </Container>
                                <SmallContentContainer>
                                    <SmallContent>{data.startDate}</SmallContent>
                                </SmallContentContainer>
                            </ContainerBox>
                        </ContainerBox>

                        <ContainerBox>
                            <ContainerBox>
                                <Container>
                                    <SmallTitle>종료일자</SmallTitle>
                                </Container>
                                <SmallContentContainer>
                                    <SmallContent>{data.endDate}</SmallContent>
                                </SmallContentContainer>
                            </ContainerBox>
                        </ContainerBox>
                    </>
                ):(
                    <>
                        <ContainerBox>
                            <ContainerBox>
                                <Container>
                                    <SmallTitle>제목</SmallTitle>
                                </Container>
                                <SmallContentContainer>
                                    <SmallContent><InputTitleField type="text" value={editedTitle} onChange={handleTitleChange} /></SmallContent>
                                </SmallContentContainer>
                            </ContainerBox>

                            <ContainerBox>
                                <Container>
                                    <SmallTitle>작성자</SmallTitle>
                                </Container>
                                <SmallContentContainer>
                                    <SmallContent><InputField type="text" value={editedAuthor} onChange={handleAuthorChange} /></SmallContent>
                                </SmallContentContainer>
                            </ContainerBox>
                        </ContainerBox>

                        <ContainerBox>
                            <ContainerBox>
                                <Container>
                                    <SmallTitle>작성일자</SmallTitle>
                                </Container>
                                <SmallContentContainer>
                                    <SmallContent><InputField type="text" value={editedRegDate} onChange={handleRegDateChange} /></SmallContent>
                                </SmallContentContainer>
                            </ContainerBox>

                            <ContainerBox>
                                <Container>
                                    <SmallTitle>시작일자</SmallTitle>
                                </Container>
                                <SmallContentContainer>
                                    <SmallContent><InputField type="text" value={editedStart} onChange={handleStartChange} /></SmallContent>
                                </SmallContentContainer>
                            </ContainerBox>
                        </ContainerBox>

                        <ContainerBox>
                            <ContainerBox>
                                <Container>
                                    <SmallTitle>종료일자</SmallTitle>
                                </Container>
                                <SmallContentContainer>
                                    <SmallContent><InputField type="text" value={editedEnd} onChange={handleEndChange} /></SmallContent>
                                </SmallContentContainer>
                            </ContainerBox>
                        </ContainerBox>
                    </>
                )}
            </NoticeContainer>
        </>
    );
};
export default ScheduleDetailView;

const NoticeContainer = styled.div`
    margin: 30px;
    margin-top: 30px;
    margin-left: 4%;
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 200px;
    width: 1150px;
    align-items: center;
    padding: 15px;
`;

const FlexBox = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
`

const BreadContainer = styled.div`
    margin-left: 60%;
`;

const Container = styled.div`
    border: 1px dashed #ccc;
    width: 60px;
    height: 25px;
    padding: 20px;
`;

const ContainerBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const Title = styled.div`
    font-size: 30px;
    padding-left: 4%;
    font-weight: bold;
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
    width: 430px;
    height: 25px;
    padding: 20px;
`;


const BtnContainer = styled.div`
    display: flex;
    margin-left: 930px;
    align-items: center;
    margin-top: 20px;
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