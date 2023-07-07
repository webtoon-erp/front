import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContentContainer = styled.div`
  text-align: center;
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

const PasswordReset = () => {
  const handlePasswordReset = () => {
    // Handle password reset logic here
  };

  return (
    <CenteredContainer>
      <ContentContainer>
        <Title>비밀번호 초기화</Title>
        <Description>
          비밀번호를 초기화하기 위해 아래 버튼을 클릭하세요.
        </Description>
        <ResetButton type="primary" onClick={handlePasswordReset}>
          비밀번호 초기화 요청
        </ResetButton>
      </ContentContainer>
    </CenteredContainer>
  );
};

export default PasswordReset;
