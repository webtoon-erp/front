import { styled } from "styled-components";
import WebtoonSearch from "../../component/forWebtoon/webtoonSearch.tsx";
import BeforeUploadToon from "../../component/forWebtoon/beforeUploadToon.jsx";
import AfterUploadToon from "../../component/forWebtoon/afterUploadToon.jsx";

const WebtoonSearchContainer = styled.div`
    margin-top: 40px;
    margin-left: 40px;
    width: 100%;
`;

const WebtoonContainer = styled.div`
    display: flex;
`;

const BeforeUploadToonContainer = styled.div`
    margin-top: 30px;
    margin-left: 10px;
    width: 50%;
`;

const AfterUploadToonContainer = styled.div`
    margin-top: 30px;
    margin-left: 10px;
    width: 50%;
`;

export default function Webtoon (){
    return(
        <>
            <WebtoonSearchContainer>
                <WebtoonSearch />
            </WebtoonSearchContainer>
            <WebtoonContainer>
                <BeforeUploadToonContainer>
                    <BeforeUploadToon />
                </BeforeUploadToonContainer>
                <AfterUploadToonContainer>
                    <AfterUploadToon />
                </AfterUploadToonContainer>
            </WebtoonContainer>
        </>
    )
}