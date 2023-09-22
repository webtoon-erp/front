import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const EmployeeAttendanceView = () => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [leftPanelData, setLeftPanelData] = useState([]);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    axios.get('http://146.56.98.153:8080/attendance/total')
  .then((response) => {
    if (response.status === 200) {
      const { totalAttendanceSummaryDto, rightPanelData } = response.data;

      // Map data for the left panel
      const leftPanelMappedData = {
        totalUserCnt: totalAttendanceSummaryDto.totalUserCnt,
        onTimeStartUserCnt: totalAttendanceSummaryDto.onTimeStartUserCnt,
        onTimeEndUserCnt: totalAttendanceSummaryDto.onTimeEndUserCnt,
        notStartUserCnt: totalAttendanceSummaryDto.notStartUserCnt,
        lateStartUserCnt: totalAttendanceSummaryDto.lateStartUserCnt,
        dayOffUserCnt: totalAttendanceSummaryDto.dayOffUserCnt,
        notEndUserCnt: totalAttendanceSummaryDto.notEndUserCnt,
      };

      // Map data for the right panel, only if rightPanelData is defined
      const rightPanelMappedData = Array.isArray(rightPanelData)
        ? rightPanelData.map((item) => ({
            deptName: item.deptName,
            teamNum: item.teamNum,
            position: item.position,
            employeeId: item.employeeId,
            name: item.name,
            tel: item.tel,
            email: item.email,
          }))
        : [];

      // Set the mapped data to state
      setLeftPanelData([leftPanelMappedData]);
      setRowData(rightPanelMappedData);
    }
  })
  .catch((error) => {
    console.error('WholeAttendance Error fetching data:', error);
  });


  }, []);

  const leftPanelColumnDefs = [
    { headerName: '전체 직원', field: 'totalUserCnt', width: 140 },
    { headerName: '출근', field: 'onTimeStartUserCnt', width: 140 },
    { headerName: '퇴근', field: 'onTimeEndUserCnt', width: 140 },
    { headerName: '미출근', field: 'notStartUserCnt', width: 140 },
    { headerName: '지각', field: 'lateStartUserCnt', width: 140 },
    { headerName: '휴가', field: 'dayOffUserCnt', width: 140 },
    { headerName: '연장근무', field: 'notEndUserCnt', width: 140 },
  ];

  const rightPanelColumnDefs = [
    { headerName: '부서명', field: 'deptName', width: 100 },
    { headerName: '팀번호', field: 'teamNum', width: 100 },
    { headerName: '직급', field: 'position', width: 100 },
    { headerName: '사번', field: 'employeeId', width: 150 },
    { headerName: '이름', field: 'name', width: 100 },
    { headerName: '전화번호', field: 'tel', width: 200 },
    { headerName: '이메일', field: 'email', width: 200 },
  ];

  return (
    <Container>
      <LeftPanel>
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            columnDefs={leftPanelColumnDefs}
            rowData={leftPanelData}
          />
        </div>
      </LeftPanel>
      <RightPanel>
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            columnDefs={rightPanelColumnDefs}
            rowData={rowData}
          />
        </div>
      </RightPanel>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
`;

const Panel = styled.div`
  padding: 20px;
`;

const LeftPanel = styled(Panel)`
  background-color: #f0f0f0;
  height: 110px;  
  width: 1000px;
`;

const RightPanel = styled(Panel)`
  background-color: #ffffff;
  height: 500px;
  width: 1000px;
`;

export default EmployeeAttendanceView;

