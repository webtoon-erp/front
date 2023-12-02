import MyDocsView from "../../component/forElectropayment/myDocsView";
import { styled } from "styled-components";
import { useParams } from 'react-router-dom';

export default function EpMyDocsView (){
    const { Id } = useParams();
    return(
        <MyDocsViewContainer>
            <MyDocsView Id={Id}/>
        </MyDocsViewContainer>
    )
}

const MyDocsViewContainer = styled.div`
    margin-left: 40px;
    margin-top: 50px;
    width: 100%;
`;