import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';

export default function DepartmentAvgExtension() {
  const chartRef = useRef(null);

  useEffect(() => {
    const departments = ['인사부', '회계부', '영업부', '기술부'];
    const data = [100, 200, 300, 400];
  
    if (chartRef.current) {
      // Destroy any existing chart associated with the canvas
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
  
      const ctx = chartRef.current.getContext('2d');
      chartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: departments,
          datasets: [{
            label: '부서별 데이터',
            data: data.map(value => value / 100), // 데이터를 100으로 나누어 표시
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            datalabels: {
              anchor: 'end',
              align: 'top',
              font: {
                weight: 'bold'
              },
              formatter: (value) => (value * 100).toFixed(0), // 표시할 값을 다시 100 곱하여 원래대로 복원
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 0.5, // 눈금 간격을 0.5로 설정
                callback: (value) => value * 100, // y축 눈금에 표시할 값을 다시 100 곱하여 원래대로 복원
              }
            }
          }
        }
      });
    }
  }, []);

  return (
    <>
      <DepartmentVacationContainer>
        <Title>그룹별 연장근무시간(월계평균)</Title>
        <HorizonLine />
        <DepartmentVacationGrid className="ag-theme-alpine" style={{ height: '300px', width: '300px' }}>
          <canvas ref={chartRef} width="300" height="200"></canvas>
        </DepartmentVacationGrid>
      </DepartmentVacationContainer>
    </>
  );
}

const DepartmentVacationContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 300px;
  width: 100%
  align-items: center;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const DepartmentVacationGrid = styled.div`
    width: 1200px;
    height: 50px;
    padding-top: 45px;
`