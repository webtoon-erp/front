'use strict';

import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message, Modal } from 'antd';
import { savedData } from '../../data.js'; 

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ServiceRequest = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState();
  const [selectedDate, setDate] = useState();
  const [selectedRequestType, setSelectedRequestType] = useState('');
  const [rowData2, setRowData2] = useState('');
  
  const [selectedAssignerId, setSelectedAssigner] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedRequest, setSelectedRequest] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [fileList, setFileList] = useState([]); 
  const [employeeToken, setEmployeeToken] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    setEmployeeId(sessionStorage.getItem("employeeId"));
  }, []);

  useEffect(() => {
    setEmployeeToken(sessionStorage.getItem("employeeToken"));
  }, []);

  const handleSubmitClick = () => {
    // 필수 필드가 비어있는지 확인
    if (
      !selectedRequestType ||
      !selectedTitle ||
      !selectedRequest ||
      !selectedDate ||
      !selectedAssignerId ||
      !employeeId ||
      !rowData,
      !thumbnailFile
    ) {
      message.error('모든 필수 항목을 입력해주세요.');
      console.log(
        selectedRequestType,
        selectedTitle ,
        selectedRequest,
        selectedDate ,
        selectedAssignerId ,
        employeeId ,
        rowData,
        thumbnailFile
      )
      return; // 필수 필드 중 하나라도 비어 있으면 요청을 보내지 않습니다.
    }

    if (selectedRequest === "업무 지원") {
    // 업무지원
    const requestData = {
      reqType: "assist",
      title: selectedTitle,
      content: selectedRequest,
      step: 0,
      dueDate: selectedDate,
      reqUserId: employeeId,
      itUserId: selectedAssignerId,
      requestDts: rowData,
    };
  
    // FormData 객체 생성
    const formData = new FormData();
  
    // JSON 데이터를 FormData에 추가
    formData.append('dto', JSON.stringify(requestData));
  
    // 썸네일 파일을 'file' 키로 추가
    formData.append('file', thumbnailFile);
  
    console.log(
      selectedRequestType,
      selectedTitle ,
      selectedRequest,
      selectedDate ,
      selectedAssignerId ,
      employeeId ,
      rowData,
      thumbnailFile
    )

    axios
      .post('http://146.56.98.153:8080/request', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + employeeToken,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          message.success(`[ITSM] 요청이 정상적으로 등록되었습니다.`);
        }
      })
      .catch((error) => {
        message.error('[ITSM] 요청이 정상적으로 등록되지 않았습니다.');
      });
  }
  else {
    // 구매
    const requestData = {
      reqType: "purchase",
      title: selectedTitle,
      content: selectedRequest,
      step: 0,
      dueDate: selectedDate,
      reqUserId: employeeId,
      itUserId: selectedAssignerId,
      requestDts: rowData,
    };
  
    // FormData 객체 생성
    const formData = new FormData();
  
    // JSON 데이터를 FormData에 추가
    formData.append('dto', JSON.stringify(requestData));
  
    // 썸네일 파일을 'file' 키로 추가
    formData.append('file', thumbnailFile);
  
    console.log(
      selectedRequestType,
      selectedTitle ,
      selectedRequest,
      selectedDate ,
      selectedAssignerId ,
      employeeId ,
      rowData,
      thumbnailFile
    )

    axios
      .post('http://146.56.98.153:8080/purchase-request', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + employeeToken,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          message.success(`[ITSM] 요청이 정상적으로 등록되었습니다.`);
        }
      })
      .catch((error) => {
        message.error('[ITSM] 요청이 정상적으로 등록되지 않았습니다.');
      });
  };
}
  

 useEffect(() => {
  axios
    .get('http://146.56.98.153:8080/IT-manager', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("it responese", response.data)
        setRowData2(response.data);
      }
    })
    .catch((error) => {
      message.error('데이터를 불러오는데 실패했습니다.');
    });
}, []);

  const assigners = []

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
  
    return `${year}-${month}-${day}`;
  }
  
  const SelectDeliveryDatehandler = (date) => {
    const formattedDate = formatDate(date);
    setDate(formattedDate);
    setSelectedDeliveryDate(date);
    savedData.itRequestAdd.selectedDeliveryDate = date;
  };
  
  const SelectAssignerhandler = (value) => {
    setSelectedAssigner(value);
    console.log(value);
    assigners.push(value);
  };
  const SelectTitlehandler = (e) => {
    setSelectedTitle(e.target.value);
    savedData.itRequestAdd.selectedTitle = e.target.value
  };
  const SelectRequesthandler = (e) => {
    setSelectedRequest(e.target.value);
    savedData.itRequestAdd.selectedRequest = e.target.value
  };
  const SelectRequestTypehandler = (e) => {
    setSelectedRequestType(e.target.value);
    savedData.itRequestAdd.selectedRequestType = e.target.value
  };
  
  // 썸네일 이미지 업로드 핸들러
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file); // 썸네일 파일 저장
  };

  //AgGridReact
  const gridRef = useRef(null);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const onCellValueChanged = useCallback((event) => {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }, []);


  //담당자
  const [columnDefs2, setColumnDefs2] = useState([
    { headerName: '이름', field: 'name', editable: false,
          headerCheckboxSelection: true,checkboxSelection: true, showDisabledCheckboxes: true , width: 250 },
    { headerName: '부서', field: 'deptName', editable: false , width: 150 },
    { headerName: '직급', field: 'position ', editable: false , width: 100 },
    { headerName: '사원번호', field: 'employeeId ', editable: false , width: 100 },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      cellDataType: false,
    };
  }, []);

  //요청 상품
  const [columnDefs, setColumnDefs] = useState([
    { headerName: '요청 품목', field: 'item', editable: true,
          headerCheckboxSelection: true,checkboxSelection: true, showDisabledCheckboxes: true , width: 250 },
    { headerName: '요청 수량', field: 'quantity', editable: true , width: 100 },
    { headerName: '예상 비용(단위:만원)', field: 'price', editable: true , width: 200 },
  ]);
 
  const createNewRowData = () => {
    return { item: '', quantity: 0, price: 0 };
  };
  
  let count = 1;
  const [rowData, setRowData] = useState([
    { content: '품목', count: 0, cost: 0 },
  ]);

  
  const onRowValueChanged = useCallback((event) => {
    var data = event.data;
    console.log(
      'onRowValueChanged: (' +
        data.item +
        ', ' +
        data.quantity +
        ', ' +
        data.price +
        ')'
    );
    const updatedRowData = [...rowData];

    const indexToUpdate = updatedRowData.findIndex(
      (item) => item.item === data.item
    );

    if (rowData[0] == data) return;
    
    rowData.push(data);
  }, [rowData]);

  const addItems = useCallback((addIndex) => {
    count++;
    const newItems = [
        createNewRowData(),
    ];

    gridRef.current.api.applyTransaction({
        add: newItems,
        addIndex: count,
    });
  }, []);

  const gridApis = []
  const onBtStopEditing = useCallback(() => {
      gridRef.current.api.stopEditing();
      const gridApi = gridRef.current.api;
      gridApis.push(gridApi);
  }, []);


  const onRemoveSelected = useCallback(() => {
      const selectedData = gridRef.current.api.getSelectedRows();
      const res = gridRef.current.api.applyTransaction({
          remove: selectedData,
      });
  }, []);

  // Ag-Grid에서 row 선택 시 호출되는 이벤트 핸들러
  const onRowSelected = useCallback((event) => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length === 1) {
      setSelectedAssigner(selectedRows[0].employeeId);
      setModalOpen(false);
      savedData.itRequestAdd.selectedAssigner = selectedRows[0].employeeId
    } 
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileList({ files: files });
  };


  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Title>서비스 요청</Title>
      <RegistBtnContainer>
                    <RegistBtn onClick={handleSubmitClick}>요청</RegistBtn>
      </RegistBtnContainer>
      
      <MainContainer>
          <RangeContainer1>
          <Container>
              <InputTitle>요청일</InputTitle>
              <Div />
              <DatePicker
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                disabled
                value={startDate}
              />
            </Container>

            <Container>
              <InputTitle>납기일</InputTitle>
              <Div />
              <DatePicker
                onChange={SelectDeliveryDatehandler}
                dateFormat="yyyy-MM-dd"
                selected={selectedDeliveryDate}
                minDate={new Date()}
                placeholderText="납기일"
              />
          </Container>
            <Container>
                <InputTitle>담당자</InputTitle><Div/>
                <Button type="primary" onClick={() => setModalOpen(true)}>
                  {selectedAssignerId ? selectedAssignerId : '담당자'}
                </Button>
                  <Modal
                    title="담당자 선택"
                    centered
                    open={modalOpen}
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                  >
                    <GridContainer> 
                          <div style={{ height: '150px', display: 'flex', flexDirection: 'column' }}>
                            
                            <div>
                              {[assigners]}
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
            </Container>

            <Container>
            <InputTitle>요청 타입</InputTitle><Div/>
                <Select value={selectedRequestType} onChange={SelectRequestTypehandler}>
                            <Option value="구매">구매 </Option>
                            <Option value="업무 지원">업무 지원</Option>
                </Select>
            </Container>
         
            <Container>
                <InputTitle>제목</InputTitle><Div2/><Input type="text" placeholder="제목" value={selectedTitle} onChange={SelectTitlehandler}/>
            </Container>
            <Container>
            <InputTitle>요청사항</InputTitle><TextArea placeholder="요청 사항" value={selectedRequest} onChange={SelectRequesthandler}/>
          </Container>

          </RangeContainer1>
        <RangeContainer4>
          <Container>
            <InputTitle>요청 상품</InputTitle><Div2/>
            <GridContainer> 
            <div id='detailGrid' style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <BtnBox>
                        <Btn onClick={() => addItems(count)}>추 가</Btn>
                        <Btn onClick={onRemoveSelected}>선택 삭제</Btn>
                        <Btn onClick={onBtStopEditing}>등 록</Btn>
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
              </GridContainer>
            </Container>
            <Div3 />
            
            <Container>
              <InputTitle>첨부 파일</InputTitle>
              <Input type="file" accept="image/*" onChange={handleThumbnailChange} />
            </Container>
            {thumbnailFile && (
              <Container>
                <ImagePreview src={URL.createObjectURL(thumbnailFile)} alt="Thumbnail Preview" />
              </Container>
            )}

        </RangeContainer4>
      </MainContainer>
      
    </>
  );
};

