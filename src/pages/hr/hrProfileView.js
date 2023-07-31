import styled from 'styled-components';
import HrProfileDetail from "../../component/forHr/forHrProfileView/hrProfileDetail";

export default function HrProfileView (){
    return(
        <HrProfileDetailContainer>
            <HrProfileDetail />
        </HrProfileDetailContainer>
    )
}

const HrProfileDetailContainer = styled.div`
    margin-top: 120px;
    margin-left: 30px;
`