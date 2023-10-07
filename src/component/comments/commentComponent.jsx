import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommentForm from './commentForm';
import CommentList from './commentList';
import { message } from 'antd';
import axios from 'axios';

const CommentComponent = ({ webtoonDtId }) => {
  const [list, setList] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId(sessionStorage.getItem("employeeId"));
  }, []);

  const addList = (newComment) => {
    setList([...list, newComment]);

    const data = {
      msgType: 'feedback',
      content: newComment.content,
      refId: webtoonDtId,
      programId: 'WT',
      sendEmpId: userId,
    };
    console.log("data", data)

    axios
      .post('http://146.56.98.153:8080/webtoonDt/feedBack', data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((response) => {
        message.success('API Response: ' + JSON.stringify(response.data));
      })
      .catch((error) => {
        message.error('API Error: ' + error.message);
      });
  };

  return (
    <CommentContainer>
      <Container>
        <CommentForm addList={addList} />
      </Container>
      
      <Container2>
        <CommentList list={list} />
      </Container2>
    </CommentContainer>
      
  );
};

export default CommentComponent;

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
