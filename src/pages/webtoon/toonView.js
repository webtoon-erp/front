import EpisodeList from "../../component/forWebtoon/forToonView/episodeList.jsx";
import TextAndBtnArea from "../../component/forWebtoon/forToonView/textAndBtnArea.jsx";
import ToonContent from "../../component/forWebtoon/forToonView/toonContent.jsx";
import styled from 'styled-components';

export default function ToonView (){
    return(
        <>
            <TextAndBtnAreaContainer>
                <TextAndBtnArea />
            </TextAndBtnAreaContainer>
            <ToonContentContainer>
                <ToonContent />
            </ToonContentContainer>
            <EpisodeListContainer>
                <EpisodeList />
            </EpisodeListContainer>
        </>
    )
}

const TextAndBtnAreaContainer = styled.div`
    margin-top: 120px;
    margin-left: 30px;
    width: 100%;
`;

const ToonContentContainer = styled.div`
    margin-left: 30px;
`;

const EpisodeListContainer = styled.div`
    margin-left: 30px;
`;