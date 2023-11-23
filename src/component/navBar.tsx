import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChartOutlined, LaptopOutlined, UserOutlined, FileTextOutlined, ToolOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Avatar, Space, message } from 'antd';
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

    getItem('작품', 'menu2', <AreaChartOutlined />, [
        getItem('작품 관리', 'webtoon'),
        getItem('작품 조회', 'allToonView'),
    ]), 

    getItem('인사', 'menu3', <UserOutlined />, [
        getItem('직원 관리', '1', null, [getItem('전체 직원 관리', 'hrView'), getItem('조직도', 'hrOrgChart')]),
        getItem('근태 관리', '2', null, [getItem('내 근태 관리', 'hrMyAttendance'), getItem('전체 근태 관리', 'hrAttendance')]),
        getItem('급여 관리', '3', null, [getItem('내 급여 관리', 'hrSalary')]),
    ]),

    getItem('ITSM', 'menu4', <LaptopOutlined />, [
        getItem('서비스 요청', 'itRequestAdd'),
        getItem('서비스 조회', 'itRequestListView'),
    ]),

    getItem('전자결재', 'menu5', <FileTextOutlined />, [
        getItem('결재 요청', 'epRequestAdd'),
        getItem('결재 내역 조회', '9', null, [getItem('내 문서 조회', 'epMyDocsView'), getItem('부서 문서 조회', 'epDepDocsView'), getItem('결재 대기 문서 조회', 'epHoldenDocsView'), getItem('참조 문서 조회', 'epRefDocsView')]),
    ]),

    getItem('시스템', 'menu6', <ToolOutlined />, [
        getItem('일정 관리', '14', null, [getItem('일정 조회', 'schedule'), getItem('일정 등록', 'scheduleAdd')]),
        getItem('공지사항 관리', '15', null, [getItem('공지사항 조회', 'notice'), getItem('공지사항 등록', 'noticeAdd')]),
    ]),
];

interface NavBarProps {
    onAddTab: (title: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onAddTab }) => {
    const navigate = useNavigate();
    const [tabElements, setTabElements] = useState<{ title: string; fixed: boolean }[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [data, setData] = useState({});

    const onClick: MenuProps['onClick'] = (e) => {
        const selectedKey = e.key;
        const path = `/${selectedKey}`;
        navigate(path);

        // Tab 추가 로직을 상위 컴포넌트로 전달
        if (onAddTab) {
            onAddTab(selectedKey);
        }
    };

    const toMyPage = () => {
        navigate("/myPage");
    };

    const [userId, setUserId] = useState('');

    useEffect(() => {
        const employeeId = sessionStorage.getItem("employeeId");
        setUserId(employeeId || "");
    }, []);
    
    const workClickHandler = () => {
        axios
            .post('http://146.56.98.153:8080/attendance', 
            {
                attendType: "START",
                employeeId: userId,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((result) => {
                if (result.status === 200) {
                    message.success('출근이 기록되었습니다.');
                }
            })
            .catch((error) => {
                message.error('이미 오늘 출근 정보를 등록하였습니다.');
            });
    }

    const leaveClickHandler = () => {
        axios
            .post('http://146.56.98.153:8080/attendance', 
            {
                attendType: "END",
                employeeId: userId,
                
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((result) => {
                if (result.status === 200) {
                    message.success('퇴근이 기록되었습니다.');
                }
            })
            .catch((error) => {
                message.error('오늘 등록된 출근 정보가 없거나 이미 퇴근 정보를 등록하였습니다.');
            });
    }

    useEffect(() => {
        const userId = sessionStorage.getItem('employeeId');

        if (userId) {
            axios.get(`http://146.56.98.153:8080/users/${userId}`)
            .then(function (response) {
                if (response.status === 200) {
                    setData(response.data.info);
                } else {
                    message.error('데이터를 불러오는데 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('Error fetching attendance data:', error);
            });
        }
    }, []);

    return (
        <Space direction="vertical" size={20}>
            <Space wrap size={16}>
            {data.photo ? (
                <ProfileImg src={data.photo} onClick={toMyPage} />
            ) : (
                <Avatar
                    onClick={toMyPage}
                    size={64}
                    style={{ marginLeft: '45px', cursor: 'pointer' }}
                    icon={<UserOutlined />}
                />
            )}
                <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                    <div style={{ marginLeft: '10px' }}>
                        <div style={{ fontWeight: 'bold' }}>{data.name}</div>
                        <div>{data.deptName}</div>
                        <div>{data.position}</div>
                    </div>
                </div>
            </Space>
            <div style={{ marginLeft: '35px' }}>
                <WorkBtn onClick={workClickHandler}>출근</WorkBtn>
                <WorkBtn onClick={leaveClickHandler}>퇴근</WorkBtn>
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

const ProfileImg = styled.img`
    margin-left: 45px;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    cursor: pointer;
`