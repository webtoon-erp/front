import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { message } from 'antd';
import theme from '../../../style/theme';

const ItemList = () => {
    const [rowData, setRowData] = useState([]);
    const Id = 'id';

    const columnDefs = [
      { headerName: '개수', field: 'count', width: 200 },
      { headerName: '단가', field: 'price', width: 200 },
      { headerName: '공급가액', field: 'supAmt', width: 200 },
      { headerName: '부가세액', field: 'vatAmt', width: 200 },
      { headerName: '총액', field: 'totalAmt', width: 200 },
    ];

    
    useEffect(() => {
      axios.get('http://146.56.98.153:8080/plas/documents/'+Id, {
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
         <div className="ag-theme-alpine" style={{ height: '250px', width: '990px' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        rowSelection='single'
                        pagination={true}
                        paginationPageSize={5}
                    />
              </div>
        </>
    )
}

export default ItemList;

const ToonContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 50px;
padding-left: 70px;
`;

const Title = styled.div`
font-size: 22px;
padding-top: 40px;
padding-left: 4%;
font-weight: bold;
`;

const Container = styled.div`
padding-left: 600px;
`;
