import { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';

const ScheduleComponent = () => {
  const [columnDefs] = useState([
    { headerName: '일자', field: '일자' },
    { headerName: '업무시작', field: '업무시작' },
    { headerName: '업무종료', field: '업무종료' },
    { headerName: '총 근무시간', field: '총 근무시간' },
    { headerName: '근무시간 상세', field: '근무시간 상세' },
  ]);

  const [rowData, setRowData] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('employeeId');
    setUserId(storedUserId);

    if (storedUserId) {
      axios
        .get(`http://146.56.98.153:8080/attendance/${storedUserId}`)
        .then((response) => {
          if (response.status === 200) {
            const attendanceData = response.data;
            const attendanceList = attendanceData.attendanceList;
            console.log("attendanceList",attendanceList)

            // Group data by week
            const dataByWeek = {};
            attendanceList.forEach((item) => {
              const week = item.week;
              if (!dataByWeek[week]) {
                dataByWeek[week] = [];
              }
              dataByWeek[week].push(item);
            });

            // Convert the grouped data to an array
            const rows = Object.keys(dataByWeek).map((week) => {
              const weekData = dataByWeek[week];
              return {
                일자: weekData[0].attendDate,
                업무시작: weekData[0].startTime,
                업무종료: weekData[0].endTime,
                '총 근무시간': weekData.reduce(
                  (total, entry) => total + entry.totalTime,
                  0
                ),
                '근무시간 상세': '',
              };
            });

            setRowData(rows);
          }
        })
        .catch((error) => {
          console.error('Error fetching attendance data:', error);
        });
    }
  }, []);

  const defaultColDef = {
    sortable: true,
  };

  const Cell = () => {
    return (
      <div className="ag-theme-alpine"  style={{ width: 1050, height: 100 }}>
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
        />
      </div>
    );
  };

  const items = [
    {
      key: '1',
      label: '1주차',
      children: <Cell />,
    },
    {
      key: '2',
      label: '2주차',
      children: <Cell />,
    },
    {
      key: '3',
      label: '3주차',
      children: <Cell />,
    },
    {
      key: '4',
      label: '4주차',
      children: <Cell />,
    },
    {
      key: '5',
      label: '5주차',
      children: <Cell />,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return <Collapse items={items} onChange={onChange} />;
};

export default ScheduleComponent;
