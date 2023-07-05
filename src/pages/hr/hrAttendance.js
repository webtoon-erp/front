import styled from 'styled-components';
import DepartmentVacation from '../../component/forHr/forHrAttendance/DepartmentVacation';
import TodayAttendance from '../../component/forHr/forHrAttendance/TodayAttendance';
import VacationRemain from '../../component/forHr/forHrAttendance/VacationRemain';
import WholeAttendance from '../../component/forHr/forHrAttendance/WholeAttendance';
import WholeVaction from '../../component/forHr/forHrAttendance/WholeVaction';
import WorkExtension from '../../component/forHr/forHrAttendance/WorkExtension';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 70px;
  padding-left: 60px;
`;

const TodayContainer = styled.div`
  padding-left: 120px;
`;

const FlexContainer = styled.div`
  padding-top: 60px;
`;

const LeftColumn = styled.div`
  width: 20%;
  height: 100%;
`;

const RightColumn = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export default function HrAttendance() {
  return (
    <Container>
        <LeftColumn>
            <WholeAttendance />
        </LeftColumn>

        <RightColumn> 

            <TodayContainer>
                <TodayAttendance />
            </TodayContainer>
        
            <FlexContainer>
                <Container>
                <VacationRemain />
                <WorkExtension />
                </Container>

                <Container>
                <WholeVaction />
                <DepartmentVacation />
                </Container>
            </FlexContainer>
        </RightColumn>
    </Container>
  );
}


