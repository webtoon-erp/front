import { useParams } from "react-router-dom";
import NoticeDetailComponent from "../../component/forNotice/forNoticeDetail/noticeDetailComponent";

export default function NoticeDetail (){
  const { Id } = useParams();

    return(
        <>
          <NoticeDetailComponent Id={Id} />
        </>
    )
}