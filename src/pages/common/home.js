import styled from 'styled-components';
import CalendarArea from '../../component/forHome/CalendarArea';
import NoticeArea from '../../component/forHome/NoticeArea';

const MainContainer = styled.div`
  display: flex;
`;

const CalendarContainer = styled.div`
  margin-top: 80px;
  margin-left: 20px;
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