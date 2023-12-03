import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import theme from '../../../style/theme';
import { message } from 'antd';

const EmployeeView = () => {
    const isLoading = false;

    const [data, setData] = useState([]);
    const [selectedDep, setSelectedDep] = useState('전체');
    const [filteredEmp, setFilteredEmp] = useState([]);
    const [employeeToken, setEmployeeToken] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        setUserId(sessionStorage.getItem("employeeId"));
    }, [userId]);

    useEffect(() => {
        const employeeToken = sessionStorage.getItem("accessToken");
        if (employeeToken !== null) {
            setEmployeeToken(employeeToken);
        }
    }, []);

    useEffect(() => {
        axios
            .get('http://146.56.98.153:8080/users', {
                headers: {
                    Authorization: `Bearer ${employeeToken}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data);
                }
            })
            .then((result) => {
                if (result.status === 200) {
                    message.success(`직원 정보를 정상적으로 불러왔습니다.`);
                }
            })
            .catch((error) => {
                console.log(error);
                //message.error('직원 정보를 정상적으로 불러오지 못했습니다.');
            });
    }, []);

    useEffect(() => {
        setFilteredEmp(selectedDep === '전체' ? data : data.filter((emp) => `${emp.deptCode}` === selectedDep));
    }, [selectedDep, data]);

    // 부서 선택 핸들러
    const SelectDepHandler = (e) => {
        setSelectedDep(e.target.value);
    };

    const navigate = useNavigate();

    // const handleProfileClick = (event) => {
    //     console.log(event);
    //     if (event.data.id) {
    //         navigate(`/hrProfileView/${event.}`);
    //     }
    // };

    return(
        <EmpProfileContainer>
            <SelectAndBtnContainer>
                <SelectDepContainer>
                    <SelectDep value={selectedDep} onChange={SelectDepHandler}>
                        <OptionDep value="전체">전체</OptionDep>
                        <OptionDep value="HR">인사부</OptionDep>
                        <OptionDep value="AM">회계부</OptionDep>
                        <OptionDep value="WT">웹툰관리부</OptionDep>
                        <OptionDep value="IT">개발부</OptionDep>
                        <OptionDep value="">기타</OptionDep>
                    </SelectDep>
                </SelectDepContainer>

                <BtnContainer>
                    <Link to="/hrAdd">
                        <Btn>추 가</Btn>
                    </Link>
                </BtnContainer>
            </SelectAndBtnContainer>
            
            <CardGrid>
                {isLoading ? (
                Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonCardButton key={index}>
                        <Skeleton width={80} height={120} />
                    </SkeletonCardButton>
                ))
            ) : (
                filteredEmp.map((emp) => (
                    <CardButton key={emp.employeeId} onClick={() => navigate(`/hrProfileView/${emp.employeeId}`)}>
                        <Img src={emp.photo ? emp.photo : 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png'} alt={`${emp.position} ${emp.name}의 프로필 사진`} />
                        <EmpInfContainer>
                            <CardRank>{emp.position}</CardRank>
                            <CardName>{emp.name}</CardName>
                        </EmpInfContainer>
                    </CardButton>
                ))
                )}
            </CardGrid>
        </EmpProfileContainer>
    );
};

export default EmployeeView;

const EmpProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
`;

const SelectAndBtnContainer = styled.div`
    display: flex;
    width: 1160px;
    justify-content: space-between;
    margin-left: 15px;
    margin-bottom: 20px;
`

const SelectDepContainer = styled.div`
    width: 130px;
    height: 35px;
    border-radius: 8px;
    border: 3px solid ${theme.colors.btn};
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const SelectDep = styled.select`
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
    outline: 0 none;
    padding: 0 5px;
    cursor: pointer;
`;

const OptionDep = styled.option`
    background: #f1f1f1;
    font-size: 15px;
`;

const BtnContainer = styled.div`
    display: flex;
`;

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
    margin: 0px 15px 0px 15px;
`;

const EmpInfContainer = styled.div`
    width: 110px;
    height: 100px;
    flex-direction: column;
    border-radius: 8px;
    margin-top: 10px;
    background-color: #17DE76;
`;

const Img = styled.img`
    width: 130px;
    height: 140px;
    margin-top: 5px;
    border-radius: 8px;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 7px;
    margin-top: 20px;
`;

const CardButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 230px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 15px;
    padding: 5px 0px 25px 0px;
    background-color: #F7F7F7;
    cursor: pointer;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #f1f1f1;
    }
`;

const CardRank = styled.h3`
    color: ${theme.colors.white};
    margin: 0 auto;
    padding: 5px;
`;

const CardName = styled.div`
    margin-bottom: 7px;
    color: ${theme.colors.white};
    margin: 8px;
    font-weight: bold;
    font-size: 13px;
`;

const SkeletonCardButton = styled(CardButton)`
    background-color: #f9f9f9;
`;