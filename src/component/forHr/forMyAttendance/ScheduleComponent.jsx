import { useState, useRef, useMemo, useEffect } from 'react';
import { Collapse } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';

const ScheduleComponent = () => {
    const gridRef = useRef(); 
    const [columnDefs, setColumnDefs] = useState([
      { field: '일자' },
      { field: '업무시작' },
      { field: '업무종료' },
      { field: '총 근무시간' },
      { field: '근무시간 상세' },
    ]);
    const [rowData, setRowData] = useState({});
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('employeeId');
        setUserId(storedUserId); 

        if (storedUserId) {
            axios
            .get(`http://146.56.98.153:8080/attendance/${storedUserId}`, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    const attendanceList = response.data.attendanceList;
                    let rowData = {};
                    attendanceList.forEach((item) => {
                        const date = new Date(item.startTime);
                        const weekOfMonth = getWeekOfMonth(date); 

                        if (!rowData[weekOfMonth]) {
                            rowData[weekOfMonth] = [];
                        }

                        let dateString = date.toLocaleDateString().substring(0, 12); // Update '일자' field
                        if (dateString.endsWith('.')) {
                            dateString = dateString.slice(0, -1); // Remove the last character if it is '.'
                        }

                        rowData[weekOfMonth].push({
                          '일자': dateString, // Update '일자' field
                          '업무시작': item.startTime.substring(11), // Update '업무시작' field
                          '업무종료': item.endTime.substring(11), // Update '업무종료' field
                          '총 근무시간': item.totalTime,
                          '근무시간 상세': '',
                        });
                    });
                    setRowData(rowData);
                }
            })
            .catch((error) => {
                console.error('Error fetching attendance data:', error);
            });
        }
    }, []);

    function getWeekOfMonth(date) {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const offsetDate = date.getDate() + firstDayOfWeek - 1;
        return Math.floor(offsetDate / 7);
    }

    const defaultColDef = useMemo( ()=> ({
        sortable: true
    }));

    const Cell = ({ data }) => {
      const height = data.length * 25 + 50; // Calculate height based on the number of rows
      return (
          <div className="ag-theme-alpine" style={{width: 1050, height: height}}>
              <AgGridReact
                  ref={gridRef}
  
                  rowData={data}
  
                  columnDefs={columnDefs} 
                  defaultColDef={defaultColDef}
  
                  animateRows={true} 
  
                  getRowHeight={() => 25} // Set row height
              />
          </div>
      )
  }
  
    
    const items = Object.keys(rowData).map((week) => ({
        key: week,
        label: `${Number(week)+1}주차`,
        children: 
        <>
            <Cell data={rowData[week]}/>
        </>
    }));

    const onChange = (key) => {
        console.log(key);
    };
    
    return (
        <>
            <Collapse items={items}  onChange={onChange} />
        </>
    )
}

export default ScheduleComponent;
