import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';
import HorizonLine from '../horizonLine';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { message, Modal } from 'antd';
import axios from 'axios';

const MyPageView = () => {
    const [data, setData] = useState({});
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem('employeeId');

        if (userId) {
            axios.get(`http://146.56.98.153:8080/users/${userId}`)
            .then(function (response) {
                if (response.status === 200) {
                    setData(response.data);
                    setRowData(response.data.qualifications || []);
                    console.log("response.data", response.data);
                } else {
                    message.error('데이터를 불러오는데 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('Error fetching attendance data:', error);
            });
        }
    }, []);

    const columnDefs = [
        {headerName: '자격증명', field: 'qlfcType', sortable: true, filter: true, width: '390px'},
        {headerName: '자격증 상세', field: 'content', sortable: true, filter: true, width: '380px'},
        {headerName: '만료일자', field: 'qlfcDate', sortable: true, filter: true}
    ];

    const [modalOpen, setModalOpen] = useState(false);

    const [todayDate, setTodayDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const TodayDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        setTodayDate(TodayDate);
    }, []);

    return (
        <>
            <FlexBox>
                <Title>마이페이지</Title>
                <Btn onClick={() => setModalOpen(true)}>유급휴가 신청</Btn>
                <Modal
                    title="유급휴가 신청"
                    centered
                    open={modalOpen}
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                >
                    <InputTitle placeholder='제목을 입력해주세요.'/>
                    <H3>문서 종류: 연차 신청서</H3>
                    <H3>날짜: {todayDate}</H3>
                    <H3 style={{ marginBottom: '5px' }}>사유: </H3>
                    <TextArea />
                    <p>위와 같이 상신하오니 검토 후 재가 바랍니다.</p>
                </Modal>
            </FlexBox>            
            <ProfileInHrSalaryContainer>
                <ProfileImgContainer>
                    <Img src={data.imageUrl} alt={`${data.position} ${data.name}의 프로필 사진`} />
                </ProfileImgContainer>
                <ProfileInfoContainer>
                    <ProfileInfoBox>사원명 <ProfileInfoData>{data.name}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>부서 <ProfileInfoData>{data.deptName}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>직급 <ProfileInfoData>{data.position}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>사원번호 <ProfileInfoData>{data.employeeId}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>입사일 <ProfileInfoData>{data.joinDate}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>휴대전화 <ProfileInfoData>{data.tel}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>이메일 <ProfileInfoData>{data.email}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>생년월일 <ProfileInfoData>{data.birthDate}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>잔여연차 <ProfileInfoData>{data.dayOff}</ProfileInfoData></ProfileInfoBox>
                </ProfileInfoContainer>
            </ProfileInHrSalaryContainer>
            <EntitlementGridContainer>
                <Title2>자격증</Title2>
                <HorizonLine />
                <EntitlementGrid className="ag-theme-alpine">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        rowSelection='multiple'
                    />
                </EntitlementGrid>
            </EntitlementGridContainer>
        </>
    )
};

export default MyPageView;

const ProfileInHrSalaryContainer = styled.div`
    display: flex;
    padding: 10px;
    border: 1px solid #ccc;
    width: 1000px;
    border-radius: 8px;
`;

const EntitlementGridContainer = styled.div`
    padding: 20px;
    margin-top: 30px;
    border: 1px solid #ccc;
    width: 980px;
    border-radius: 8px;
`;

const FlexBox = styled.div`
    display: flex;
`

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
`;

const Title2 = styled.div`
    font-size: 22px;
    font-weight: bold;
`;

const InputTitle = styled.input`
    width: 450px; 
    height: 40px;
    margin-top: 20px;
    margin-bottom: 5px;
    border: 2px solid #EEEEEE;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 14px;
    &::placeholder {
        color: #C3C3C3;
        font-size: 14px;
    }
`

const H3 = styled.h3`

`

const TextArea = styled.textarea`
    width: 450px; 
    height: 100px;
    margin-bottom: 10px;
    border: 2px solid #EEEEEE;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 14px;
    &::placeholder {
        color: #C3C3C3;
        font-size: 14px;
    }
`

const Btn = styled.button`
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
    margin: 0px 15px 0px 770px;
`

const ProfileImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
`

const Img = styled.img`
    width: 100px;
    height: 100px;
`;

const ProfileInfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`
const ProfileInfoBox = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
`
const ProfileInfoData = styled.div`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
`

const EntitlementGrid = styled.div`
    width: 980px;
    height: 260px;
`