import ForEpisodeDetail from "../../component/forWebtoon/forEpisodeDetail/forEpisodeDetail.jsx";
import { useParams } from 'react-router-dom';


export default function EpisodeDetail (){
    const { Id } = useParams();

    return(
        <>
            <ForEpisodeDetail Id={Id}/>
        </>
    )
}