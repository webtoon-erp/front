import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { message } from 'antd';
import styled from 'styled-components';
import theme from '../../../style/theme';
import HorizonLine from '../../horizonLine';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const EntitlementPayDetail = () => {
    const gridRef = useRef(null);
    const [rowData, setRowData] = useState([]);

    const onGridReady = (params) => {
        gridRef.current = params.api;
    };

    const onCellValueChanged = useCallback((event) => {
        console.log(
            'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
        );
    }, []);
    
    const onRowValueChanged = useCallback((event) => {
        let data = event.data;
        console.log(
            'onRowValueChanged: (' +
                data.item +
                ', ' +
                data.quantity +
                ', ' +
                data.price +
            ')'
        );
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        {  headerName: '자격증 명', field: 'name', editable: true,
            headerCheckboxSelection: true,checkboxSelection: true, showDisabledCheckboxes: true , width: 250 },
        { headerName: '자격 수당', field: 'money', editable: true , width: 100 },
    ]);

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
                    setRowData(response.data.qualificationList);
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

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            editable: true,
            cellDataType: false,
        };
    }, []);
    
    //  ag-grid 현재 편집 모드 종료하는 역할
    const onBtStopEditing = useCallback(() => {
        gridRef.current.api.stopEditing();
    }, []);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 초기 필터 설정
        if (gridRef.current) {
            gridRef.current.setQuickFilter(document.getElementById('filter-text-box').value);
        }
    }, []);
    
    let count = 1;

    return (
        <EntitlementPayDetailContainer>
            <Title>자격수당 상세</Title>
            <HorizonLine />
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <Btn onClick={onBtStopEditing}>완료</Btn>
                <div style={{ flexGrow: '1' }}>
                <EntitlementPayGrid className="ag-theme-alpine">
                    <AgGridReact 
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowSelection="multiple"
                        animateRows={true}
                        editType="fullRow"
                        onCellValueChanged={onCellValueChanged}
                        onRowValueChanged={onRowValueChanged}
                        onGridReady= {onGridReady}
                    />
                </EntitlementPayGrid>
            </div>
            </div>
        </EntitlementPayDetailContainer>
    )
};

export default EntitlementPayDetail;

const EntitlementPayDetailContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const EntitlementPayGrid = styled.div`
    width: 405px;
    height: 261px;
`

const Btn = styled.button`
    width: 70px;
    height: 30px;
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
    margin: 0px 15px 20px 330px;
`