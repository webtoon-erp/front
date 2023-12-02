import ElectropaymentComponent from "../../component/forElectropayment/forElectropaymentDetail/electropaymentComponent";
import { useParams } from 'react-router-dom';

export default function EpRequestDetail (){
    const { Id } = useParams();
    return(
        <>
            <ElectropaymentComponent Id={Id}/>
        </>
    )
}