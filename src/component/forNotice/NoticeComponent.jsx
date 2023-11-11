import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const NoticeComponent = () => {
    const [selectedTag, setSelectedTag] = useState('전체');
    const [rowData, setRowData] = useState([]);
    const gridRef = useRef(null);
  
  useEffect(() => {
    // Make a GET request to fetch data
    axios.get('http://146.56.98.153:8080/notice', {
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
  
    // 태그 선택 핸들러
    const selectTagHandler = (e) => {
      setSelectedTag(e.target.value);
    };

    const onGridReady = (params) => {
      gridRef.current = params.api;
    };

    const navigate = useNavigate();

    const handleNoticeRowClick = (event) => {
      if (event.data.id) {
        navigate(`/noticeDetail/${event.data.id}`);
      }
    };
  
    const filteredNotices = rowData.filter((notice) => selectedTag === '전체' ? true : notice.noticeType === selectedTag);
  
    // ag-grid
    const columnDefs = [
      { headerName: '태그', field: 'noticeType', width: 100 },
      { headerName: '제목', field: 'title', width: 400 },
      { headerName: '작성자', field: 'name', width: 100 },
      { headerName: '부서', field: 'deptName', width: 100 },
      { headerName: '작성일자', field: 'noticeDate', width: 200 },
      { headerName: '조회수', field: 'readCount', width: 100 },
    ];

      useEffect(() => {
        // 컴포넌트가 마운트될 때 초기 필터 설정
        if (gridRef.current) {
          gridRef.current.setQuickFilter(document.getElementById('filter-text-box').value);
        }
      }, []);

      const onFilterTextBoxChanged = useCallback(() => {
        // 필터 텍스트가 변경될 때 필터 설정
        if (gridRef.current) {
          gridRef.current.setQuickFilter(document.getElementById('filter-text-box').value);
        }
      }, []);
  
    return (
    <>
      <Title>공지사항</Title>

      <NoticeContainer>
        <SelectDepContainer>
          <select value={selectedTag} onChange={selectTagHandler}>
            <option value="전체">전체</option>
            <option value="서비스">서비스</option>
            <option value="시스템">시스템</option>
            <option value="행사">행사</option>
          </select>
          <Container />
            <input
              type="text"
              id="filter-text-box"
              placeholder="Filter..."
              onInput={onFilterTextBoxChanged}
            />
        </SelectDepContainer>
        
        <div className="ag-theme-alpine" style={{ height: '400px', width: '1000px' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={filteredNotices}
            rowSelection= 'single'
            animateRows= {true}
            pagination= {true}
            paginationPageSize= {10}
            onGridReady= {onGridReady}
            onCellClicked={handleNoticeRowClick}
          />
        </div>
        </NoticeContainer>
      </>

    );
  };
  
  export default NoticeComponent;
  
  const NoticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 40px;
    padding-left: 55px;
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
