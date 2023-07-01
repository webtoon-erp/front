import styled from 'styled-components';
import CalendarArea from '../../component/forHome/CalendarArea';
import NoticeArea from '../../component/forHome/NoticeArea';
import Header from '../../component/header';
import NavBar from '../../component/navBar';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CalendarContainer = styled.div`
  width: 60%;
`;

const NoticeContainer = styled.div`
  width: 40%;
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