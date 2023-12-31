import ToonDetailComponent from "../../component/forWebtoon/forToonDetail/toonDetailComponent";
import styled from 'styled-components'
import ToonGrid from "../../component/forWebtoon/forToonDetail/toonGrid";
import theme from '../../style/theme';
import { useParams } from 'react-router-dom';

export default function ToonDetail (){
    const { Id } = useParams();

    return(
        <>
         <Title>웹툰 상세보기</Title>
         <Container>
            <ToonDetailContainer>
                <ToonDetailComponent Id={Id}/>
            </ToonDetailContainer>
            <ToonGridContainer>
                <ToonGrid Id={Id}/>
            </ToonGridContainer>
         </Container>
        </>
    )
}

const ToonDetailContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding-left: 70px;
`;

const ToonGridContainer = styled.div`
padding: 20px;
padding-left: 70px;
width: 500px;
`;

const Title = styled.div`
font-size: 30px;
padding-top: 30px;
padding-left: 4%;
font-weight: bold;
`;

const Container = styled.div`
`;