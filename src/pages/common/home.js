import styled from 'styled-components';
import CalendarArea from '../../component/forHome/CalendarArea.jsx';
import NoticeArea from '../../component/forHome/NoticeArea.jsx';
import { useLocation } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
`;

const CalendarContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  width: 70%;
`;

const NoticeContainer = styled.div`
  width: 30%;
`;

export default function Home (){
  
    return(
        <>
            <MainContainer>
              <CalendarContainer>
                  <CalendarArea />
              </CalendarContainer>
              <NoticeContainer>
                <NoticeArea />
              </NoticeContainer>
            </MainContainer>
        </>
    )
}