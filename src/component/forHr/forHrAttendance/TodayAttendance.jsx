import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';

export default function WholeAttendance() {

    

  const columnDefs = [
      {field: '미출근'},
      {field: '지각'},
      {field: '휴가'},
      {field: '연장근무'},
  ];

  const rowData = [
    {'미출근': 3, '지각': 4, '휴가': 1, '연장근무': 2},
];

  // useEffect(() => {
  //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, []);

  return (
      <TodayAttendanceContainer>
          <Title>근태 현황</Title>
          <HorizonLine />
          <TodayAttendanceGrid className="ag-theme-alpine" style={{ height: '100px', width: '1050px' }}>
              <AgGridReact 
                  rowData={rowData}
                  columnDefs={columnDefs}
                  animateRows={true}
                  rowSelection='multiple'
              />
          </TodayAttendanceGrid>
      </TodayAttendanceContainer>
      
  );
}

const TodayAttendanceContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 190px;
    width: 100%
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const TodayAttendanceGrid = styled.div`
    width: 900px;
    height: 110px;
`