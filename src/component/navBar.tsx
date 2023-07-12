import React from 'react';
import { AreaChartOutlined, LaptopOutlined, UserOutlined, FileTextOutlined, ToolOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Avatar, Space } from 'antd';
import styled from 'styled-components';
import theme from '../style/theme';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
    key,
    icon,
    children,
    label,
    type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('작품 관리', 'webtoon', <AreaChartOutlined />),

    getItem('인사', 'menu2', <UserOutlined />, [
        getItem('직원 관리', 'hrView'),
        getItem('근태관리', '2', null, [getItem('내 근태 관리', 'hrMyAttendance'), getItem('부서 근태 관리', 'hrAttendance')]),
        getItem('급여 관리', 'hrSalary'),
    ]),


    getItem('ITSM', 'menu3', <LaptopOutlined />, [
        getItem('서비스 요청', '6'),
        getItem('서비스 조회', '7'),
    ]),

    getItem('전자결재', 'menu4', <FileTextOutlined />, [
        getItem('결재 요청', '8'),
        getItem('내역 조회', '9'),
    ]),

    getItem('시스템', 'menu5', <ToolOutlined />, [
        getItem('일정 관리', '10'),
        getItem('공지사항 관리', 'notice'),
    ]),
];

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        const selectedKey = e.key;
        const path = `/${selectedKey}`;
        navigate(path);
    };

    return (
        <Space direction="vertical" size={20}>
            <Space wrap size={16}>
            <Avatar size={64} style={{ marginLeft: '45px' }} icon={<UserOutlined />} />
                <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                    <div style={{ marginLeft: '10px' }}>
                        <div style={{ fontWeight: 'bold' }}>이름</div>
                        <div>부서</div>
                        <div>직급</div>
                    </div>
                </div>
            </Space>
            <div style={{ marginLeft: '35px' }}>
                <WorkBtn>출근</WorkBtn>
                <WorkBtn>퇴근</WorkBtn>
            </div>
            <Menu
                onClick={onClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['menu1']}
                mode="inline"
                items={items}
            />
        </Space>
    );
};

export default NavBar;

const WorkBtn = styled.button`
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