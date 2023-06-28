import React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';

const BoldText = styled.span`
  font-weight: bold;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  padding: 10px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 24px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const LoginButton = styled(Button)`
  margin-top: 16px;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginScreen = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <CenteredContainer>
      <LoginContainer>
        <BoldText>웹툰 erp</BoldText>
        <LoginForm onSubmit={handleLogin}>
          <InputWrapper>
            <Input type="text" placeholder="아이디" />
          </InputWrapper>
          <InputWrapper>
            <Input type="password" placeholder="비밀번호" />
          </InputWrapper>
          <LoginButton type="primary" htmlType="submit">
            로그인
          </LoginButton>
        </LoginForm>
      </LoginContainer>
    </CenteredContainer>
  );
};

export default LoginScreen;


