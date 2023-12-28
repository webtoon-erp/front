import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';

const RefDocsView = () => {
    const [rowData, setRowData] = useState([]);

    const employeeId = sessionStorage.getItem("employeeId");

    useEffect(() => {
        axios.get(`http://146.56.98.153:8080/plas/documents/myCC/${employeeId}`)
            .then(response => {
                if (response.status === 200) {
                    setRowData(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const columnDefs = [      
        {headerName: '문서종류', field: 'templateName', sortable: true, filter: true, width: '130px'},
        {headerName: '작성일', field: 'reg_date', sortable: true, filter: true, width: '150px',
            cellRenderer: (data) => {
                const year = data.value[0];
                const month = ("0" + data.value[1]).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
                const day = ("0" + data.value[2]).slice(-2);
                return `${year}-${month}-${day}`;
            }
        },
        {headerName: '제목', field: 'title', sortable: true, filter: true, width: '250px'},
        {headerName: '부서', field: 'writeDeptName', sortable: true, filter: true, width: '130px'},
        {headerName: '작성자', field: 'writeUsername', sortable: true, filter: true, width: '110px'},
        {headerName: '결재대기자', field: 'currentApprover', sortable: true, filter: true, width: '168px'},
        {headerName: '최종결재자', field: 'lastApprover', sortable: true, filter: true, width: '130px'},
        {headerName: '상태', field: 'stat', sortable: true, filter: true, width: '130px', 
            cellStyle: params=> {
                if(params.value === 'Y') {
                    return {color:'#F8F1F1', 'background-color':'#91CDF2', 'font-weight': 'bold'}
                } else if(params.value === 'C') {
                    return {color:'#F8F1F1', 'background-color':'#70d67a', 'font-weight': 'bold'}
                } else return {color:'#F8F1F1', 'background-color':'#F2ACBF', 'font-weight': 'bold'}
            },
            cellRenderer: params => {
                if (params.value === 'Y') {
                    return '상신';
                } else if (params.value === 'C') {
                    return '결재 완료';
                } else {
                    return '임시 저장';
                }
            }},
    ];

    const navigate = useNavigate();

    const handleRowClick = (event) => {
        if (event.data.id) {
          navigate(`/epRequestDetail/${event.data.id}`);
        }
    };

    return (
        <>
            <Title>참조 문서 조회</Title>                
            <EntitlementGrid className="ag-theme-alpine">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        rowSelection='multiple'
                        pagination= {true}
                        paginationPageSize= {20}
                        onCellClicked={handleRowClick}
                    />
            </EntitlementGrid>
        </>
    )
};

export default RefDocsView;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const EntitlementGrid = styled.div`
    margin-top: 40px;
    width: 1200px;
    height: 960px;
`