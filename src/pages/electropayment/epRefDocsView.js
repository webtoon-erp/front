import RefDocsView from "../../component/forElectropayment/refDocsView";
import { styled } from "styled-components";
import { useParams } from 'react-router-dom';

export default function EpRefDocsView (){
    const { Id } = useParams();
    return(
        <RefDocsViewContainer>
            <RefDocsView Id={Id}/>
        </RefDocsViewContainer>
    )
}

const RefDocsViewContainer = styled.div`
    margin-left: 40px;
    margin-top: 50px;
    width: 100%;
`;