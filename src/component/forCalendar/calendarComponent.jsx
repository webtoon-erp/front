import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import theme from '../../style/theme';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import axios from 'axios';

const CalendarComponent = () => {
  const [selectedTag, setSelectedTag] = useState('전체');
  const [rowData, setRowData] = useState([]);
  const [selectedCellData, setSelectedCellData] = useState(null);
  
  
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

  const gridOptions = {
    columnDefs: columnDefs,
    rowSelection: 'single',
    animateRows: true,
    pagination: true,
    paginationPageSize: 10,
    onCellClicked: handleCellClick,
  };

  const navigate = useNavigate();

  const handleDelete = () => {
    if (selectedCellData) {
      const planId = selectedCellData.planId; // Replace 'id' with the actual property that holds the plan's unique identifier.
      
      axios
        .delete('http://146.56.98.153:8080/plans/'+planId, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            message.success('삭제 성공');
            navigate('/schedule');
            setSelectedCellData(null);
          } else {
            message.error('삭제 실패: 서버 응답 오류');
          }
        })
        .catch((error) => {
          message.error(`삭제 실패: ${error.message}`);
        });
    }
  };
  
  
  

  // 셀 클릭 핸들러
  function handleCellClick(event) {
    setSelectedCellData(event.data);
  }

  return (
    <>
      <Title>일정 조회</Title>

            <RegistBtnContainer>
              <Btn onClick={() => handleDelete()}>삭제</Btn>
            </RegistBtnContainer>
      <NoticeContainer>
        
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

const Btn = styled.button`
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

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 75%;
    margin-bottom: 20px;
`;

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
