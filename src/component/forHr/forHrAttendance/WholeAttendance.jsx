import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';

export default function WholeAttendance() {

    const rowData = [
      {'전체 직원': 69, '출근': 66, '퇴근': 50, '미출근': 0, '지각': 6, '휴가': 6, '연장근무': 6},
  ];

  const columnDefs = [
      {field: '전체 직원'},
      {field: '출근'},
      {field: '퇴근'},
      {field: '미출근'},
      {field: '지각'},
      {field: '휴가'},
      {field: '연장근무'},
  ];

  // useEffect(() => {
  //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, []);

  return (
      <WholeAttendanceContainer>
          <Title>전체 현황</Title>
          <HorizonLine />
          <WholeAttendanceGrid className="ag-theme-alpine" style={{ height: '100px', width: '1050px' }}>
              <AgGridReact 
                  rowData={rowData}
                  columnDefs={columnDefs}
                  animateRows={true}
                  rowSelection='multiple'
              />
          </WholeAttendanceGrid>
      </WholeAttendanceContainer>
      
  );
}

const WholeAttendanceContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 210px;
    width: 100%
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const WholeAttendanceGrid = styled.div`
    width: 900px;
    height: 140px;
`
