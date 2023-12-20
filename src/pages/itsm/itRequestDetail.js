import ServiceDetailComponent from "../../component/forITSM/forServiceDetail/serviceDetailComponent";
import { useParams } from 'react-router-dom';

export default function ItRequestDetail (){
  const { Id } = useParams();
  return(
      <>
        <ServiceDetailComponent Id={Id}/>
      </>
  )
}