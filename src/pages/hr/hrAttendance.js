import styled from 'styled-components';
import WholeAttendance from '../../component/forHr/forHrAttendance/WholeAttendance.jsx';
import WorkExtension from '../../component/forHr/forHrAttendance/WorkExtension.jsx';
import DepartmentExtension from '../../component/forHr/forHrAttendance/DepartmentExtension.jsx';
import DepartmentAvgExtension from '../../component/forHr/forHrAttendance/DepartmentAvgExtension.jsx';

export default function HrAttendance() {
  return (
    <>
        <Title>근태 관리</Title>
    
        <Container>
                <WholeAttendance />
        </Container>
        <Container2> 
            <WorkExtension />
            <DepartmentExtension />
            <DepartmentAvgExtension /> 
        </Container2>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
  padding-left: 4%;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 50px;
  padding-left: 3%;
  font-weight: bold;
`;