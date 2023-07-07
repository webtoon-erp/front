import styled from 'styled-components';
import DepartmentVacation from '../../component/forHr/forHrAttendance/DepartmentVacation';
import TodayAttendance from '../../component/forHr/forHrAttendance/TodayAttendance';
import VacationRemain from '../../component/forHr/forHrAttendance/VacationRemain';
import WholeAttendance from '../../component/forHr/forHrAttendance/WholeAttendance';
import WholeVacation from '../../component/forHr/forHrAttendance/WholeVacation';
import WorkExtension from '../../component/forHr/forHrAttendance/WorkExtension';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
  padding-left: 5%;
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

const Title = styled.div`
  font-size: 30px;
  padding-top: 120px;
  padding-left: 4%;
  font-weight: bold;
`;

export default function HrAttendance() {
  return (
    <>
        <Title>근태 관리</Title>
    
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
                    <WholeVacation />
                    <DepartmentVacation />
                    </Container>
                </FlexContainer>
            </RightColumn>
        </Container>
    </>
  );
}

