import { styled } from "styled-components";
import EmployeeView from "../../component/forHr/forHrView/employeeView";

const EmpProfileContainer = styled.div`
    margin-top: 100px;
    margin-left: 10px;
    width: 100%;
`;

export default function HrView (){
    return(
        <EmpProfileContainer>
            <EmployeeView />
        </EmpProfileContainer>
    )
}