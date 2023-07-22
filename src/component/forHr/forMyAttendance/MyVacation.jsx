import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Collapse } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const MyVacation = () => {

    // useEffect(() => {
  //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, []);

    const [columnDefs, setColumnDefs] = useState([
        {field: '남은 연차'},
        {field: '사용 연차'},
        {field: '총 연차'},
    ]);

    const [rowData, setRowData] = useState([
        {field: '20'},
        {field: '4'},
        {field: '24'},
    ]);

    return (
        <>
                <div className="ag-theme-alpine" style={{width: 900, height: 90}}>

                    <AgGridReact

                        rowData={rowData} // Row Data for Rows

                        columnDefs={columnDefs} // Column Defs for Columns

                        animateRows={true} 

                    />
                </div>
        </>
    )
}

export default MyVacation;