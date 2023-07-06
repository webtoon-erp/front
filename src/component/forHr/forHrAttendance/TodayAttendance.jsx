import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function TodayAttendance() {
    const [rowData, setRowData] = useState([]);
  
    useEffect(() => {
      generateRowData();
    }, []);
  
    const generateRowData = () => {
      const items = ['미출근', '지각', '휴가', '휴무', '연장근무'];
      const generatedData = items.map((item) => ({
        [item]: getRandomNumber(),
      }));
      setRowData(generatedData);
    };
  
    const getRandomNumber = () => Math.floor(Math.random() * 101);
  
    const columnDefs = [
      {
        headerName: '근태현황',
        children: [
          { headerName: '미출근', field: '미출근' },
          { headerName: '지각', field: '지각' },
          { headerName: '휴가', field: '휴가' },
          { headerName: '휴무', field: '휴무' },
          { headerName: '연장근무', field: '연장근무' },
        ],
      },
    ];
  
    return (
      <div className="ag-theme-alpine" style={{ height: '200px', width: '600px' }}>
        <h2>근태현황</h2>
        <AgGridReact columnDefs={columnDefs} rowData={[rowData]} />
      </div>
    );
  }