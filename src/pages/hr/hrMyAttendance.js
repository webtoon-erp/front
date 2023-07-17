import styled from "styled-components";
import { Grid, GridItem } from 'react-grid-layout';
import TabComponent from "../../component/forHr/forMyAttendance/TabComponent";
import ScheduleComponent from "../../component/forHr/forMyAttendance/ScheduleComponent";
import MyVacation from "../../component/forHr/forMyAttendance/MyVacation";

const Container = styled.div`
    display: flex;
    padding-left: 45%;
    background: transparent;
`;
const Container2 = styled.div`
    display: flex;
    width: 1000px;
    align-items: center;
    padding: 20px;
    padding-left: 170px;
    padding-top: 30px;
`;

const FlexContainer = styled.div`
    width: 90%;
    padding-bottom: 50px;
    padding-left: 5%;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 120px;
  padding-left: 4%;
  font-weight: bold;
`;


export default function HrMyAttendance() {
    return (
        <>
        <Title>개인 근태 현황</Title>
            <Container2>
                <MyVacation />
            </Container2>
            <Container >
                <TabComponent />
            </Container>
            <FlexContainer>
                <ScheduleComponent />
            </FlexContainer>
        </>
    );
}


