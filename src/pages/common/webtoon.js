import { styled } from "styled-components";
import WebtoonSearch from "../../component/forWebtoon/webtoonSearch";
import BeforeUploadToon from "../../component/forWebtoon/beforeUploadToon";
import AfterUploadToon from "../../component/forWebtoon/afterUploadToon";

const WebtoonSearchContainer = styled.div`
    margin-top: 80px;
    margin-left: 30px;
    width: 60%;
`;

const WebtoonContainer = styled.div`
    display: flex;
`;

const beforeUploadToonContainer = styled.div`
    margin-top: 100px;
    margin-left: 30px;
    width: 50%;
`;

const afterUploadToonContainer = styled.div`
    margin-top: 100px;
    margin-left: 30px;
    width: 50%;
`;

export default function Webtoon (){
    return(
        <>
            <div>Webtoon</div>
            <WebtoonSearchContainer>
                <WebtoonSearch />
            </WebtoonSearchContainer>
            <WebtoonContainer>
                <beforeUploadToonContainer>
                    <BeforeUploadToon />
                </beforeUploadToonContainer>
                <afterUploadToonContainer>
                    <AfterUploadToon />
                </afterUploadToonContainer>
            </WebtoonContainer>
            
        </>
    )
}