import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { message } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import HorizonLine from '../../horizonLine';
import theme from '../../../style/theme';

const ViewList = () => {
    const [rowData, setRowData] = useState([]);

    const columnDefs = [
        {headerName: '제목', field: 'title', sortable: true, filter: true, width: '150px'},
        {headerName: '요청자', field: 'reqUser', sortable: true, filter: true, width: '130px'},
        {headerName: '납기일', field: 'LocalDate', sortable: true, filter: true, width: '130px'},
        {headerName: '승인자', field: 'itUser', sortable: true, filter: true, width: '130px'},
        {
            headerName: '상태',
            field: 'step',
            sortable: true,
            filter: true,
            width: '80px',
            cellStyle: params=> {
                if(params.value === 5) {
                    return {color:'#F8F1F1', 'background-color':'#F2ACBF', 'font-weight': 'bold'}
                } else if(params.value === 4) {
                    return {color:'#F8F1F1', 'background-color':'#91CDF2', 'font-weight': 'bold'}
                } else if(params.value === 3) {
                    return {color:'#F8F1F1', 'background-color':'#91F29B', 'font-weight': 'bold'}
                } else if(params.value === 2) {
                    return {color:'rgb(248, 241, 241)', 'background-color':'#f4f75b', 'font-weight': 'bold'}
                } else if(params.value === 1) {
                    return {color:'rgb(248, 241, 241)', 'background-color':'#f5c25d', 'font-weight': 'bold'}
                }
            },
            cellRenderer: params => {
                if (params.value === 1) {
                    return '요청';
                } else if (params.value === 2) {
                    return '접수';
                } else if (params.value === 3) {
                    return '진행';
                }else if (params.value === 4) {
                    return '완료';
                } else if (params.value === 5) {
                    return '반려';
                }
            }
        },
    ];

    const navigate = useNavigate();

    const handleRowClick = (event) => {
        if (event.data.id) {
          navigate(`/itRequestDetail/${event.data.id}`);
        }
      };

    useEffect(() => {
        const userId = sessionStorage.getItem('employeeId');

        if(userId) {
            axios.get(`http://146.56.98.153:8080/request/list/${userId}`, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setRowData(response.data);
                    console.log("response.data",response.data);
                    console.log("요청 성공");
                } else {
                    message.error('데이터를 불러오는데 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('데이터를 불러오는데 실패했습니다.', error);
            });
        }
    }, []);

    const chartRef = useRef(null);

    useEffect(() => {

        const chartCanvas = chartRef.current;
        const chartData = [0, 0, 0];

        rowData.forEach((data) => {
            if (data.step === 1 || data.step === 2 || data.step === 5) {
                chartData[0]++; // 미완료
            } else if (data.step === 3) {
                chartData[1]++; // 진행
            } else if (data.step === 4) {
                chartData[2]++; // 완료
            }
        });
    
        const chart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['미완료', '완료', '진행'],
                datasets: [
                    {
                        label: '개수',
                        data: chartData,
                        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(145,242,155,0.7)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(145,242,155,1)'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                    },
                    datalabels: {
                        formatter: (value, context) => {
                            const dataset = context.chart.data.datasets[0];
                            const total = dataset.data.reduce((acc, cur) => acc + cur, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${value}개 (${percentage}%)`;
                        },
                    },
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                },
                tooltips: {
                    enabled: false,
                },
            },
        });
    
        return () => {
            chart.destroy();
        };
    }, []);
    
    return(
        <FlexBox>
            <ViewListContainer>
                <RequestListGrid className="ag-theme-alpine">
                    <AgGridReact 
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        rowSelection='single'
                        domLayout= 'autoHeight'
                        pagination= {true}
                        paginationPageSize= {5}
                        onCellClicked= {handleRowClick}
                    />
                </RequestListGrid>
            </ViewListContainer>

            <RequestStateContainer>
                <Title>요청 상태 현황</Title>
                <HorizonLine />
                <FlexBox>
                    <MoreOuterBox>
                        <OuterBox>
                            <Box>
                                <h3 style={{ 'margin-top': '0' }}>완료</h3>
                                <Count style={{ 'background-color': '#91CDF2' }}>
                                    {rowData.filter(data => data.step === 4).length}
                                </Count>
                            </Box>
                            <Box>
                                <h3 style={{ 'margin-top': '0' }}>미완료</h3>
                                <Count style={{ 'background-color': '#F2ACBF' }}>
                                    {rowData.filter(data => data.step === 1 || data.step === 2 || data.step === 5).length}
                                </Count>
                            </Box>
                        </OuterBox>
                        <Box>
                            <h3 style={{ 'margin-top': '0' }}>진행</h3>
                            <Count style={{ 'background-color': '#91F29B' }}>
                                {rowData.filter(data => data.step === 3).length}
                            </Count>
                        </Box>
                    </MoreOuterBox>
                    
                    <RequestStateGrid className="ag-theme-alpine" style={{ height: '200px', width: '200px' }}>
                        <canvas ref={chartRef} width="200px" height="200px" />
                    </RequestStateGrid>
                </FlexBox>
            </RequestStateContainer>
        </FlexBox>
    );
};
export default ViewList;

const ViewListContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-right: 50px;
`;

const RequestListGrid = styled.div`
    width: 620px;
    height: auto;
    overflow: hidden;
`;

const RequestStateContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 350px;
    width: 490px;
`;

const FlexBox = styled.div`
    display : flex;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const RequestStateGrid = styled.div`
    width: 400px;
    height: 110px;
    margin-top: 30px;
    margin-left: 10px;
`;

const MoreOuterBox = styled.div`
`;

const OuterBox = styled.div`
    display : flex;
    margin-bottom: 25px;
`;

const Box = styled.div`
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
`;

const Count = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    font-size: 35px;
    color: ${theme.colors.white};
    width: 100px;
    height: 70px;
    border-radius: 8px;
    margin: auto;
    box-shadow: 0 5px 10px rgba(0,0.10,0,0.10), 0 2px 2px rgba(0,0.10,0,0.10);
`;