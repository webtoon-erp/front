import React, { useState ,useEffect } from 'react';
import styled from "styled-components";
import theme from "../style/theme";
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { message, Popover } from 'antd';
import { useNavigate } from "react-router-dom";
import HorizonLine from "./horizonLine";

const BellContent = styled.div`
    padding: 10px 0px 10px 0px;
    border-radius: 8px;
    &:hover {
        background-color: #ADF6D0;
        transition: all 0.3s;
    }
    cursor: pointer;
`

const text = <span>알림</span>;

const content = (
    <div>
        <HorizonLine text={''}/>
        <BellContent>Content</BellContent>
        <BellContent>Content</BellContent>
    </div>
);

const Header: React.FC = () => {

    const toMyPage = () => {
        navigate("/myPage");
    };

    const [employeeToken, setEmployeeToken] = useState('');

    useEffect(() => {
        const employeeToken = sessionStorage.getItem("accessToken");
        if (employeeToken !== null) {
            setEmployeeToken(employeeToken);
        }
    }, []);

    const navigate = useNavigate();

    const logoutHandler = () => {
        axios
            .post('http://146.56.98.153:8080/users/logout', null, {
                headers: {
                    Authorization: `Bearer ${employeeToken}`
                }
            })
            .then((result) => {
                if (result.status === 200) {
                    message.success('로그아웃 완료');
                    setTimeout(() => {
                        window.location.replace('/');
                    }, 3000);

                }
            })
            .catch((error) => {
                message.error('로그아웃 실패');
            });
    }

    return (
            <HeaderStyle>
                    <ContentStyle>
                    <ImgStyle className="logo" alt="네이버 웹툰 로고 이미지" src="https://upload.wikimedia.org/wikipedia/commons/0/09/Naver_Line_Webtoon_logo.png" />
                        <FlexBox>
                            <LogoutBtn onClick={logoutHandler}>Logout</LogoutBtn>
                            <Popover placement="bottom" title={text} content={content} trigger="click">
                                <BellOutlined style={ {color: 'white', fontSize: '20px', marginRight: '15px'} } />
                            </Popover>
                            <UserOutlined onClick={toMyPage} style={ {color: 'white', fontSize: '20px', cursor: 'pointer'} } />
                        </FlexBox>
                    </ContentStyle>
            </HeaderStyle>
    )
}
export default Header;

const HeaderStyle = styled.header`
    background-color: #22BB33;
    position: fixed;
    left: 262px;
    top: 0;
    width: 83%;
    height: 80px;
    z-index: 5;
`;

const ContentStyle = styled.div`
    display: flex;
    width: 100%;
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

const FlexBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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