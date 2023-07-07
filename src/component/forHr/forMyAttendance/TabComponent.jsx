import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: lightgray;
  }
`;

const LeftArrowIcon = styled(AiOutlineArrowLeft)`
`;

const RightArrowIcon = styled(AiOutlineArrowRight)`
`;

const TabComponent = () => {
  const [mydate, setDate] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth());
    const yearMonth = date.toISOString().slice(0, 7).replace(/-/g, '');
    setDate(yearMonth);
  }, []);

  const getPreviousMonthsData = () => {
    const date = new Date();
    setCount(count - 1);
    date.setMonth(date.getMonth() + count);
    const yearMonth = date.toISOString().slice(0, 7).replace(/-/g, '');
    setDate(yearMonth);
  };

  const getNextMonthsData = () => {
    const date = new Date();
    setCount(count + 1);
    date.setMonth(date.getMonth() + count);
    const yearMonth = date.toISOString().slice(0, 7).replace(/-/g, '');
    setDate(yearMonth);
  };

  return (
    <>
      <Button onClick={getPreviousMonthsData}>
        <LeftArrowIcon />
      </Button>
      <h3>{mydate}</h3>
      <Button onClick={getNextMonthsData}>
        <RightArrowIcon />
      </Button>
    </>
  );
};

export default TabComponent;

