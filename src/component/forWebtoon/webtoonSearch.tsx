import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../style/theme';
import SearchComponent from "../search";

const WebtoonSearch = () => {
    return(
        <WebtoonSearchContainer>
            <SearchComponent />
            <RegistBtnContainer>
                <Link to="/toonAdd">
                    <RegistBtn>작품 등록</RegistBtn>
                </Link>
                <Link to="/episodeAdd">
                    <RegistBtn>회차 등록</RegistBtn>
                </Link>
            </RegistBtnContainer>
        </WebtoonSearchContainer>       
    );
};
export default WebtoonSearch;

const WebtoonSearchContainer = styled.div`
    display: flex;
    width: 870px;
    justify-content: space-between;
`;

const RegistBtnContainer = styled.div`
    display: flex;
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