import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

const CommentList = ({ list }) => {
  // Define the number of comments to show per page and manage the current page
  const commentsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;

  // Reverse the list and slice it for the current page
  const displayedComments = list.slice().reverse().slice(startIndex, endIndex);

  return (
    <div>
      <UnorderedList>
        {displayedComments.map((comment, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
            <List>{comment.sendUserName}</List>
            <List>{comment.content}</List>
            <List>{comment.sendUserEmployeeId}</List>
          </div>
        ))}
      </UnorderedList>
      {list.length > commentsPerPage && (
        <Pagination>
          {Array.from({ length: Math.ceil(list.length / commentsPerPage) }).map((_, page) => (
            <PageButton key={page} onClick={() => setCurrentPage(page + 1)} active={currentPage === page + 1}>
              {page + 1}
            </PageButton>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default CommentList;

const UnorderedList = styled.ul``;

const List = styled.li`
  color: black;
  &:hover {
    color: green;
  }
  list-style-type: none;
  list-style: none;
  padding: 20px;
  width: 100px;
`;

const ContentList = styled.li`
  color: black;
  &:hover {
    color: green;
  }
  list-style-type: none;
  list-style: none;
  padding: 20px;
  width: 400px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  border: none;
  background: ${(props) => (props.active ? 'green' : 'gray')};
  color: white;
  cursor: pointer;
`;
