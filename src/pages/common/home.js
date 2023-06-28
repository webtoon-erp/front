import styled from 'styled-components';
import CalendarArea from '../../component/forHome/CalendarArea';
import NoticeArea from '../../component/forHome/NoticeArea';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CalendarContainer = styled.div`
  width: 50%;
`;

const NoticeContainer = styled.div`
  width: 50%;
`;

export default function Home (){
    return(
        <>
            <MainContainer>
              <CalendarContainer>
                  <CalendarArea />
              </CalendarContainer>
            </MainContainer>
            
        </>
    )
}