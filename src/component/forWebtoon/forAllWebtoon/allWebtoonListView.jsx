import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { message } from 'antd';
import theme from '../../../style/theme';

const AllWebtoonListView = () => {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [filterText, setFilterText] = useState('');
    const [selectedCell, setSelectedCell] = useState(null);
    const [rowData, setRowData] = useState([]);
    
    // 태그 선택 핸들러
    const selectCategoryHandler = (e) => {
      setSelectedCategory(e.target.value);
    };

    const columnDefs = [
      { headerName: '요일', field: 'category', width: 100 },
      { headerName: '제목', field: 'title', width: 400 },
      { headerName: '작가', field: 'artist', width: 120 },
      { headerName: '그림', field: 'illustrator', width: 120 },
      { headerName: '키워드', field: 'keyword', width: 280 },
    ];
    
    const gridRef = useRef(null);
    
    const onGridReady = (params) => {
      params.api.setQuickFilter(document.getElementById('filter-text-box').value);
    };
  
    useEffect(() => {
      if (gridRef.current) {
        gridRef.current.api.setQuickFilter(document.getElementById('filter-text-box').value);
      }
    }, []);
    
    const onFilterTextBoxChanged = useCallback(() => {
      if (gridRef.current) {
        gridRef.current.api.setQuickFilter(document.getElementById('filter-text-box').value);
      }
    }, []);
      
    const navigate = useNavigate();

    const handleClick = () => {
      navigate("/toonAdd");
    }

    // This function handles the row click event.
    const handleRowClick = (event) => {
      if (event.data.id) {
        // Replace 'toonDetail' with the actual path to your detail page.
        navigate(`/toonDetail/${event.data.id}`);
      }
    };
    
    useEffect(() => {
      axios.get('http://146.56.98.153:8080/webtoon', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setRowData(response.data);
          console.log("response.data", response.data);
        } else {
          message.error('데이터를 불러오는데 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('데이터를 불러오는데 실패했습니다.', error);
        message.error('데이터를 불러오는데 실패했습니다.');
      });
    }, []); 
    

    return (
        <>
          <Title>전체 웹툰</Title>
            <ToonContainer>
                <SelectTagContainer>
                <select value={selectedCategory} onChange={selectCategoryHandler}>
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
                  <input
                        type="text"
                        id="filter-text-box"
                        placeholder="Filter..."
                        onInput={onFilterTextBoxChanged}
                      />
                  <RegistBtnContainer>
                        <RegistBtn onClick={handleClick}>작품 등록</RegistBtn>
                  </RegistBtnContainer>
                </SelectTagContainer>
                
                <div className="ag-theme-alpine" style={{ height: '400px', width: '1050px' }}>
                  <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection='single'
                    pagination={true}
                    paginationPageSize={20}
                    onGridReady={onGridReady} // 이 부분 추가
                    // Assign the handleRowClick function to the onCellClicked event
                    onCellClicked={handleRowClick}
                  />
              </div>
            </ToonContainer>
        </>
    )
}

export default AllWebtoonListView;


const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 5%;
    margin-bottom: 20px;
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
padding-top: 40px;
padding-left: 4%;
font-weight: bold;
`;

const Container = styled.div`
padding-left: 600px;
`;
