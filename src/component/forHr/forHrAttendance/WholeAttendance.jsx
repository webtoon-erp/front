import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './WholeAttendance.css';

export default function WholeAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    generateAttendanceData();
  }, []);

  const generateAttendanceData = () => {
    const items = ['전체직원', '출근', '사내', '사외', '재택'];
    const generatedData = items.map((item) => ({
      item,
      count: getRandomNumber(),
    }));
    setAttendanceData(generatedData);
  };

  const getRandomNumber = () => Math.floor(Math.random() * 101);

  const columnDefs = [
    { headerName: '전체현황', field: 'item', cellRenderer: 'agGroupCellRenderer' },
    { headerName: '수', field: 'count' },
  ];

  const rowData = attendanceData.map(({ item, count }) => ({ item, count: `${count}명` }));

  return (
    <div className="ag-theme-alpine" style={{ height: '200px', width: '600px' }}>
      <h2>전체현황</h2>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        suppressColumnVirtualisation
        rowClass="custom-row"
      />
    </div>
  );
}

