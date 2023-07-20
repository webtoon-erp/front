import { styled } from "styled-components";
import ServiceState from "../../component/forITSM/forServiceView/serviceState";
import ViewList from "../../component/forITSM/forServiceView/viewList";

export default function ItRequestListView (){
    return(
        <>
            <Title>서비스 조회</Title>
            <ServiceStateContainer>
                <ServiceState />
            </ServiceStateContainer>
            <ViewListContainer>
                <ViewList />
            </ViewListContainer>
        </>
    )
}

const Title = styled.div`
    font-size: 30px;
    padding-top: 120px;
    padding-left: 4%;
    font-weight: bold;
`;

const ServiceStateContainer = styled.div`
    padding-left: 4%;
    margin-top: 30px; 
`

const ViewListContainer = styled.div`
    padding-left: 4%;
    margin-top: 30px; 
    width: 85%
`