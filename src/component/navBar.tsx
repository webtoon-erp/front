import React from 'react';
import { AreaChartOutlined, LaptopOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Avatar, Space } from 'antd';


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
    getItem('작품 관리', 'menu1', <AreaChartOutlined />, [

    ]),

    getItem('인사', 'menu2', <UserOutlined />, [
        getItem('직원 관리', '1'),
        getItem('근태 관리', '2'),
        getItem('급여 관리', '3'),
    ]),


    getItem('ITSM', 'menu3', <LaptopOutlined />, [
        getItem('서비스 요청', '4'),
        getItem('서비스 조회', '5'),
    ]),

    getItem('전자결재', 'menu4', <FileTextOutlined />, [
        getItem('결재 요청', '6'),
        getItem('내력 조회', '7'),
    ]),
];

const NavBar: React.FC = () => {
    // const onClick: MenuProps['onClick'] = (e) => {
        
    // };

    return (
        <Space direction="vertical" size={20}>
            <Space wrap size={16}>
            <Avatar size={64} style={{ marginLeft: '20px' }} icon={<UserOutlined />} />
                <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                    <div style={{ marginLeft: '10px' }}>
                        <div style={{ fontWeight: 'bold' }}>이름</div>
                        <div>부서</div>
                        <div>직급</div>
                    </div>
                </div>
            </Space>
            <Menu
            //onClick={onClick}
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