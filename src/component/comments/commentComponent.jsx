import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';
import axios from 'axios';

const CommentComponent = ({ webtoonDtId }) => {
  const [userId, setUserId] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    setUserId(sessionStorage.getItem("employeeId"));
  }, []);

  const addComment = (newComment) => {

    const data = {
      msgType: 'webtoon',
      content: newComment,
      refId: webtoonDtId,
      programId: 'WT',
      sendEmpId: userId,
    };
    console.log("data", data);

    axios
      .post('http://146.56.98.153:8080/webtoonDt/feedBack', data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((response) => {
        console.log('API Response:', response.data);
      })
      .catch((error) => {
        console.error('API Error:', error.message);
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
        <span>
          <Input
            type='text'
            placeholder='댓글을 입력해주세요.'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </span>
        <Btn onClick={() => addComment(value)}>
          등록
        </Btn>
      </Form>
    </CommentContainer>
  );
};

export default CommentComponent;

const Form = styled.form`
  width:  600px;
`;

const Input = styled.input`
  width: 500px;
  height: 40px;
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
    margin: 0px 15px 0px 20px;
    float: right;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-left: 15%;
`;

const Container2 = styled.div`
    padding-left: 17%;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-left: 15%;
`;
