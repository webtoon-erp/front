import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import HorizonLine from '../../horizonLine';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const SalaryStub = () => {
    const [rowData, setRowData] = useState([]);
    const gridRef = useRef(null);

    const onGridReady = (params) => {
        gridRef.current = params.api;
    };

    const [columnDefs, setColumnDefs] = useState([
        {headerName: '급여월', field: 'payMonth', sortable: true, filter: true, width: '150px'},
        {headerName: '급여 지급일', field: 'payDate', sortable: true, filter: true, width: '180px'},
        {headerName: '지급 합계', field: 'totalMonthSalary', sortable: true, filter: true, width: '180px'},
        {headerName: '공제 후 지급액', field: 'totalMonthSalary', sortable: true, filter: true, width: '180px'},
    ]);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 초기 필터 설정
        if (gridRef.current) {
            gridRef.current.setQuickFilter(document.getElementById('filter-text-box').value);
        }
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem('employeeId');

        if(userId) {
            axios.get(`http://146.56.98.153:8080/pays/${userId}`, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setRowData(response.data.payList);
                    console.log("response.data", response.data.payList);
                } else {
                    message.error('데이터를 불러오는데 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('데이터를 불러오는데 실패했습니다.', error);
            });
        }
    }, []);

    return (
        <SalaryStubContainer>
            <Title>급여 명세서</Title>
            <HorizonLine />
            <SalaryStubGrid className="ag-theme-alpine">
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection='multiple'
                    onGridReady= {onGridReady}
                />
            </SalaryStubGrid>
        </SalaryStubContainer>
    )
};

export default SalaryStub;

const SalaryStubContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const SalaryStubGrid = styled.div`
    width: 720px;
    height: 300px;
`;
