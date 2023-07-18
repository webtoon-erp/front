import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import HorizonLine from '../../horizonLine';
import styled from 'styled-components';

export default function WholeVacation() {

    const rowData = [
      {'부서': '부서1', '발행연차': 40, '소진연차': 10, '잔여연차': 20},
      {'부서': '부서2', '발행연차': 40, '소진연차': 10, '잔여연차': 20},
      {'부서': '부서3', '발행연차': 40, '소진연차': 10, '잔여연차': 20},
      {'부서': '부서4', '발행연차': 40, '소진연차': 10, '잔여연차': 20},
    ];

    const columnDefs = [
      { headerName: '부서', field: '부서' },
      { headerName: '발행연차', field: '발행연차' },
      { headerName: '소진연차', field: '소진연차' },
      { headerName: '잔여연차', field: '잔여연차' },
    ];

    // useEffect(() => {
    //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //     .then(result => result.json())
    //     .then(rowData => setRowData(rowData))
    // }, []);

  return (
    <>
       <WholeVacationContainer>
          <Title>그룹별 연차 현황</Title>
          <HorizonLine />
          <WholeVacationGrid className="ag-theme-alpine" style={{ height: '250px', width: '1050px' }}>
              <AgGridReact 
                  rowData={rowData}
                  columnDefs={columnDefs}
                  animateRows={true}
                  rowSelection='multiple'
              />
          </WholeVacationGrid>
      </WholeVacationContainer>
    </>
  );
}


const WholeVacationContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 350px;
    width: 100%
    align-items: center;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const WholeVacationGrid = styled.div`
    width: 900px;
    height: 150px;
`