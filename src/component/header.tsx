import React, { useState ,useEffect } from 'react';
import styled from "styled-components";
import theme from "../style/theme";
import logo from "../img/logo1.png";
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

const Header: React.FC = () => {

    const toMyPage = () => {
        navigate("/myPage");
    };

    const [employeeToken, setEmployeeToken] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [messageId, setMessageId] = useState('');

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
                    sessionStorage.clear();
                    message.success('로그아웃 완료');
                    setTimeout(() => {
                        window.location.replace('/');
                    }, 1000);

                }
            })
            .catch((error) => {
                message.error('로그아웃 실패');
            });
    }

    const employeeId = sessionStorage.getItem("employeeId");

    useEffect(() => {
        axios.get(`http://146.56.98.153:8080/message/${employeeId}`)
        .then((response) => {
            if (response.status === 200) {
                setData(response.data);
                setMessageId(response.data);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const statChangeHandler = (messageId: any) => {
        const stat = 'R';
        axios
            .patch(`http://146.56.98.153:8080/message/${messageId}/${stat}`)
            .then((result) => {
                if (result.status === 200) {
                    console.log('정상 작동');
                }
            })
            .catch((error) => {
                console.error('상태 변경 실패', error);
            });
    }

    const contentData = (
        <div>
            <HorizonLine text={''}/>
            <div>
                {data.map((data: any) => (
                    <BellContent key={data.refId} onClick={() => statChangeHandler(data.messageId)}>
                        {data.content}
                    </BellContent>
                ))}
            </div>
        </div>
    );

    return (
            <HeaderStyle>
                    <ContentStyle>
                    <ImgStyle className="logo" alt="네이버 웹툰 로고 이미지" src={logo} />
                        <FlexBox>
                            <LogoutBtn onClick={logoutHandler}>Logout</LogoutBtn>
                            <Popover placement="bottom" title={text} content={contentData} trigger="click">
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