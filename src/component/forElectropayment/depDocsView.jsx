import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const DepDocsView = () => {
    const [rowData, setRowData] = useState([]);

    const deptCode = sessionStorage.getItem("deptCode");

    useEffect(() => {
        axios.get(`http://146.56.98.153:8080/plas/documents/myDept/${deptCode}`)
            .then(response => {
                setRowData(rowData);
                console.log('정상적 처리');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const columnDefs = [      
        {headerName: '문서종류', field: 'templateName', sortable: true, filter: true, width: '130px'},
        {headerName: '작성일', field: 'reg_date', sortable: true, filter: true, width: '150px'},
        {headerName: '제목', field: 'title', sortable: true, filter: true, width: '250px'},
        {headerName: '부서', field: 'writeDeptName', sortable: true, filter: true, width: '130px'},
        {headerName: '작성자', field: 'writeUsername', sortable: true, filter: true, width: '110px'},
        {headerName: '결재대기자', field: 'currentApprover', sortable: true, filter: true, width: '168px'},
        {headerName: '최종결재자', field: 'lastApprover', sortable: true, filter: true, width: '130px'},
        {headerName: '상태', field: 'stat', sortable: true, filter: true, width: '130px',  
            cellStyle: params=> {
                if(params.value === 'Y') {
                    return {color:'#F8F1F1', 'background-color':'#91CDF2', 'font-weight': 'bold'}
                } else return {color:'#F8F1F1', 'background-color':'#F2ACBF', 'font-weight': 'bold'}
        }},
    ];

    return (
        <>
            <Title>부서 문서 조회</Title>                
            <EntitlementGrid className="ag-theme-alpine">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        rowSelection='multiple'
                        pagination= {true}
                        paginationPageSize= {20}
                    />
            </EntitlementGrid>
        </>
    )
};

export default DepDocsView;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const EntitlementGrid = styled.div`
    margin-top: 40px;
    width: 1200px;
    height: 960px;
`