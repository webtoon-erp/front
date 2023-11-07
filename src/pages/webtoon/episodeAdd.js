import EpisodeAddComponent from "../../component/forWebtoon/forToonAdd/EpisodeAddComponent.jsx";
import { useParams } from 'react-router-dom';

export default function EpisodeAdd (){
    const { Id } = useParams();
    console.log("toon Id episode add", Id)
    return(
        <>
            <EpisodeAddComponent ToonId={Id}/>
        </>
    )
}