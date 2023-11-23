import React from 'react';
import styled from 'styled-components';
import { Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const PasswordReset = () => {
  const email = '';

  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();

    axios.post('http://146.56.98.153:8080/users/tempPassword',
      {
        Authourization: email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        if (result.status === 200) {
          message.success('비밀번호 초기화 성공');
          navigate('/login');
        } else {

          message.error('비밀번호 초기화 실패');
        }
      })
      .catch((error) => {
        message.error('비밀번호 초기화 에러');
      });
  };

  return (
    
      <ContentContainer>
        <Title>비밀번호 초기화</Title>
        <Description>
          비밀번호를 초기화하기 위해 사번을 입력한 후 아래 버튼을 클릭하세요.
        </Description>
        <Input placeholder='사번'/>
        <br/>
        <ResetButton type="primary" onClick={handlePasswordReset}>
          비밀번호 초기화 요청
        </ResetButton>
      </ContentContainer>
    
  );
};

export default PasswordReset;

const ContentContainer = styled.div`
  text-align: center;
  margin-top: 15%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
`;

const ResetButton = styled(Button)`
  margin-top: 16px;
`;

const Input = styled.input`
  height: 30px;
  border: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;