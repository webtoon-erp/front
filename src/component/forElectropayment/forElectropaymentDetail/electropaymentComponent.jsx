import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { useNavigate } from 'react-router-dom'
import HorizonLine from '../../horizonLine';
import { message } from 'antd';
import FileDownloader from '../../fileDownloader';
import axios from 'axios';
import ApprovalList from './approvalList';
import ReferList from './referList';
import ItemList from './itemList';

const ElectropaymentComponent = ({Id}) => {
  const [epData, setEpData] = useState([]);
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    setEmployeeId(sessionStorage.getItem("employeeId"));
  }, []);

  const navigate = useNavigate();
  
  const dummyData = {
    title: "가짜 제목",
    templateName: "가짜 템플릿명",
    writeUserName: "가짜 작성자 이름",
    writeUserEmployeeId: "9999",
    documentDataResponses: {
      fromDate: "2023-11-01",
      toDate: "2023-11-30"
    },
    content: "가짜 내용",
    uploadFiles: "가짜파일.pdf"
  };
      
  useEffect(() => {

    axios
      .get(`http://146.56.98.153:8080/plas/documents/${Id}`, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const epInfo = response.data;
          console.log("response.data", response.data);
          epInfo ? setEpData(epInfo) : setEpData(dummyData);
        } 
      })
      .catch((error) => {
        setEpData(dummyData);
        console.error('11: 데이터를 불러오는데 실패했습니다.', error);
      });
  }, []);

  const deleteNoticeHandler = () => {
    if (Id) {
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
      };
  
      axios
        .delete(`http://146.56.98.153:8080/plas/documents/${Id}`, 
        {
          documentId: Id
        }
        ,
        {
          headers: headers,
        })
        .then((response) => {
          message.success('삭제 성공');
          //setSelectedCellData(null);
          setTimeout(() => {
            navigate('/epMyDocsView');
        }, 3000);
        })
        .catch((error) => {
          message.error('삭제 실패', error);
        });
    }
  };

  const reportHandler = () => {
    if (Id) {
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
      };
  
      axios
        .patch(`http://146.56.98.153:8080/plas/documents/${Id}`, 
        {
          headers: headers,
        })
        .then((response) => {
          message.success('상신 성공');
          //setSelectedCellData(null);
          setTimeout(() => {
            navigate('/epMyDocsView');
        }, 3000);
        })
        .catch((error) => {
          message.error('상신 실패', error);
        });
    }
  };

  const assignHandler = () => {
    if (Id) {
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
      };
  
      axios
        .patch(`http://146.56.98.153:8080/plas/documents/${Id}/${employeeId}`, 
        {
          headers: headers,
        })
        .then((response) => {
          message.success('승인 성공');
          //setSelectedCellData(null);
          setTimeout(() => {
            navigate('/epHoldenDocsView');
        }, 3000);
        })
        .catch((error) => {
          message.error('승인 실패', error);
        });
    }
  };

  return (
    <NoticeDetailContainer>
    <FlexBox>
      <Title>전자결제 상세조회</Title>
    </FlexBox>
    <BtnContainer>
        <Btn onClick={() => deleteNoticeHandler()}>삭 제 </Btn>  
        <Btn onClick={() => reportHandler()}>상 신</Btn>
        <Btn onClick={() => assignHandler()}>승 인</Btn>
      </BtnContainer>
      <NoticeContainer>
            <ContentTitle>{epData.title}</ContentTitle>
            
            <ContainerBox>
              <ContainerBox>
                <Container>
                  <SmallTitle>타입</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{epData.templateName}</SmallContent>
                </SmallContentContainer>
              </ContainerBox>

              <ContainerBox>
                <Container>
                  <SmallTitle>작성자(사번)</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{epData.writeUserName}({epData.writeUserEmployeeId})</SmallContent>
                </SmallContentContainer>
              </ContainerBox>
            </ContainerBox>

            <ContainerBox>
              <ContainerBox>
                <Container>
                  <SmallTitle>결제자</SmallTitle>
                </Container>
                <SmallAggridContainer>
                  <ApprovalList Id={Id}/>
                </SmallAggridContainer>
              </ContainerBox>

           
              <ContainerBox>
                <Container>
                  <SmallTitle>참조자</SmallTitle>
                </Container>
                <SmallAggridContainer>
                  <ReferList Id={Id}/>
                </SmallAggridContainer>
              </ContainerBox>
            </ContainerBox>
{/*
            <ContainerBox>
                <Container>
                  <SmallTitle>요청 품목</SmallTitle>
                </Container>
                <BigAggridContainer>
                  <ItemList />
                </BigAggridContainer>
              </ContainerBox>

  */}

<ContainerBox>
            
              <ContainerBox>
                <Container>
                  <SmallTitle>시작일</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{epData.documentDataResponses?.[0]?.fromDate}</SmallContent>
                </SmallContentContainer>
              </ContainerBox>

              <ContainerBox>
                <Container>
                  <SmallTitle>종료일</SmallTitle>
                </Container>
                <SmallContentContainer>
                  <SmallContent>{epData.documentDataResponses?.[0]?.toDate}</SmallContent>
                </SmallContentContainer>
              </ContainerBox>
            </ContainerBox>

          <HorizonLine />
          <ContentContainer>{epData.content}</ContentContainer>

          <FileContainer>
            <FileDownloader files={[{ name: epData.uploadFiles?.[0]?.originName, filename: epData.uploadFiles?.[0]?.originName }]}/>
          </FileContainer>
          </NoticeContainer>
      </NoticeDetailContainer>
    );
};

export default ElectropaymentComponent;

const NoticeDetailContainer = styled.div`
  padding-top: 20px;
  padding-left: 4%;
`;

const NoticeContainer = styled.div`
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const BreadContainer = styled.div`
  margin-left: 70%;
`;

const Container = styled.div`
  border: 1px dashed #ccc;
  width: 50px;
  height: 25px;
  padding: 20px;
`;

const FileContainer = styled.div`
  border: 1px dashed #ccc;
  width: 100%;
  height: 10px;
  margin: 30px;
  margin-top: 0px;
  border-radius: 8px;
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
`;

  const Title = styled.div`
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

const SmallContent= styled.div`
    font-size: 15px;
`;

const SmallContentContainer = styled.div`
  border: 1px dashed #ccc;
  width: 443px;
  height: 25px;
  padding: 20px;
`;

const SmallAggridContainer = styled.div`
  border: 1px dashed #ccc;
  width: 443px;
  height: 250px;
  padding: 20px;
`;

const BigAggridContainer = styled.div`
  border: 1px dashed #ccc;
  width: 1040px;
  height: 250px;
  padding: 20px;
`;

const TitleAggridContainer = styled.div`
  border: 1px dashed #ccc;
  width: 50px;
  height: 300px;
  padding: 20px;
`;

const ContentContainer = styled.div`
  width: 90%;
  height: 200px;
  padding: 50px;;
`;

const BtnContainer = styled.div`
    display: flex;
    margin-left: 820px;
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
    width: 60px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
`;
