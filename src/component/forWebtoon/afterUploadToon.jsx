import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import theme from '../../style/theme.js';

const currentDate = new Date();

const month = currentDate.getMonth() + 1;
const week = Math.ceil(currentDate.getDate() / 7);

const AfterUploadToon = () => {
    const isLoading = false;
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState('요일');
    const [filteredToon, setFilteredToon] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get('http://146.56.98.153:8080/webtoon/cardview').then((response)=> {
            console.log(response.data);
            if (isMounted) {
                setData(response.data.finalWebtoons);
            }
        })
    }, []);

    useEffect(() => {
        setFilteredToon(selectedWeek === '요일' ? data : data.filter((toon) => `${toon.category}요일` === selectedWeek));
        console.log("week", selectedWeek);
    }, [selectedWeek, data]);

    const SelectWeekhandler = (e) => {
        setSelectedWeek(e.target.value);
    };
    
    return(
        <AfterUploadToonContainer>
            <FlexBox>
                <Title>{month}월 {week}주차 업로드 완료 웹툰</Title>
                <SelectWeekContainer>
                    <SelectWeek value={selectedWeek} onChange={SelectWeekhandler}>
                        <OptionWeek value="요일">요일</OptionWeek>
                        <OptionWeek value="월요일">월요일</OptionWeek>
                        <OptionWeek value="화요일">화요일</OptionWeek>
                        <OptionWeek value="수요일">수요일</OptionWeek>
                        <OptionWeek value="목요일">목요일</OptionWeek>
                        <OptionWeek value="금요일">금요일</OptionWeek>
                        <OptionWeek value="토요일">토요일</OptionWeek>
                        <OptionWeek value="일요일">일요일</OptionWeek>
                    </SelectWeek>
                </SelectWeekContainer>
            </FlexBox>
            <CardGrid>
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonCardButton key={index}>
                            <Skeleton width={80} height={120} />
                        </SkeletonCardButton>
                    ))
                ) : (
                    filteredToon.map((toon) => (
                        <CardButton key={toon.id} onClick={() => navigate(toon.fileurl)}>
                            <Img src={`http://146.56.98.153:8080${toon.fileName}`} alt={toon.title} />
                            <CardTitle>{toon.title}</CardTitle>
                        </CardButton>
                    ))
                )}          
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

const SelectWeekContainer = styled.div`
    width: 130px;
    height: 35px;
    border-radius: 8px;
    border: 3px solid ${theme.colors.btn};
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    margin-left: 120px;
`;

const SelectWeek = styled.select`
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
    outline: 0 none;
    padding: 0 5px;
    cursor: pointer;
`

const OptionWeek = styled.option`
    background: #f1f1f1;
    font-size: 15px;
`

const FlexBox = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
`

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