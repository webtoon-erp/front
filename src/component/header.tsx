import styled from "styled-components";
import theme from "../style/theme";
import { BellOutlined } from '@ant-design/icons';
import React from 'react';

const Header: React.FC = () => {
    return (
            <HeaderStyle>
                    <ContentStyle>
                    <ImgStyle className="logo" alt="네이버 웹툰 로고 이미지" src="images/Naver_Webtoon_logo.png" />
                        <div>
                            <LogoutBtn>Logout</LogoutBtn>
                            <BellOutlined />
                        </div>
                    </ContentStyle>
            </HeaderStyle>
    )
}
export default Header;

const HeaderStyle = styled.header`
    background-color: ${theme.colors.main};
    position: fixed;
    left: 262px;
    top: 0;
    width: 83%;
    height: 80px;
`;

const ContentStyle = styled.div`
    display: flex;
    width: 100%
    max-width: 1000px;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-around;
`;


const ImgStyle = styled.img`
    width: 68px;
    height: 68px;
`

const LogoutBtn = styled.button`
    width: 70px;
    height: 23px;
    background-color: ${theme.colors.btn};
    border: none;
    color: ${theme.colors.white};
    text-align: center;
    border-radius: 50px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #00B757;
    }
    cursor: pointer;
    margin: 0px 30px 0px 0px;
`