import { styled } from "styled-components";
import HoldenDocsView from "../../component/forElectropayment/holdenDocsView";
import { useParams } from 'react-router-dom';

export default function EpHoldenDocsView (){
    const { Id } = useParams();
    return(
        <HoldenDocsViewContainer>
            <HoldenDocsView Id={Id}/>
        </HoldenDocsViewContainer>
    )
}

const HoldenDocsViewContainer = styled.div`
    margin-left: 40px;
    margin-top: 50px;
    width: 100%;
`;