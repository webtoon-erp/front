import React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const BoldText = styled.span`
  font-weight: bold;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  padding: 10px;
  padding-left: 120px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 35%;
  margin-top: 8%;
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


const PasswordResetButton = styled(Button)`
  margin-top: 8px;
`;

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
      <LoginContainer>
        <BoldText>웹툰 erp</BoldText>
        <LoginForm onSubmit={handleLogin}>
          <InputWrapper>
            <Input type="text" placeholder="사번" />
          </InputWrapper>
          <InputWrapper>
            <Input type="password" placeholder="비밀번호" />
          </InputWrapper>
          <LoginButton type="primary" htmlType="submit">
            로그인
          </LoginButton>
          <Link to="/passwordReset">
            <PasswordResetButton type="link">
              비밀번호 초기화
            </PasswordResetButton>
          </Link>
        </LoginForm>
      </LoginContainer>
  );
};

export default Login;

