import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import HorizonLine from '../../horizonLine';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import axios from 'axios';
import { message } from 'antd';
import theme from './../../../style/theme';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import FileDownloader from '../../fileDownloader';
import CommentComponent from '../../comments/itCommentComponent';


const ServiceDetailComponent = ({ Id }) => {
  const [token, setToken] = useState(sessionStorage.getItem("accessToken"));

  const [noticeData, setNoticeData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [selectedReq, setSelectedReq] = useState(null);
  const [selectedAis, setSelectedAis] = useState(null);
  const [selectedCellData, setSelectedCellData] = useState(null);
  const [selectedReadCount, setSelectedReadCount] = useState('');

  //아래는 파일 첨부 필요하면 넣기
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  //리스트
  const [rowData, setRowData] = useState([]);


  const [data, setData] = useState({});
  const [selectedDay, setSelectedDay] = useState('전체');
  const [filterText, setFilterText] = useState(''); // New state for filter text

  const columnDefs = [
    { headerName: '품목', field: 'content', width: 400 },
    { headerName: '수량', field: 'count', width: 300 },
    { headerName: '가격', field: 'cost', width: 300 },
  ];

  useEffect(() => {

    const data = {
      requestId: Id,
    };

    axios
      .get(`http://146.56.98.153:8080/request/${Id}`, {
        data: data,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const ITSMInfo = response.data;
          console.log("itsm detail response.data", response.data)
          setNoticeData(ITSMInfo);
          setSelectedTag(ITSMInfo.reqType);
          setSelectedAuthor(ITSMInfo.name);
          setSelectedTitle(ITSMInfo.title);
          setSelectedDate(ITSMInfo.noticeDate);
          setSelectedContent(ITSMInfo.content);
          setSelectedReadCount(ITSMInfo.step);
          setSelectedFromDate(ITSMInfo.dueDate);
          setSelectedToDate(ITSMInfo.doneDate);
          setSelectedReq(ITSMInfo.reqUserId);
          setSelectedAis(ITSMInfo.itUserId);
          setRowData(ITSMInfo.requestDtList);
          setSelectedFiles(`http://146.56.98.153:8080/home/opc/file_repo/${ITSMInfo.files[0].filePath}`);
          console.log("파일이름: " + ITSMInfo.files[0].filePath);
        }
      })
      .catch((error) => {
        console.error('데이터를 불러오는데 실패했습니다.', error);
      });
  }, []);

  const deleteNoticeHandler = () => {
    if (Id) {
      const headers = {
        'Authorization': 'Bearer' + token, // Authourization?
      };

      const requestIds = [
        { requestId: Id }
      ];

      axios
        .delete(`http://146.56.98.153:8080/request`,
          {
            data: requestIds
          }
          ,
          {
            headers: headers,
          })
        .then((response) => {
          message.success('ITSM 서비스 요청 삭제 성공');
          setSelectedCellData(null);
          setTimeout(() => {
            navigate('/itRequestListView');
          }, 1000);
        })
        .catch((error) => {
          message.error('ITSM 서비스 요청 삭제 실패', error);
        });
    }
  };

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  }

  const handleNoticeClick = () => {
    navigate('/itRequestListView');
  }

  return (
    <NoticeDetailContainer>
      <FlexBox>
        <Title>ITSM 상세 조회</Title>
        <BtnContainer>

          <Btn onClick={() => deleteNoticeHandler()}>삭 제</Btn>
        </BtnContainer>
      </FlexBox>
        <NoticeContainer>
          <ContentTitle>{selectedTitle}</ContentTitle>

          <ContainerBox>
            <ContainerBox>
              <Container>
                <SmallTitle>요청타입</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{selectedTag}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>

            <ContainerBox>
              <Container>
                <SmallTitle>단계</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{selectedReadCount}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>
          </ContainerBox>

          <ContainerBox>
            <ContainerBox>
              <Container>
                <SmallTitle>요청기한</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{selectedFromDate}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>

            <ContainerBox>
              <Container>
                <SmallTitle>마감기한</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{selectedToDate}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>
            
          </ContainerBox>
          <ContainerBox>
            <ContainerBox>
              <Container>
                <SmallTitle>요청자</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{selectedReq}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>

            <ContainerBox>
              <Container>
                <SmallTitle>담당자</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{selectedAis}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>
            
          </ContainerBox>
          <HorizonLine />
          
          <ContentContainer>{selectedContent}</ContentContainer>


          <div className="ag-theme-alpine" style={{ height: '250px', width: '1100px' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        rowSelection='single'
                        pagination={true}
                        paginationPageSize={5}
                    />
              </div>
              <ImageTap />
              <SmallTitle>첨부파일</SmallTitle>
            <FileImg src={selectedFiles} />
          
          <CommentContainer>
                  <CommentComponent Id={Id}/>
              </CommentContainer>
        </NoticeContainer>
              
    </NoticeDetailContainer>
  );
};

export default ServiceDetailComponent;

const NoticeDetailContainer = styled.div`
  padding-left: 4%;
`;

const CommentContainer = styled.div`
    display: flex;
    padding: 20px;
    width: 1000px;
    padding-left: 10%;
    padding-top: 100px;
`;

const NoticeContainer = styled.div`
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 550px;
  width: 100%;
  align-items: center;
`;

const Container = styled.div`
  border: 1px dashed #ccc;
  width: 50px;
  height: 25px;
  padding: 20px;
`;


const FileChangeContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
`;

const FileTitle = styled.div`
    font-size: 15px;
    font-weight: bold;
    padding-top: 5px;
    padding-right: 15px;
`;

const Input = styled.input`
    height: 30px;
    border: transparent;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const ImageTap = styled.div`
  margin-top:100px;
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  width: 300px;
  font-size: 30px;
  font-weight: bold;
`;

const ContentTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 20px;
`;

const SmallTitle = styled.div`
    font-size: 15px;
    font-weight: bold;
`;

const SmallContent = styled.div`
    font-size: 15px;
`;

const SmallContentContainer = styled.div`
  border: 1px dashed #ccc;
  width: 450px;
  height: 25px;
  padding: 20px;
`;

const ContentContainer = styled.div`
  width: 90%;
  height: 200px;
  padding: 50px;;
`;

const BtnContainer = styled.div`
    display: flex;
    margin-left: 650px;
    align-items: center;
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
    margin: 0px 15px 0px 15px;
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const InputField = styled.input`
    background-color: ${theme.colors.textBox};
    height: 25px;
    width: 600px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
`;

const FileImg = styled.img`
  width: 200px;
  height: 200px;
  margin-left: 20px;
`;