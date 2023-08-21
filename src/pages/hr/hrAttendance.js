import styled from 'styled-components';
import DepartmentVacation from '../../component/forHr/forHrAttendance/DepartmentExtension';
import TodayAttendance from '../../component/forHr/forHrAttendance/TodayAttendance';
import VacationRemain from '../../component/forHr/forHrAttendance/VacationRemain';
import WholeAttendance from '../../component/forHr/forHrAttendance/WholeAttendance';
import WorkExtension from '../../component/forHr/forHrAttendance/WorkExtension';
import WholeVacation from '../../component/forHr/forHrAttendance/WholeVacation';
import DepartmentExtension from '../../component/forHr/forHrAttendance/DepartmentExtension';
import DepartmentAvgExtension from '../../component/forHr/forHrAttendance/DepartmentAvgExtension';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
  padding-left: 4%;
`;

const TodayContainer = styled.div`
  padding-left: 120px;
`;


const Title = styled.div`
  font-size: 30px;
  padding-top: 120px;
  padding-left: 3%;
  font-weight: bold;
`;

export default function HrAttendance() {
  return (
    <>
        <Title>근태 관리</Title>
    
        <Container>
                <WholeAttendance />
        </Container>
        <Container> 
            <WorkExtension />
            <DepartmentExtension />
            <DepartmentAvgExtension /> 
        </Container>
    </>
  );
};
