import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import styled from 'styled-components'
import HorizonLine from '../../horizonLine';

const ToonGrid = ({Id}) => {
    const [rowData, setRowData] = useState([]);

    const columnDefs = [
        { headerName: '회차 번호', field: 'episodeNum', width: 150},
        { headerName: '회차 제목', field: 'subTitle', width: 450}, 
        { headerName: '업로드 일자', field: 'uploadDate', width: 300},    
        { headerName: '담당자', field: 'manager', width: 150},    
    ];

    const gridOptions = {
        columnDefs: columnDefs,
        rowSelection: 'single',
        animateRows: true,
        pagination: true,
        paginationPageSize: 10,
    };

    const navigate = useNavigate();
    
    const handleRowClick = (event) => {
      if (event.data) {
        navigate(`/episodeDetail/${event.data.webtoonDtId}`);
      }
    };
    

  useEffect(() => {
      const data = {
        webtoonId: Id,
      };
      axios
        .get('http://146.56.98.153:8080/webtoon/'+Id, {
          data: data, 
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setRowData(response.data.info.episode);
          }
        })
        .catch((error) => {
          message.error('데이터를 불러오는데 실패했습니다.');
        });
  }, [Id]);

    return (
        <ToonGridContainer>
            <Title>회차정보</Title>
            <HorizonLine />
            <Toon className="ag-theme-alpine">
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    gridOptions={gridOptions}
                    rowSelection='single'
                    pagination={true}
                    paginationPageSize={20}
                    onCellClicked={handleRowClick}
                />
            </Toon>
        </ToonGridContainer>
        
    )
};

export default ToonGrid;

const ToonGridContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 1020px;
    height: 500px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const Toon = styled.div`
    width: 1020px;
    height: 400px;
`