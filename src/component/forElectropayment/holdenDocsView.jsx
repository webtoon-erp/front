import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const HoldenDocsView = () => {
    const [rowData, setRowData] = useState([]);

    const employeeId = sessionStorage.getItem("employeeId");

    useEffect(() => {
        axios.get(`http://146.56.98.153:8080/plas/documents/myAppv/${employeeId}`)
            .then(response => {
                setRowData(rowData);
                console.log('정상적 처리');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const columnDefs = [      
        {field: '문서종류', sortable: true, filter: true, width: '130px'},
        {field: '작성일', sortable: true, filter: true, width: '150px'},
        {field: '제목', sortable: true, filter: true, width: '250px'},
        {field: '부서', sortable: true, filter: true, width: '130px'},
        {field: '작성자', sortable: true, filter: true, width: '110px'},
        {field: '결재대기자', sortable: true, filter: true, width: '168px'},
        {field: '최종결재자', sortable: true, filter: true, width: '130px'},
        {field: '상태', sortable: true, filter: true, width: '130px', 
            cellStyle: params=> {
                if(params.value === 'Y') {
                    return {color:'#F8F1F1', 'background-color':'#91CDF2', 'font-weight': 'bold'}
                } else return {color:'#F8F1F1', 'background-color':'#F2ACBF', 'font-weight': 'bold'}
        }},
    ];

    return (
        <>
            <Title>결재 대기 문서 조회</Title>                
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

export default HoldenDocsView;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const EntitlementGrid = styled.div`
    margin-top: 40px;
    width: 1200px;
    height: 960px;
`