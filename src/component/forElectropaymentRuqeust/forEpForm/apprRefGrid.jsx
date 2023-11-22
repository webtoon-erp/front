import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

let newCount = 1;

function createNewRowData() {
    const newData = {};
    newCount++;
    return newData;
}

const options = [];

for (let i = 10; i < 20; i++) {
    options.push({
        value: 'employee' + i,
        label: 'employee' + i,
    });
}

const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};

const ApprRefGrid = () => {
    const gridRef = useRef(null);

    const rowData = [
        {'결재자': '', '참조자': ''},
    ];

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
        {field: '결재자', sortable: true, filter: true,  headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true},
        {field: '참조자', sortable: true, filter: true},
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            editable: true,
            cellDataType: false,
        };
    }, []);
    
    const addItems = useCallback((addIndex) => {
        count++;
        const newItems = [
            createNewRowData(),
        ];
        const res = gridRef.current.api.applyTransaction({
            add: newItems,
            addIndex: addIndex,
        });
    }, []);
    
    //  ag-grid 현재 편집 모드 종료하는 역할
    const onBtStopEditing = useCallback(() => {
        gridRef.current.api.stopEditing();
    }, []);
    
    const onRemoveSelected = useCallback(() => {
        const selectedData = gridRef.current.api.getSelectedRows();
        const res = gridRef.current.api.applyTransaction({
            remove: selectedData,
        });
    }, []);

    let count = 1;

    return (
        <div id='apprReferGrid' style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <BtnBox>
                <Btn onClick={() => addItems(count)}>추 가</Btn>
                <Btn onClick={onRemoveSelected}>선택 삭제</Btn>
                <Btn onClick={onBtStopEditing}>등 록</Btn>
                <Btn>표 삽입</Btn>
            </BtnBox>
            <div style={{ flexGrow: '1' }}>
                <ApprReferGrid className="ag-theme-alpine">
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
                    />
                </ApprReferGrid>
            </div>
        </div>
    )
};

export default ApprRefGrid;

const Btn = styled.button`
    width: 90px;
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
    margin: 0px 15px 0px 20px;
    float: right;
`

const BtnBox = styled.div`
    margin: 20px 0px 20px 10px;
    display: flex;
    justify-content: flex-end;
`

const ApprReferGrid = styled.div`
    width: 500px;
    height: 260px;
`