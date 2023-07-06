import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function WholeVaction() {
  const departments = ['부서1', '부서2', '부서3', '부서4'];
  const issuedVacations = [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()];
  const usedVacations = [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()];
  const remainingVacations = [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()];

  const columnDefs = [
    { headerName: '부서', field: 'department' },
    { headerName: '발행연차', field: 'issuedVacations' },
    { headerName: '소진연차', field: 'usedVacations' },
    { headerName: '잔여연차', field: 'remainingVacations' },
  ];

  const rowData = departments.map((department, index) => ({
    department,
    issuedVacations: issuedVacations[index],
    usedVacations: usedVacations[index],
    remainingVacations: remainingVacations[index],
  }));

  return (
    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
      <h2>그룹별 연차현황</h2>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
}

function getRandomNumber() {
  return Math.floor(Math.random() * 101);
}

