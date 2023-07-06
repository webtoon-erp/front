import styled from "styled-components";
import { Grid, GridItem } from 'react-grid-layout';
import TabComponent from "../../component/forHr/forMyAttendance/TabComponent";
import ScheduleComponent from "../../component/forHr/forMyAttendance/ScheduleComponent";

const Container = styled.div`
    display: flex;
    padding-left: 45%;
`;

const FlexContainer = styled.div`
    width: 90%;
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
            <Container >
                <TabComponent />
            </Container>
            <FlexContainer>
                <ScheduleComponent />
            </FlexContainer>
        </>
    );
}


