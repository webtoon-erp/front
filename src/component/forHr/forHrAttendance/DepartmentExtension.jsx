import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import axios from 'axios';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';

export default function DepartmentExtension() {
  const chartRef = useRef({ chart: null });

  useEffect(() => {
    axios.get('http://146.56.98.153:8080/attendance/total')
      .then(response => {
        const departmentOvertimeAvgDto = response.data.departmentOvertimeAvgDto;

        if (chartRef.current) {
          // Check if the chart exists and destroy it if it does
          if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }

          const ctx = chartRef.current.getContext('2d');
          chartRef.current.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: Object.keys(departmentOvertimeAvgDto),
              datasets: [{
                label: '부서별 연장근무시간(월계)',
                data: Object.values(departmentOvertimeAvgDto).map(value => parseTimeToMinutes(value)),
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
                  formatter: (value) => (value * 100).toFixed(0),
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 0.5,
                    callback: (value) => value,
                  }
                }
              }
            }
          });
        }
      })
      .catch(error => {
        console.error('Avg Error fetching data:', error);
      });
  }, []);

  const parseTimeToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours + minutes / 60 + seconds / 3600;
  };

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
  width: 100%;
  align-items: center;
`;

const Title = styled.h3`
  margin-left: 10px;
`;

const DepartmentVacationGrid = styled.div`
  width: 1200px;
  height: 50px;
  padding-top: 45px;
`;
