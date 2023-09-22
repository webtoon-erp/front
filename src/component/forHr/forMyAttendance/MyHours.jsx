import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios'; // Import axios for making the API request

const MyHours = () => {
  const [columnDefs] = useState([
    { field: 'weeklyTotalTime', headerName: '이번주 누적', width: 150 },
    { field: 'weeklyOverTime', headerName: '이번주 초과', width: 150 },
    { field: 'monthlyTotalTime', headerName: '이번달 누적', width: 150 },
    { field: 'monthlyOverTime', headerName: '이번달 초과', width: 150 },
  ]);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    // Get the employeeId from sessionStorage
    const userId = sessionStorage.getItem('employeeId');

    // Fetch the attendance data for the specific employee
    if (userId) {
      axios
        .get(`http://146.56.98.153:8080/attendance/${userId}`, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;

            // Transform the data into an array of objects
            const transformedData = [
              {
                weeklyTotalTime: data.weeklyTotalTime,
                weeklyOverTime: data.weeklyOverTime,
                monthlyTotalTime: data.monthlyTotalTime,
                monthlyOverTime: data.monthlyOverTime,
              },
            ];

            // Set the fetched data in the rowData state
            setRowData(transformedData);
          }
        })
        .catch((error) => {
          console.error('Error fetching attendance data:', error);
        });
    }
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: 650, height: 90 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
      />
    </div>
  );
};

export default MyHours;
