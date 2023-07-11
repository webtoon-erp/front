import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const currentDate = new Date();

const month = currentDate.getMonth() + 1;
const week = Math.ceil(currentDate.getDate() / 7);

const FakeData = [
    {
        id: 1,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 1',
        url: '/toon1',
    },
    {
        id: 2,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 2',
        url: '/toon2',
    },
    {
        id: 3,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 3',
        url: '/toon3',
    },
    {
        id: 4,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 4',
        url: '/toon4',
    },
    {
        id: 5,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 5',
        url: '/toon5',
    },
    {
        id: 6,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 6',
        url: '/toon6',
    },
];

const AfterUploadToon = () => {
    const isLoading = false;
    return(
        <AfterUploadToonContainer>
            <Title>{month}월 {week}주차 업로드 완료 웹툰</Title>
            <CardGrid>
                {FakeData.map((toon) => (
                    <Link to={toon.url} key={toon.id} style={{ textDecoration: 'none' }}>
                    {isLoading ? (
                    <SkeletonCardButton>
                        <Skeleton width={80} height={120} />
                    </SkeletonCardButton>
                    ) : (
                    <CardButton>
                        <Img src={toon.imageUrl} alt={toon.title} />
                        <CardTitle>{toon.title}</CardTitle>
                    </CardButton>
                    )}
                </Link>
                ))}
            </CardGrid>
        </AfterUploadToonContainer>
    );
};
export default AfterUploadToon;

const AfterUploadToonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    /* border: 1px solid #ccc; */
`;

const Img = styled.img`
    width: 130px;
    height: 140px;
    margin-top: 5px;
    border-radius: 8px;
`;

const Title = styled.h2`
    margin-bottom: 16px;
    margin-left: 10px;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8px;
`;

const CardButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 10px;
    background-color: #F7F7F7;
    cursor: pointer;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #f1f1f1;
    }
`;

const CardTitle = styled.h3`
    font-weight: bold;
    margin-bottom: 8px;
`;

const SkeletonCardButton = styled(CardButton)`
    background-color: #f9f9f9;
`;