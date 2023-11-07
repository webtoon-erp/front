import NoticeRegist from "../../component/forNotice/forNoticeRegist/noticeRegist.jsx";
import { styled } from "styled-components";

export default function NoticeAdd (){
    return(
        <NoticeAddContainer>
            <NoticeRegist />
        </NoticeAddContainer>
    )
}

const NoticeAddContainer = styled.div`
    margin-left: 30px;
`;