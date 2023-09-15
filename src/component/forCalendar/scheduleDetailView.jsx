import React, { useState, useEffect, useCallback, useRef } from 'react';
import theme from '../../style/theme';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import { HomeOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

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

    return (
        <>
            <BtnContainer>
                <Btn>수 정</Btn>
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
                <ContainerBox>
                    <ContainerBox>
                        <Container>
                            <SmallTitle>제목</SmallTitle>
                        </Container>
                        <SmallContentContainer>
                            <SmallContent>{FakeNoticeData[0].title}</SmallContent>
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

                <ContainerBox>
                    <ContainerBox>
                        <Container>
                            <SmallTitle>작성일자</SmallTitle>
                        </Container>
                        <SmallContentContainer>
                            <SmallContent>{FakeNoticeData[0].regDate}</SmallContent>
                        </SmallContentContainer>
                    </ContainerBox>

                    <ContainerBox>
                        <Container>
                            <SmallTitle>시작일자</SmallTitle>
                        </Container>
                        <SmallContentContainer>
                            <SmallContent>{FakeNoticeData[0].start}</SmallContent>
                        </SmallContentContainer>
                    </ContainerBox>
                </ContainerBox>

                <ContainerBox>
                    <ContainerBox>
                        <Container>
                            <SmallTitle>종료일자</SmallTitle>
                        </Container>
                        <SmallContentContainer>
                            <SmallContent>{FakeNoticeData[0].end}</SmallContent>
                        </SmallContentContainer>
                    </ContainerBox>
                </ContainerBox>
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