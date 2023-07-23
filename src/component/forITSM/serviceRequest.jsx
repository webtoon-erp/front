import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ServiceRequest = () => {
  //달력(요청, 납기일)

  const [startDate, setStartDate] = useState(new Date());
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);

  const [selectedRequestType, setSelectedRequestType] = useState('');
  
  const SelectRequestTypehandler = (e) => {
    setSelectedRequestType(e.target.value);
  };


  return (
    <>
      <Title>서비스 요청</Title>
      <RegistBtnContainer>
                    <RegistBtn>요청</RegistBtn>
      </RegistBtnContainer>
      <MainContainer>
        <RangeContainer1>
        <Container>
            <InputTitle>요청일</InputTitle>
            <Div />
            <DatePicker
              selected={startDate}
              dateFormat="yyyy-MM-dd"
              disabled
            />
          </Container>
          <Container>
              <InputTitle>처리자</InputTitle><Div/><Input type="text" placeholder="처리자" required/>
          </Container>
          <Container>
              <InputTitle>제목</InputTitle><Div4/><Input type="text" placeholder="제목" />
          </Container>
          <Container>
              <InputTitle>요청 사항</InputTitle><Div2/><TextArea placeholder="요청 사항" />
          </Container>
        </RangeContainer1>
        <RangeContainer2>
        <Container>
            <InputTitle>납기일</InputTitle>
            <Div />
            <DatePicker
                selected={selectedDeliveryDate}
                onChange={(date) => setSelectedDeliveryDate(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                placeholderText="납기일"
                />
        </Container>
        <Container>
              <InputTitle>요청 타입</InputTitle><Div2/>
              <Select value={selectedRequestType} onChange={SelectRequestTypehandler}>
                          <Option value="구매">구매 </Option>
                          <Option value="업무 지원">업무 지원</Option>
              </Select>
          </Container>
         <Container>
              <InputTitle>승인자</InputTitle><Div/><Input type="text" placeholder="승인자" />
          </Container>


        </RangeContainer2>
      </MainContainer>
    </>
  );
};

export default ServiceRequest;

const MainContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  margin: 30px 50px;
  height: 350px;
  padding-top: 50px;
`;

const Input = styled.input`
  height: 30px;
  border: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const TextArea = styled.textarea`
  height: 70px;
  width: 520px;
  border: transparent;
  background: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
  resize: none;
`;

const InputTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 15px;
  padding-top: 7px;
`;

const RangeContainer1 = styled.div`
  width: 60%;
  height: 100%;
`;

const RangeContainer2 = styled.div`
  width: 40%;
  height: 100%;
`;

const Div = styled.div`
  padding: 16px;
`;

const Div2 = styled.div`
  padding: 7px;
`;

const Div3 = styled.div`
  padding: 3px;
`;

const Div4 = styled.div`
  padding: 24px;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 120px;
  padding-left: 4%;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 18px;
  margin: 20px;
`;

const Select = styled.select`
  width: inherit;
  height: 30px;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  padding: 0 10px;
  padding-top: 2px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const Option = styled.option`
  background: #ffffff;
  font-size: 15px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 86%;
`;

const RegistBtn = styled.button`
    width: 100px;
    height: 40px;
    background-color: ${theme.colors.btn};
    border: none;
    color: ${theme.colors.white};
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #00B757;
    }
    cursor: pointer;
    margin: 0px 15px 0px 15px;
`