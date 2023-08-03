import { styled } from "styled-components";
import DepDocsView from "../../component/forElectropayment/depDocsView";

export default function EpDepDocsView (){
    return(
        <DepDocsViewContainer>
            <DepDocsView />
        </DepDocsViewContainer>
    )
}

const DepDocsViewContainer = styled.div`
    margin-left: 40px;
    margin-top: 120px;
    width: 100%;
`;