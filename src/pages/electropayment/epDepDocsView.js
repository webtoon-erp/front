import { styled } from "styled-components";
import DepDocsView from "../../component/forElectropayment/depDocsView";
import { useParams } from 'react-router-dom';

export default function EpDepDocsView (){
    const { Id } = useParams();
    return(
        <DepDocsViewContainer>
            <DepDocsView Id={Id}/>
        </DepDocsViewContainer>
    )
}

const DepDocsViewContainer = styled.div`
    margin-left: 40px;
    margin-top: 50px;
    width: 100%;
`;