import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Collapse } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios'; // Import axios for making the API request

const ScheduleComponent = () => {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [columnDefs, setColumnDefs] = useState([
      { field: '일자' },
      { field: '업무시작' },
      { field: '업무종료' },
      { field: '총 근무시간' },
      { field: '근무시간 상세' },
    ]);
    const [rowData, setRowData] = useState([]);
    const [userId, setUserId] = useState(''); // Initialize userId state
  
    useEffect(() => {
      // Get the userId from sessionStorage
      const storedUserId = sessionStorage.getItem('employeeId');
      setUserId(storedUserId); // Set userId state
  
      // Fetch attendance data for the specific employee
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
              // Map the attendance data to rowData
              const generatedData = attendanceList.map((item) => ({
                '일자': item.week, // Map to '일자' field
                '업무시작': item.startTime,
                '업무종료': item.endTime,
                '총 근무시간': item.totalTime,
                '근무시간 상세': '', // You can populate this as needed
              }));
              setRowData(generatedData);
            }
          })
          .catch((error) => {
            console.error('Error fetching attendance data:', error);
          });
      }
    }, []);


const defaultColDef = useMemo( ()=> ({
    sortable: true
    }));



    // Example load data from server(후 작업)
    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
    }, []);

    const Cell = () => {
        return (
        <>
            <div className="ag-theme-alpine" style={{width: 1050, height: 100}}>

                <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API

                    rowData={rowData} // Row Data for Rows

                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties

                    animateRows={true} 

                    />
            </div>
        </>
        )
    }
    
    const items = [
        {
        key: '1',
        label: '1주차',
        children:
            <>
                <Cell/>
            </>
        ,
        },
        {
        key: '2',
        label: '2주차',
        children: 
            <>
                <Cell/>
            </>
        ,
        },
        {
        key: '3',
        label: '3주차',
        children:
        <>
            <Cell/>
        </>
        ,
        },
        {
            key: '4',
            label: '4주차',
            children:
            <>
                <Cell/>
            </>
        ,
        },
        {
            key: '5',
            label: '5주차',
            children:
            <>
                <Cell/>
            </>
        ,
        },
    ];

    const onChange = (key) => {
        console.log(key);};
    
      //defaultActiveKey={['1']}
    return (
        <>
            <Collapse items={items}  onChange={onChange} />
        </>
    )
}

export default ScheduleComponent;