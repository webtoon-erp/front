import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';
import axios from 'axios';
import { message } from 'antd';
import CommentList from './commentList';

const CommentComponent = ({ Id }) => {
  const [userId, setUserId] = useState('');
  const [list, setList] = useState(['피드백내용', '발신자','사번']);
  const [value, setValue] = useState('');
  const [toonId, setToonId] = useState('');
  const [trigger, setTrigger] = useState(0);
  const [token, setToken] = useState(sessionStorage.getItem("accessToken"));


  useEffect(() => {
    axios
      .get(`http://146.56.98.153:8080/comment?requestId=${Id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setList(response.data);
        }
      })
      .catch((error) => {
        message.error('데이터를 불러오는데 실패했습니다.', error);
      });
  }, [Id, trigger]);
  

  useEffect(() => {
    setToonId(localStorage.getItem('Id'));
    setUserId(sessionStorage.getItem("employeeId"));
  }, []);

  const addComment = (newComment) => {
    const data = {
      content: newComment,
      refId: Id,
      sendEmpId: userId,
    };
  
    axios
      .post(`http://146.56.98.153:8080/comment?requestId=${Id}`, data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          message.success('피드백 등록 완료.');
          setTrigger(trigger + 1);
        } else {
          message.error('ITSM 피드백이 정상적으로 등록되지 않았습니다.');
        }
      })
      .catch((error) => {
        message.error('API 에러가 발생했습니다: ' + error.message); // Displaying error message to the user
      });
  };
  

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <CommentContainer>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Input
          type='text'
          placeholder='댓글을 입력해주세요.'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Btn onClick={() => addComment(value)}>
          등록
        </Btn>
      </Form>
      <CommentList list={list}/>
    </CommentContainer>
  );
};

export default CommentComponent;

const Form = styled.form`
  width: 600px;
  display: flex; /* Add this to make the Input and Btn side by side */
  align-items: center; /* Optional, align vertically in the middle */
`;

const Input = styled.input`
  width: 500px;
  height: 40px;
  flex: 1; /* Allow the input to take available space */
`;

const Btn = styled.button`
  width: 90px;
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
  margin-left: 20px;
  flex: none; /* Don't allow it to grow */
  float: right;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-left: 15%;
`;
