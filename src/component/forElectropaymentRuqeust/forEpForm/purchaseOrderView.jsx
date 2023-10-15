import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import { message } from 'antd';
import { savedData } from '../../../data.js';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import ApprRefGrid from './apprRefGrid';

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

const PurchaseOrderView = () => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userId, setUserId] = useState('');
    const [employeeToken, setEmployeeToken] = useState('');

    useEffect(() => {
        setUserId(sessionStorage.getItem("employeeId"));
    }, []);

    useEffect(() => {
        setEmployeeToken(sessionStorage.getItem("accessToken"));
        console.log("employeeToken", employeeToken)
    }, [employeeToken]);

    const handleRequestClick = () => {
        if (
            !userId ||
            !title ||
            !content
        ) {
            message.error('모든 필수 항목을 입력해주세요.');
            return;
        }

        const requestData = {
            title: title,
            content: content,
            templateName: "구매품의서",
            writeEmployeeId: userId,
            documentRcvRequests: [
                {
                    sortSequence: 1,
                    receiveType: "APPV",
                    rcvEmployeeId: userId,
                },
            ],
        };
        
        // FormData 객체 생성
        const formData = new FormData();

        // JSON 데이터를 FormData에 추가
        formData.append('dto', JSON.stringify(requestData));

        // 썸네일 파일을 'file' 키로 추가
        formData.append('file', selectedFile);

        console.log(
            userId,
            title,
            content,
            selectedFile
        )
        console.log("employeeToken", employeeToken)

        axios
            .post('http://146.56.98.153:8080/plas/documents',formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + employeeToken,
                },
            })
            .then((result) => {
                if (result.status === 200) {
                    message.success(`구매 품의서 결재 요청이 정상적으로 등록되었습니다.`);
                }
            })
            .catch((error) => {
                message.error('구매 품의서 결재 요청이 정상적으로 등록되지 않았습니다.');
            });
    }

    const gridRef = useRef(null);

    const rowData = [
        {'시작일시': '', '종료일시': '', '부서코드': '', '사용부서' : '', '거래처명': '', '비용타입': '', 수량: '', 단가: '', '공급가액': '', '부가세액': '', '총 금액': '', '비고': ''},
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
    // const log = () => {
    //     if (editorRef.current) {
    //         editorRef.current.setContent('<p>전자결재</p>');
    //     }
    // };
    
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

    const TitleHandler = (e) => {
        setTitle(e.target.value);
        savedData.noticeAdd.title = e.target.value;
    };
    const ContentHandler = (e) => {
        setContent(e.target.value);
        savedData.noticeAdd.content = e.target.value;
    };

    // 썸네일 이미지 업로드 핸들러
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file); // 썸네일 파일 저장
    };

    const [todayDate, setTodayDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const TodayDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        setTodayDate(TodayDate);
    }, []);

    return (
        <PurchaseOrderContainer>
            <FlexBox>
                <Title>구매 품의서</Title>
                <RequestBtn onClick={handleRequestClick}>요 청</RequestBtn>
            </FlexBox>

            <InputTitle placeholder='제목을 입력해주세요.' value={title} onChange={TitleHandler} />

            <Editor
                value={content} 
                onChange={ContentHandler}
                ref={editorRef}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={`
                    <div>
                        <h3>문서 종류: 구매 품의서</h3>
                        <p>&nbsp;</p>
                        <h3>1. 목적</h3>
                        <p>- </p>
                        <p>&nbsp;</p>
                        <h3>2. 내역</h3>
                        <p>- 사용 일자: 년 월 일 (요일)</p>
                        <p>- 사용자: </p>
                        <p>- 구매 비용: ₩ 원</p>
                        <p>- 업체: </p>
                        <p>- 상세 내역</p>
                        <div id="insert-table-here"></div>
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
                        <Btn onClick={() => autoCreateTable(["부서코드", "사용부서", "비고", "수량", "금액"], ["부서코드", "사용부서", "구매장비내역", "수량", "금액"], "insert-table-here")}>표 삽입</Btn>
                    </BtnBox>
                    <div style={{ flexGrow: '1' }}>
                        <DetailGrid className="ag-theme-alpine">
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
                        </DetailGrid>
                    </div>
                </div>

                <ApprRefGrid />

                <Container>
                    <FileTitle>첨부 파일</FileTitle>
                    <Input type="file" accept="image/*" onChange={handleThumbnailChange} />
                </Container>
                {selectedFile && (
                    <Container>
                        <ImagePreview src={URL.createObjectURL(selectedFile)} alt="Thumbnail Preview" />
                    </Container>
                )}
        </PurchaseOrderContainer>
    )
};

export default PurchaseOrderView;

const PurchaseOrderContainer = styled.div`
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

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
`;

const Input = styled.input`
    height: 30px;
    border: transparent;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const FileTitle = styled.div`
    font-size: 15px;
    font-weight: bold;
    padding-top: 5px;
    padding-right: 15px;
`;

const ImagePreview = styled.img`
    max-width: 300px;
    max-height: 200px;
    margin-top: 10px;
`;

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
    margin: 0px 15px 0px 840px;
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

const DetailGrid = styled.div`
    width: 1200px;
    height: 260px;
`