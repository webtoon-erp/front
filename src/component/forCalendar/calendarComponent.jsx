import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import SearchComponent from '../search';
import axios from 'axios';

const CalendarComponent = () => {
  const [selectedTag, setSelectedTag] = useState('전체');
  const [rowData, setRowData] = useState([]);
  
  useEffect(() => {
    // Make a GET request to fetch data
    axios.get('http://146.56.98.153:8080/plans/list', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setRowData(response.data);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);
  
  // ag-grid
  const columnDefs = [
    { headerName: '제목', field: 'title', width: 350 },
    { headerName: '작성자', field: 'author', width: 100 },
    { headerName: '작성일자', field: 'date', width: 200 },
    { headerName: '시작일자', field: 'startDate', width: 200 },
    { headerName: '종료일자', field: 'endDate', width: 200 },
  ];

  // 선택된 부서에 해당하는 프로필 필터링
  const filteredDays = selectedTag;

  const gridOptions = {
    columnDefs: columnDefs,
    rowSelection: 'single',
    animateRows: true,
    pagination: true,
    paginationPageSize: 10,
    onCellClicked: handleCellClick,
  };

  // 셀 클릭 핸들러
  function handleCellClick(event) {
    const column = event.colDef.field;
    const rowData = event.data;
    const url = rowData.url;
    if (column  && url) {
      window.location.href = url;
    }
  }

  return (
    <>
      <Title>일정 조회</Title>
      <NoticeContainer>
        <SelectDepContainer>
          <select value={selectedTag}>
            <option value="전체">전체</option>
            <option value="서비스">서비스</option>
            <option value="시스템">시스템</option>
            <option value="행사">행사</option>
          </select>
          <Container />
          <SearchComponent />
        </SelectDepContainer>
        
        <div className="ag-theme-alpine" style={{ height: '400px', width: '1050px' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            gridOptions={gridOptions}
          />
        </div>
      </NoticeContainer>
    </>
  );
};

export default CalendarComponent;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
  padding-left: 70px;
`;

const SelectDepContainer = styled.div`
  margin-bottom: 20px;
  select {
    width: 150px;
    height: 35px;
  }
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 40px;
  padding-left: 4%;
  font-weight: bold;
`;

const Container = styled.div`
  padding-left: 600px;
`;
