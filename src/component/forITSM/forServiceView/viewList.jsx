import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import { message } from 'antd';
import axios from 'axios';
import styled from 'styled-components';

const ViewList = () => {
    const [rowData, setRowData] = useState([]);

    // const rowData = [
    //     {제목: 'title1', 요청자: 'employee1', 납기일: '2023-06-15', 승인자: 'employee3', 상태: '완료', url: '/title1'},
    //     {제목: 'title2', 요청자: 'employee2', 납기일: '2023-06-30', 승인자: 'employee3', 상태: '완료', url: '/title2'},
    //     {제목: 'title3', 요청자: 'employee2', 납기일: '2023-06-30', 승인자: 'employee4', 상태: '완료', url: '/title3'},
    //     {제목: 'title4', 요청자: 'employee3', 납기일: '2023-07-03', 승인자: 'employee2', 상태: '진행', url: '/title4'},
    //     {제목: 'title5', 요청자: 'employee4', 납기일: '2023-07-14', 승인자: '', 상태: '요청', url: '/title5'},
    //     {제목: 'title6', 요청자: 'employee2', 납기일: '2023-07-14', 승인자: '', 상태: '반려', url: '/title6'},
    // ];

    const columnDefs = [
        {field: '제목', sortable: true, filter: true, width: '150px'},
        {field: '요청자', sortable: true, filter: true, width: '130px'},
        {field: '납기일', sortable: true, filter: true, width: '130px'},
        {field: '승인자', sortable: true, filter: true, width: '130px'},
        {
            field: '상태',
            sortable: true,
            filter: true,
            width: '80px',
            cellStyle: params=> {
                if(params.value === '완료') {
                    return {color:'#F8F1F1', 'background-color':'#91CDF2', 'font-weight': 'bold'}
                } else if(params.value === '진행') {
                    return {color:'#F8F1F1', 'background-color':'#91F29B', 'font-weight': 'bold'}
                } else return {color:'#F8F1F1', 'background-color':'#F2ACBF', 'font-weight': 'bold'}
            }
        },
    ];

    const navigate = useNavigate();

    // function handleCellClick(event) {
    //     const column = event.colDef.field;
    //     const requests = event.data;
    //     const url = requests.url;
    //     if (column  && url) {
    //         window.location.href = url;
    //     }
    // }

    const handleRowClick = (event) => {
        if (event.data.id) {
            navigate(`/itRequestView/${event.data.id}`);
            console.log('확인');
        }
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('employeeId');

        if(userId) {
            axios.get(`http://146.56.98.153:8080/request/all/${userId}`, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setRowData(response.data);
                    console.log("response.data", response.data);
                } else {
                    message.error('데이터를 불러오는데 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('데이터를 불러오는데 실패했습니다.', error);
            });
        }
    }, []);
    
    return(
        <ViewListContainer>
            <RequestListGrid className="ag-theme-alpine">
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection='single'
                    domLayout= 'autoHeight'
                    pagination= {true}
                    paginationPageSize= {5}
                    onCellClicked= {handleRowClick}

                />
            </RequestListGrid>
        </ViewListContainer>
    );
};
export default ViewList;

const ViewListContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const RequestListGrid = styled.div`
    width: auto;
    height: auto;
    overflow: hidden;
`

// 추후 ag-grid에 적용 가능할 시 사용
// const StateBox = styled.div`
//     width: 20px;
//     height: 15px;
//     border-radius: 50px;
//     background-color: #91CDF2;
//     color: ${theme.colors.white};
//     box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
//     text-align: center;
// `
