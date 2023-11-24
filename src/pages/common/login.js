import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://146.56.98.153:8080/users/login',
      {
        employeeId: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        if (result.status === 200) {
          message.success('로그인 성공');
          console.log("result.data", result.data);
          sessionStorage.setItem("accessToken", result.data.accessToken);
          sessionStorage.setItem("employeeId", result.data.employeeId); //직책
          sessionStorage.setItem("position", result.data.position); //사번
          sessionStorage.setItem("deptCode", result.data.deptCode);
          window.location.replace('/home');
        } else {
          message.error('로그인 실패');
        }
      })
      .catch((error) => {
        message.error('로그인 에러');
      });
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/passwordReset');
  }

  return (
    <LoginContainer>
      <BoldText>웹툰 erp</BoldText>
      <LoginForm onSubmit={handleLogin}>
        <InputWrapper>
          <Input type="text" placeholder="사번" onChange={(e) => setEmail(e.target.value)} />
        </InputWrapper>
        <InputWrapper>
          <Input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
        </InputWrapper>
        <LoginButton type="primary" htmlType="submit">
          로그인
        </LoginButton>
        <PasswordResetButton onClick={handleClick}>
            비밀번호 초기화
        </PasswordResetButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

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