export default ServiceRequest;

const ImagePreview = styled.img`
  max-width: 300px;
  max-height: 200px;
  margin-top: 10px;
`;

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

const TableGrid = styled.div`
    width: 470px;
    height: 230px;
`

const GridContainer = styled.div`
    width: 400px;
    height: 100px;
`

const MainContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  margin: 30px 50px;
  height: 540px;
  padding-top: 50px;
`;

const Input = styled.input`
  height: 30px;
  border: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const TextArea = styled.textarea`
  height: 150px;
  width: 350px;
  border: transparent;
  background: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
  resize: none;
`;

const InputTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 15px;
  padding-top: 7px;
`;


const RangeContainer4 = styled.div`
  width: 100%;
  height: 100%;
`;


const RangeContainer1 = styled.div`
  width: 60%;
  height: 100%;
  padding-left: 30px;
`;

const Div = styled.div`
  padding: 8px;
`;

const Div2 = styled.div`
  padding: 13px;
`;

const Div3 = styled.div`
  padding: 100px;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 40px;
  padding-left: 4%;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 13px;
  margin: 20px;
`;

const Select = styled.select`
  width: inherit;
  height: 30px;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  padding: 0 10px;
  padding-top: 2px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const Option = styled.option`
  background: #ffffff;
  font-size: 15px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 86%;
`;

const RegistBtn = styled.button`
    width: 100px;
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
    margin: 0px 15px 0px 15px;
`