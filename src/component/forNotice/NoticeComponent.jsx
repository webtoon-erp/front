import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const fakeData = [
  {
    id: 1,
    date: '2023-07-01',
    title: 'notice 1',
    author: '총관리자',
    dep: '전체',
    url: '/notice1',
  },
  {
    id: 2,
    date: '2023-07-02',
    title: 'notice 2',
    author: '인사팀장',
    dep: '인사부',
    url: '/notice2',
  },
  {
    id: 3,
    date: '2023-07-03',
    title: 'notice 3',
    author: '회계팀장',
    dep: '회계부',
    url: '/notice3',
    },
    {
        id: 4,
        date: '2023-07-04',
        title: 'notice 4',
        author: '영업팀장',
        dep: '영업부',
        url: '/notice4',
    },
    {
        id: 5,
        date: '2023-07-05',
        title: 'notice 5',
        author: '기술팀장',
        dep: '기술부',
        url: '/notice5',
    },
    {
        id: 6,
        date: '2023-07-06',
        title: 'notice 6',
        author: '총관리자',
        dep: '전체',
        url: '/notice6',
    },
    {
        id: 7,
        date: '2023-07-07',
        title: 'notice 7',
        author: '인사팀장',
        dep: '인사부',
        url: '/notice7',
    },
    {
        id: 8,
        date: '2023-07-08',
        title: 'notice 8',
        author: '회계팀장',
        dep: '회계부',
        url: '/notice8',
    },
    {
        id: 9,
        date: '2023-07-09',
        title: 'notice 9',
        author: '영업팀장',
        dep: '영업부',
        url: '/notice9',
    },
    {
        id: 10,
        date: '2023-07-10',
        title: 'notice 10',
        author: '기술팀장',
        dep: '기술부',
        url: '/notice10',
    },
    {
        id: 11,
        date: '2023-07-11',
        title: 'notice 11',
        author: '총관리자',
        dep: '전체',
        url: '/notice11',
      },
      {
        id: 12,
        date: '2023-07-12',
        title: 'notice 12',
        author: '인사팀장',
        dep: '인사부',
        url: '/notice12',
      },
      {
        id: 13,
        date: '2023-07-13',
        title: 'notice 13',
        author: '회계팀장',
        dep: '회계부',
        url: '/notice13',
        },
        {
            id: 14,
            date: '2023-07-14',
            title: 'notice 14',
            author: '영업팀장',
            dep: '영업부',
            url: '/notice14',
        },
        {
            id: 15,
            date: '2023-07-15',
            title: 'notice 15',
            author: '기술팀장',
            dep: '기술부',
            url: '/notice15',
        },
        {
            id: 16,
            date: '2023-07-16',
            title: 'notice 16',
            author: '총관리자',
            dep: '전체',
            url: '/notice16',
        },
        {
            id: 17,
            date: '2023-07-17',
            title: 'notice 17',
            author: '인사팀장',
            dep: '인사부',
            url: '/notice17',
        },
        {
            id: 18,
            date: '2023-07-18',
            title: 'notice 18',
            author: '회계팀장',
            dep: '회계부',
            url: '/notice18',
        },
        {
            id: 19,
            date: '2023-07-19',
            title: 'notice 19',
            author: '영업팀장',
            dep: '영업부',
            url: '/notice19',
        },
        {
            id: 20,
            date: '2023-07-20',
            title: 'notice 20',
            author: '기술팀장',
            dep: '기술부',
            url: '/notice20',
        },
];

const NoticeComponent = () => {
    const [selectedDep, setSelectedDep] = useState('전체');
  
    // 부서 선택 핸들러
    const selectDepHandler = (e) => {
      setSelectedDep(e.target.value);
    };
  
    // 선택된 부서에 해당하는 프로필 필터링
    const filteredNotices = selectedDep === '전체' ? fakeData : fakeData.filter((emp) => emp.dep === selectedDep);
  
    // ag-grid
    const columnDefs = [
      { headerName: '아이디', field: 'id', width: 100 },
      { headerName: '작성일', field: 'date', width: 250 },
      { headerName: '부서', field: 'dep', width: 200 },
      { headerName: '제목', field: 'title', width: 380, cellRendererFramework: CellRenderer },
      { headerName: '작성자', field: 'author', width: 100 },
    ];
  
    const gridOptions = {
      columnDefs: columnDefs,
      rowData: filteredNotices,
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
      if (column !== 'title' && url) {
        // 제목 이외의 셀을 클릭하고 URL이 있을 때만 링크로 이동
        window.location.href = url;
      }
    }
  
    // 사용자 정의 셀 렌더러
    function CellRenderer(props) {
      const rowData = props.data;
      const title = rowData.title;
      const url = rowData.url;
      return (
        <Link to={url}>{title}</Link>
      );
    }
  
    return (
      <NoticeContainer>
        <SelectDepContainer>
          <select value={selectedDep} onChange={selectDepHandler}>
            <option value="전체">전체</option>
            <option value="인사부">인사부</option>
            <option value="회계부">회계부</option>
            <option value="영업부">영업부</option>
            <option value="기술부">기술부</option>
            <option value="">기타</option>
          </select>
        </SelectDepContainer>
        <div className="ag-theme-alpine" style={{ height: '400px', width: '1050px' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={filteredNotices}
            gridOptions={gridOptions}
          />
        </div>
      </NoticeContainer>
    );
  };
  
  export default NoticeComponent;
  
  const NoticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  `;
  
  const SelectDepContainer = styled.div`
    margin-bottom: 20px;
  
    select {
      width: 150px;
      height: 35px;
    }
  `;
