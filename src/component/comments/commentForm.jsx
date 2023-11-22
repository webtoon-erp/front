import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';

const CommentForm = ({ addList }) => {
  const [value, setValue] = useState('');
  const [userId, setUserId] = useState('');
  const currentDate = new Date();

  useEffect(() => {
    setUserId(sessionStorage.getItem("employeeId"));
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1, 두 자리로 포맷
    const day = String(date.getDate()).padStart(2, '0'); // 일자, 두 자리로 포맷
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { userid: userId, content: value, date: formatDate(currentDate) };
    addList(newComment);
    setValue('');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  return (
    <List>
      <Form style={{ display: 'flex', flexDirection: 'row' }}>
        <span>
          <Input
            type='text'
            placeholder='댓글을 입력해주세요.'
            value={value}
            onChange={handleChange}
          />
        </span>
        <Button type="button" onClick={handleSubmit}>등록</Button>
      </Form>
    </List>
  );
};

export default CommentForm;

const List = styled.li`
  color: black;
  &:hover {
    color: green;
  }
  list-style-type: none;
  list-style: none;
`;

const Form = styled.form`
  width:  600px;
`;

const Input = styled.input`
  width: 500px;
  height: 40px;
`;

const Button = styled.button`
  width: 50px;
  height: 40px;
  background-color: ${theme.colors.btn};
  border: none;
  color: ${theme.colors.white};
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.10), 0 2px 2px rgba(0, 0, 0, 0.20);
  &:hover {
    background-color: #00B757;
  }
  cursor: pointer;
`;
