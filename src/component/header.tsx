import styled from "styled-components";
import theme from "../style/theme";
import { BellOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React from 'react';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const Header: React.FC = () => {
    return (
            <HeaderStyle>
                    <ContentStyle>
                    <ImgStyle className="logo" alt="네이버 웹툰 로고 이미지" src="images/Naver_Webtoon_logo.png" />
                        <Space direction="vertical">
                            <Search 
                                placeholder="search anything!"
                                allowClear
                                enterButton={
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: '#00D465' }}
                                    >Search
                                    </Button>
                                }
                                size="large"
                                onSearch={onSearch}
                            />
                        </Space>
                        <BellOutlined />
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
    justify-content: space-between;
`;


const ImgStyle = styled.img`
    width: 68px;
    height: 68px;
`