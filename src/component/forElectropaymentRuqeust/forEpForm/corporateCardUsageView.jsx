import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { Radio, Select, Space } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
    CellValueChangedEvent,
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    ICellEditorComp,
    ICellEditorParams,
    RowValueChangedEvent,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import FileInput from '../../fileUpload';
import ApprRefGrid from './apprRefGrid';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

let newCount = 1;

function createNewRowData() {
    const newData = {
        // make: 'Toyota ' + newCount,
        // model: 'Celica ' + newCount,
        // price: 35000 + newCount * 17,
        // zombies: 'Headless',
        // style: 'Little',
        // clothes: 'Airbag',
    };
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

const CorporateCardUsageView = () => {
    const gridRef = useRef(null);

    const rowData = [
        {'시작일시': '', '종료일시': '', '부서코드': '', '사용부서' : '', '거래처명': '', '비용타입': '', 수량: '', 단가: '', '공급가액': '', '부가세액': '', '총 금액': '', '비고': ''},
    ];

    const rowData2 = [
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
        {field: '시작일시', sortable: true, filter: true,  headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true},
        {field: '종료일시', sortable: true, filter: true},
        {field: '부서코드', sortable: true, filter: true},
        {field: '사용부서', sortable: true, filter: true},
        {field: '거래처명', sortable: true, filter: true},
        {field: '비용타입', sortable: true, filter: true},
        {field: '수량', sortable: true, filter: true},
        {field: '단가', sortable: true, filter: true},
        {field: '공급가액', sortable: true, filter: true},
        {field: '총 금액', sortable: true, filter: true},
        {field: '비고', sortable: true, filter: true},
    ]);

    const [columnDefs2, setColumnDefs2] = useState([
        {field: '결재자', sortable: true, filter: true,  headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true},
        {field: '참조자', sortable: true, filter: true},
    ]);

    // useEffect(() => {
    //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //     .then(result => result.json())
    //     .then(rowData => setRowData(rowData))
    // }, []);

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

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            editorRef.current.setContent('<p>전자결재</p>');
        }
    };

    function autoCreateTable(columnList, newColumnList, location) {
        if (!Array.isArray(columnList)) {
            columnList = [columnList];
        }

        const gridApi = gridRef.current.api;
        const allData = gridApi.getModel().rowsToDisplay.map(row => row.data);
    
        const filteredData = allData.map(row => {
            const newData = {};
            for (const key of columnList) {
                newData[key] = row[key] || "";
            }
            return newData;
        });
        
        // 테이블 생성
        const table = document.createElement('table');
        table.className = 'my-table';
        table.style.borderCollapse = 'collapse'; 
        table.style.width = '100%'; 
        table.setAttribute('border', '1'); 
    
        // colgroup 생성
        const colgroup = document.createElement('colgroup');
        for (const _ in filteredData[0]) {
            const col = document.createElement('col');
            colgroup.appendChild(col);
        }
        table.appendChild(colgroup);
    
        // 테이블 헤더 생성
        const thead = document.createElement('thead');
        thead.style.backgroundColor = 'lightyellow'; 
        const headerRow = document.createElement('tr');
    
        for (const i in newColumnList) {
            const th = document.createElement('th');
            th.textContent = newColumnList[i];
            headerRow.appendChild(th);
        }
    
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // 테이블 본문 생성
        const tbody = document.createElement('tbody');
    
        filteredData.forEach(rowData => {
            const row = document.createElement('tr');
    
            for (const key in rowData) {
                const cell = document.createElement('td');
                cell.textContent = rowData[key];
                cell.style.textAlign = 'center';
                row.appendChild(cell);
            }
    
            tbody.appendChild(row);
        });
    
        table.appendChild(tbody);
    
        const tableHtmlString = table.outerHTML;

        const editor = editorRef.current;
        if (editor) {
            const currentContent = editor.getContent(); 
            const updatedContent = currentContent.replace('<div id="'+location+'"></div>', tableHtmlString); 
            editor.setContent(updatedContent); 
        }
    }

    function autoCreateSumTable(location) {
        const gridApi = gridRef.current.api;
        const allData = gridApi.getModel().rowsToDisplay.map(row => row.data);

        const groupedData = {};

        for (let i = 0; i < allData.length; i++) {
            const item = allData[i];
            const type = item["비용타입"];
            const amount = item["총 금액"];

            if (!groupedData[type]) {
                groupedData[type] = { 총금액: 0, 건수: 0 };
            }

            groupedData[type].총금액 += Number(amount);
            groupedData[type].건수++;
        }

        // 테이블 엘리먼트 생성
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse'; 
        table.style.width = '100%'; 
        table.setAttribute('border', '1'); 

        // colgroup 생성
        const colgroup = document.createElement('colgroup');
        for (const _ in groupedData[0]) {
            const col = document.createElement('col');
            colgroup.appendChild(col);
        }
        table.appendChild(colgroup);

        // 테이블 헤더 생성
        const headerRow = document.createElement('tr');
        const headers = ['바용항목', '전표건수', '금액소계'];
        headers.forEach(headerText => {
            const headerCell = document.createElement('th');
            headerCell.style.backgroundColor = 'lightyellow'; 
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });
        table.appendChild(headerRow);

        // 데이터 행 생성
        for (const key in groupedData) {
            if (groupedData.hasOwnProperty(key)) {
                const item = groupedData[key];
                const row = document.createElement('tr');
                const cellValues = [key, item['건수'], item['총금액']];
                cellValues.forEach(cellText => {
                    const cell = document.createElement('td');
                    cell.textContent = cellText;
                    cell.style.textAlign = 'center';
                    row.appendChild(cell);
                });
                table.appendChild(row);
            }
        }

        const tableHtmlString = table.outerHTML;
        
        const editor = editorRef.current;
        if (editor) {
            const currentContent = editor.getContent(); 
            const updatedContent = currentContent.replace('<div id="'+location+'"></div>', tableHtmlString); 
            editor.setContent(updatedContent); 
        }
    }

    const [todayDate, setTodayDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const TodayDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        setTodayDate(TodayDate);
    }, []);

    return (
        <CorporateCardUsageContainer>
            <FlexBox>
                <Title>법인카드 사용내역서</Title>
                <RequestBtn>요 청</RequestBtn>
            </FlexBox>

            <InputTitle placeholder='제목을 입력해주세요.'/>

            <Editor
                ref={editorRef}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={`
                    <div>
                        <h3>문서 종류: 법인카드 사용내역서</h3>
                        <p>&nbsp;</p>
                        
                        <h3>1. 사용자 현황</h3>
                        <p>- 사용부서: </p>
                        <p>- 사용자: </p>
                        <p>- 카드번호: </p>
                        <p>- 월사용계: </p>
                        
                        <p>&nbsp;</p>
                        <h3>2. 비용항목별 소계</h3>
                        <div id="insert-sum-table-here"></div>
                        
                        <p>&nbsp;</p>
                        <h3>3. 사용 상세 현황</h3>
                        <div id="insert-table-here"></div>
                        
                        <p>&nbsp;</p>
                        <p>위와 같이 상신하오니  검토 후 재가 바랍니다.</p>
                    </div>
                `}
                apiKey='gkyfnz48wo3yqa2iodxgl1skx1rebhsdsdl0g5a6rt3pk1k2'
                id='electropaymentRuqeust'
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'searchreplace',
                        'fullscreen',
                        'media',
                        'table',
                        'code',
                        'help',
                        'emoticons',
                        'codesample',
                        'quickbars',
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'lists table link charmap searchreplace | ' +
                    'image media codesample emoticons fullscreen preview | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <div id='detailGrid' style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <BtnBox>
                        <Btn onClick={() => addItems(count)}>추 가</Btn>
                        <Btn onClick={onRemoveSelected}>선택 삭제</Btn>
                        <Btn onClick={onBtStopEditing}>등 록</Btn>
                        <Btn onClick={() => {
                                autoCreateTable(["시작일시", "비용타입", "거래처명", "총 금액", "비고"], ["사용일자", "비용항목/상세", "거래처", "금액", "비고"], "insert-table-here");
                                autoCreateSumTable('insert-sum-table-here');
                            }}>표 삽입</Btn>
                    </BtnBox>
                    <div style={{ flexGrow: '1' }}>
                        <TableGrid className="ag-theme-alpine">
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
                        </TableGrid>
                    </div>
                </div>

                <ApprRefGrid />

                <FileInput />
            {/* <button onClick={log}>Log editor content</button> */}
        </CorporateCardUsageContainer>
    )
};

export default CorporateCardUsageView;

const CorporateCardUsageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 40px;
    margin-left: 40px;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 40px;
`;

const FlexBox = styled.div`
    display: flex;
`

const RequestBtn = styled.button`
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
    margin: 0px 15px 0px 720px;
    float: right;
`

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

const InputTitle = styled.input`
    width: 1080px; 
    height: 40px;
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

const BtnBox = styled.div`
    margin: 20px 0px 20px 10px;
    display: flex;
    justify-content: flex-end;
`

const TableGrid = styled.div`
    width: 1200px;
    height: 260px;
`

const ApprReferGrid = styled.div`
    width: 500px;
    height: 260px;
`