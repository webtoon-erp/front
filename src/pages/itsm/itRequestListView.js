import { styled } from "styled-components";
import ViewList from "../../component/forITSM/forServiceView/viewList";

export default function ItRequestListView (){
    return(
        <>
            <Title>서비스 조회</Title>
                <ViewListContainer>
                    <ViewList />
                </ViewListContainer>
                
            
        </>
    )
}

const Title = styled.div`
    font-size: 30px;
    padding-top: 50px;
    padding-left: 2%;
    font-weight: bold;
`;

const ViewListContainer = styled.div`
    padding-left: 2%;
    margin-top: 30px; 
    width: 55%
`