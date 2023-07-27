import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import SearchComponent from '../../search';

const fakeData = [
    {
      id: 1,
      day: '월',
      title: '월요일웹툰1',
      author: 'author 1',
      drawer: 'drawer 1',
      keyword: '코미디',
      url: '/data1',
    },
    {
        id: 2,
        day: '월',
        title: '월요일웹툰2',
        author: 'author 2',
        drawer: 'drawer 2',
        keyword: '코미디',
        url: '/data2',
      },
      {
        id: 3,
        day: '월',
        title: '월요일웹툰3',
        author: 'author 3',
        drawer: 'drawer 3',
        keyword: '코미디',
        url: '/data3',
      },
      {
        day: '화',
        title: '화요일웹툰1',
        author: 'author 1',
        drawer: 'drawer 1',
        keyword: '코미디',
        url: '/data1',
      },
      {
          day: '화',
          title: '화요일웹툰2',
          author: 'author 2',
          drawer: 'drawer 2',
          keyword: '코미디',
          url: '/data2',
        },
        {
          day: '화',
          title: '월요일웹툰3',
          author: 'author 3',
          drawer: 'drawer 3',
          keyword: '코미디',
          url: '/data3',
        },
        {
            day: '수',
            title: '수요일웹툰1',
            author: 'author 1',
            drawer: 'drawer 1',
            keyword: '코미디',
            url: '/data1',
          },
          {
              day: '수',
              title: '수요일웹툰2',
              author: 'author 2',
              drawer: 'drawer 2',
              keyword: '코미디',
              url: '/data2',
            },
            {
              day: '수',
              title: '수요일웹툰3',
              author: 'author 3',
              drawer: 'drawer 3',
              keyword: '코미디',
              url: '/data3',
            },
            {
                day: '목',
                title: '목요일웹툰1',
                author: 'author 1',
                drawer: 'drawer 1',
                keyword: '코미디',
                url: '/data1',
              },
              {
                  day: '목',
                  title: '목요일웹툰2',
                  author: 'author 2',
                  drawer: 'drawer 2',
                  keyword: '코미디',
                  url: '/data2',
                },
                {
                  day: '목',
                  title: '목요일웹툰3',
                  author: 'author 3',
                  drawer: 'drawer 3',
                  keyword: '코미디',
                  url: '/data3',
                },
                {
                    day: '금',
                    title: '금요일웹툰1',
                    author: 'author 1',
                    drawer: 'drawer 1',
                    keyword: '코미디',
                    url: '/data1',
                  },
                  {
                      day: '금',
                      title: '금요일웹툰2',
                      author: 'author 2',
                      drawer: 'drawer 2',
                      keyword: '코미디',
                      url: '/data2',
                    },
                    {
                      day: '금',
                      title: '금요일웹툰3',
                      author: 'author 3',
                      drawer: 'drawer 3',
                      keyword: '코미디',
                      url: '/data3',
                    },
                    {
                        day: '토',
                        title: '토요일웹툰1',
                        author: 'author 1',
                        drawer: 'drawer 1',
                        keyword: '코미디',
                        url: '/data1',
                      },
                      {
                          day: '토',
                          title: '토요일웹툰2',
                          author: 'author 2',
                          drawer: 'drawer 2',
                          keyword: '코미디',
                          url: '/data2',
                        },
                        {
                          day: '토',
                          title: '토요일웹툰3',
                          author: 'author 3',
                          drawer: 'drawer 3',
                          keyword: '코미디',
                          url: '/data3',
                        },
                        {
                            day: '일',
                            title: '일요일웹툰1',
                            author: 'author 1',
                            drawer: 'drawer 1',
                            keyword: '코미디',
                            url: '/data1',
                          },
                          {
                              day: '일',
                              title: '일요일웹툰2',
                              author: 'author 2',
                              drawer: 'drawer 2',
                              keyword: '코미디',
                              url: '/data2',
                            },
                            {
                              day: '일',
                              title: '일요일웹툰3',
                              author: 'author 3',
                              drawer: 'drawer 3',
                              keyword: '코미디',
                              url: '/data3',
                            },
  ];

const AllWebtoonListView = () => {
    const [selectedDay, setSelectedDay] = useState('전체');
  
    // 태그 선택 핸들러
    const selectDayHandler = (e) => {
        setSelectedDay(e.target.value);
    };
  
    // 선택된 부서에 해당하는 프로필 필터링
    const filteredDays = selectedDay === '전체' ? fakeData : fakeData.filter((emp) => emp.day === selectedDay);
  
    // ag-grid
    const columnDefs = [
      { headerName: '요일', field: 'day', width: 100 },
      { headerName: '제목', field: 'title', width: 400 },
      { headerName: '작가', field: 'author', width: 120 },
      { headerName: '그림', field: 'drawer', width: 120 },
      { headerName: '키워드', field: 'keyword', width: 280 },
    ];
  
    const gridOptions = {
      columnDefs: columnDefs,
      rowData: filteredDays,
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
          <Title>전체 웹툰</Title>
            <ToonContainer>
                <SelectTagContainer>
                <select value={selectedDay} onChange={selectDayHandler}>
                    <option value="전체">전체</option>
                    <option value="월">월</option>
                    <option value="화">화</option>
                    <option value="수">수</option>
                    <option value="목">목</option>
                    <option value="금">금</option>
                    <option value="토">토</option>
                    <option value="일">일</option>
                </select>
                <Container />
                    <SearchComponent />
                </SelectTagContainer>
                
                <div className="ag-theme-alpine" style={{ height: '400px', width: '1050px' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={filteredDays}
                    gridOptions={gridOptions}
                />
                </div>
            </ToonContainer>
        </>
    )
}

export default AllWebtoonListView;


const ToonContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;

padding: 50px;
padding-left: 70px;
`;

const SelectTagContainer = styled.div`
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
padding-top: 120px;
padding-left: 4%;
font-weight: bold;
`;

const Container = styled.div`
padding-left: 600px;
`;