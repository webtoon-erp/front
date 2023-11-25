import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { message } from 'antd';
import theme from '../../../style/theme';

const ReferList = () => {
    const [rowData, setRowData] = useState([]);
    const Id = 'id';

    const columnDefs = [
      { headerName: '참조자', field: 'userPosition', width: 190 },
      { headerName: '직급', field: 'userName', width: 200 },
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
         <div className="ag-theme-alpine" style={{ height: '250px', width: '400px' }}>
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

export default ReferList;

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
