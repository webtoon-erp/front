'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
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
//import NumericCellEditor from './numericCellEditor';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

let newCount = 1;

function createNewRowData() {
  const newData = {
    make: 'Toyota ' + newCount,
    model: 'Celica ' + newCount,
    price: 35000 + newCount * 17,
    zombies: 'Headless',
    style: 'Little',
    clothes: 'Airbag',
  };
  newCount++;
  return newData;
}


const ServiceRequest = () => {
  //달력(요청, 납기일)

  const [startDate, setStartDate] = useState(new Date());
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);
  const [selectedRequestType, setSelectedRequestType] = useState('');
  
  const [selectedRequester, setSelectedRequester] = useState('');
  const [selectedAssigner, setSelectedAssigner] = useState('');
  const [SelectedTitle, setSelectedTitle] = useState('');
  const [selectedRequest, setSelectedRequest] = useState('');
  const [selectedthumbnail, setSelectedThumbnail] = useState(null);

  const handleSubmitClick = () => {
    //console.log(finalId, "finalId 결과값"); 

   axios.post('http://localhost:5050/register',
     {
      selectedDeliveryDate: selectedDeliveryDate,           
      selectedRequestType: selectedRequestType,  
      selectedRequester: selectedRequester,  
      selectedAssigner: selectedAssigner,
      SelectedTitle: SelectedTitle,
      selectedRequest: selectedRequest,
      selectedthumbnail: selectedthumbnail,
     },
     {
       headers: {
         'Content-Type': 'application/json',
       },
     })
     .then((result) => {
       console.log(result);
       console.log("enroll!");
       window.alert('[ITSM] 요청이 정상적으로 등록되었습니다.');
       //window.location.replace("/login"); 
     })
     .catch((error) => {
       window.alert('[ITSM] 요청이 정상적으로 등록되지 않았습니다.');
       console.log(error);
     })
 };
  
  const SelectRequesterhandler = (e) => {
    setSelectedRequester(e.target.value);
  };
  const SelectAssignerhandler = (e) => {
    setSelectedAssigner(e.target.value);
  };
  const SelectTitlehandler = (e) => {
    setSelectedTitle(e.target.value);
  };
  const SelectRequesthandler = (e) => {
    setSelectedRequest(e.target.value);
  };
  const SelectRequestTypehandler = (e) => {
    setSelectedRequestType(e.target.value);
  };
  const SelectThumbnailhandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setSelectedThumbnail(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  
  //AgGridReact
  const gridRef = useRef(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  
  const rowData = [
    {'-': '', '요청 품목': '품목', '요청 수량': 0, '가격': 0},
  ];

  const onCellValueChanged = useCallback((event) => {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }, []);

  const onRowValueChanged = useCallback((event) => {
    var data = event.data;
    console.log(
      'onRowValueChanged: (' +
        data.make +
        ', ' +
        data.model +
        ', ' +
        data.price +
        ', ' +
        data.field5 +
        ')'
    );
  }, []);

  
  const [columnDefs, setColumnDefs] = useState([
    { field: '-', cellEditor: 'agCheckboxCellEditor', cellDataType: true,},
    { field: '요청 품목', editable: true },
    { field: '요청 수량', editable: true },
    { field: '가격', editable: true },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      cellDataType: false,
    };
  }, []);

  const getRowData = useCallback(() => {
    const rowData = [];
    gridRef.current.api.forEachNode(function (node) {
      rowData.push(node.data);
   });
    console.log('Row Data:');
    console.table(rowData);
  }, []);

  const clearData = useCallback(() => {
    const rowData = [];
    gridRef.current.api.forEachNode(function (node) {
      rowData.push(node.data);
    });
    const res = gridRef.current.api.applyTransaction({
      remove: rowData,
    });
  }, []);

  const addItems = useCallback((addIndex) => {
    count++;
    const newItems = [
      createNewRowData(),
      createNewRowData(),
      createNewRowData(),
    ];
    const res = gridRef.current.api.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
  }, []);

  const updateItems = useCallback(() => {
    // update the first 2 items
    const itemsToUpdate = [];
    gridRef.current.api.forEachNodeAfterFilterAndSort(function (
      rowNode,
      index
    ) {
      // only do first 2
      if (index >= 2) {
        return;
      }
      const data = rowNode.data;
      data.price = Math.floor(Math.random() * 20000 + 20000);
      itemsToUpdate.push(data);
    });
    const res = gridRef.current.api.applyTransaction({
      update: itemsToUpdate,
    });
  }, []);

  const onRemoveSelected = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    const res = gridRef.current.api.applyTransaction({
      remove: selectedData,
    });
  }, []);

  var count = 1;

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
              />
            </Container>

            <Container>
              <InputTitle>납기일</InputTitle>
              <Div />
              <DatePicker
                  selected={selectedDeliveryDate}
                  onChange={(date) => setSelectedDeliveryDate(date)}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  placeholderText="납기일"
                  />
          </Container>

            <Container>
                <InputTitle>처리자</InputTitle><Div/><Input type="text" placeholder="처리자" required onChange={SelectRequesterhandler}/>
            </Container>

            <Container>
                <InputTitle>승인자</InputTitle><Div/><Input type="text" placeholder="승인자" onChange={SelectAssignerhandler}/>
            </Container>

            <Container>
            <InputTitle>요청 타입</InputTitle><Div/>
                <Select value={selectedRequestType} onChange={SelectRequestTypehandler}>
                            <Option value="구매">구매 </Option>
                            <Option value="업무 지원">업무 지원</Option>
                </Select>
            </Container>
         
            <Container>
                <InputTitle>제목</InputTitle><Div2/><Input type="text" placeholder="제목" onChange={SelectTitlehandler}/>
            </Container>
          </RangeContainer1>

        <RangeContainer4>
          <Container>
            <InputTitle>요청 사항</InputTitle><Div2/><TextArea placeholder="요청 사항" onChange={SelectRequesthandler}/>
          </Container>
          <Container> 
            <InputTitle>요청 상품</InputTitle><Div2/>
                <div style={{ height: '200px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '4px' }}>
                    <button onClick={() => addItems(count)}>Add Items Index</button>
                    <button onClick={updateItems}>Update Top 2</button>
                    <button onClick={onRemoveSelected}>Remove Selected</button>
                    <button onClick={clearData}>Clear Data</button>
                  </div>
                  <div style={{ flexGrow: '1' }}>
                    <div style={gridStyle} className="ag-theme-alpine">
                      <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowSelection={'multiple'}
                        animateRows={true}
                        editType={'fullRow'}
                        onCellValueChanged={onCellValueChanged}
                        onRowValueChanged={onRowValueChanged}
                      />
                  </div>
                </div>
                </div>
            </Container>
            <Container>
            <InputTitle>첨부 파일</InputTitle><Div2/>
            <Input type="file" accept="image/*" onChange={SelectThumbnailhandler} />
              {selectedthumbnail && (
                <Container>
                  <ImagePreview src={selectedthumbnail} alt="Thumbnail Preview" />
                </Container>
              )}
          </Container>
        </RangeContainer4>
      </MainContainer>
      
    </>
  );
};

export default ServiceRequest;

const MainContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  margin: 30px 50px;
  height: 500px;
  padding-top: 50px;
`;

const Input = styled.input`
  height: 30px;
  border: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const TextArea = styled.textarea`
  height: 100px;
  width: 400px;
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


const Title = styled.div`
  font-size: 30px;
  padding-top: 120px;
  padding-left: 4%;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 13px;
  margin: 20px;
`;

const ImagePreview = styled.img`
  max-width: 300px;
  max-height: 200px;
  margin-top: 10px;
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