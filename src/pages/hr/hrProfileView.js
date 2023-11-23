import { useParams } from "react-router-dom";
import styled from 'styled-components';
import HrProfileDetail from "../../component/forHr/forHrProfileView/hrProfileDetail";

export default function HrProfileView () {
    const { Id } = useParams();

    return(
        <HrProfileDetailContainer>
            <HrProfileDetail Id={Id} />
        </HrProfileDetailContainer>
    )
}

const HrProfileDetailContainer = styled.div`
    margin-top: 50px;
    margin-left: 30px;
`