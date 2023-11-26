import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { savedData } from '../../../data.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import { message, Modal, Button } from 'antd';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import ModalComponent from '../../ModalComponent';

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
    const [rowData2, setRowData2] = useState('');
    const [selectedApprId, setSelectedApprover] = useState('');
    const [selectedRefId, setSelectedReferrer] = useState('');

    useEffect(() => {
        setUserId(sessionStorage.getItem("employeeId"));
    }, []);

    useEffect(() => {
        setEmployeeToken(sessionStorage.getItem("accessToken"));
    }, [employeeToken]);

    const navigate = useNavigate();

    const handleRequestClick = () => {
        if (
            !title ||
            !content ||
            !selectedFile ||
            !selectedApprId ||
            !selectedRefId
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
                    rcvEmployeeId: selectedApprId
                },
                {
                    sortSequence: 1,
                    receiveType: "CC",
                    rcvEmployeeId: selectedRefId,
                },
            ]
        };
        
        // FormData 객체 생성
        const formData = new FormData();

        // JSON 데이터를 FormData에 추가
        formData.append('dto', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

        // 썸네일 파일을 'file' 키로 추가
        formData.append('file', selectedFile);

        // 데이터 출력
        // FormData 객체 순회
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        axios
            .post('http://146.56.98.153:8080/plas/documents', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((result) => {
                if (result.status === 200) {
                    message.success(`구매 품의서 결재 요청이 정상적으로 등록되었습니다.`);
                    setTimeout(() => {
                        navigate('/epRequestAdd');
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log(error);
                message.error('구매 품의서 결재 요청이 정상적으로 등록되지 않았습니다.');
            });
    }

    useEffect(() => {
        axios
            .get('http://146.56.98.153:8080/plas/approvers', {
                headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                setRowData2(response.data);
                }
            })
            .catch((error) => {
                message.error('데이터를 불러오는데 실패했습니다.');
            });
    }, []);

    const gridRef = useRef(null);

    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

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
        {headerName: '시작일시', field: 'fromDate', sortable: true, filter: true,  headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true},
        {headerName: '종료일시', field: 'toDate', sortable: true, filter: true},
        {headerName: '부서코드', field: 'deptCode', sortable: true, filter: true},
        {headerName: '사용부서', field: 'deptName', sortable: true, filter: true},
        {headerName: '거래처명', field: 'company', sortable: true, filter: true},
        {headerName: '비용타입', field: 'expenseType', sortable: true, filter: true},
        {headerName: '수량', field: 'count', sortable: true, filter: true},
        {headerName: '단가', field: 'price', sortable: true, filter: true},
        {headerName: '공급가액', field: 'supAmt', sortable: true, filter: true},
        {headerName: '부가세액', field: 'vatAmt', sortable: true, filter: true},
        {headerName: '총 금액', field: 'totalAmt', sortable: true, filter: true},
        {headerName: '비고', field: 'remark', sortable: true, filter: true},
    ]);

    const [columnDefs2, setColumnDefs2] = useState([
        {headerName: '이름', field: 'name', sortable: true, filter: true,  headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true},
        {headerName: '부서', field: 'deptName', sortable: true, filter: true},
        {headerName: '팀번호', field: 'teamNum', sortable: true, filter: true},
        {headerName: '직급', field: 'position', sortable: true, filter: true},
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

    const approvers = [];

    const TitleHandler = (e) => {
        setTitle(e.target.value);
        savedData.elecReq.title = e.target.value;
    };

    const ContentHandler = (e) => {
        const editor = editorRef.current;
        if (editor) {
            const currentContent = editor.getContent(); 
            setContent(currentContent);
            savedData.elecReq.content = currentContent;
        }
    };

    // 썸네일 이미지 업로드 핸들러
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file); // 썸네일 파일 저장
    };

    const SelectApproverhandler = (value) => {
        setSelectedApprover(value);
        approvers.push(value);
    };

    const ReferrerHandler = (value) => {
        setSelectedReferrer(value);
        savedData.elecReq.selectedRefId = value;
    };

    // Ag-Grid에서 row 선택 시 호출되는 이벤트 핸들러
    // 수정 조건
    const onRowSelected = useCallback((event) => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        if (selectedRows.length === 1) {
            setSelectedApprover(selectedRows[0].employeeId);
            setModalOpen(false);
            savedData.elecReq.selectedAssigner = selectedRows[0].employeeId
        } 
    }, []);

    const [modalOpen, setModalOpen] = useState(false);

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

                    <ModalContainer>
                        <FileTitle>결재자</FileTitle><Div/>
                        <Button type="primary" onClick={() => setModalOpen(true)}>
                            {selectedApprId ? selectedApprId : '결재자'}
                        </Button>
                            <Modal
                                title="결재자"
                                centered
                                open={modalOpen}
                                onOk={() => setModalOpen(false)}
                                onCancel={() => setModalOpen(false)}
                            >
                                <GridContainer> 
                                    <div style={{ height: '150px', display: 'flex', flexDirection: 'column' }}>
                                        
                                        <div>
                                        {[approvers]}
                                        </div>
                                        <div style={{ flexGrow: '1' }}>
                                        <div style={gridStyle} className="ag-theme-alpine">
                                            <AgGridReact
                                            ref={gridRef}
                                            rowData={rowData2}
                                            columnDefs={columnDefs2}
                                            defaultColDef={defaultColDef}
                                            rowSelection={'single'}
                                            animateRows={true}
                                            onRowSelected={onRowSelected} // 이벤트 핸들러 등록
                                            />
                                        </div>
                                    </div>
                                    </div>
                                </GridContainer>
                            </Modal>
                    </ModalContainer>
                    
                    <ModalComponent selectedRefId={selectedRefId} onChange={ReferrerHandler} />

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

const ModalContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    margin-right: 20px;
`;

const GridContainer = styled.div`
    width: 400px;
    height: 100px;
`

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

const Div = styled.div`
    padding: 8px;
`;