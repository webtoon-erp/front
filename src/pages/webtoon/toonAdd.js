import styled from 'styled-components';
import ToonAddComponent from '../../component/forWebtoon/forToonAdd/ToonAddComponent';
import { useParams } from 'react-router-dom';

export default function ToonAdd (){
    const { Id } = useParams();
    return(
        <>
            <ToonAddComponent Id={Id}/>
        </>
    )
}

