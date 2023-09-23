import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import axios from 'axios';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';

export default function DepartmentExtension() {
  const chartRef = useRef(null);

  const parseTimeToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours  + minutes/60 + seconds / 3600;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://146.56.98.153:8080/attendance/total');
        if (response.status === 200) {
          const depOvertimeSumDto = response.data.departmentOvertimeSumDto;

          //console.log("depOvertimeSumDto", depOvertimeSumDto);
          //console.log("departmentOvertimeData", departmentOvertimeData);

          const ctx = chartRef.current.getContext('2d');

          if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }

          const chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: Object.keys(depOvertimeSumDto),
              datasets: [{
                label: '부서별 연장근무시간(월계)',
                data: Object.values(depOvertimeSumDto).map(value => parseTimeToMinutes(value)),
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
                    callback: (value) => value ,
                  }
                }
              }
            }
          });

          chartRef.current.chart = chart;
        } else {
          console.error('그룹별 연장근무 Error: Invalid response status');
        }
      } catch (error) {
        console.error('그룹별 연장근무 Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, []);

  return (
    <>
      <DepartmentVacationContainer>
        <Title>그룹별 연장근무시간(월계)</Title>
        <HorizonLine />
        <DepartmentVacationGrid className="ag-theme-alpine" style={{ height: '300px', width: '400px' }}>
          <canvas ref={chartRef} width="400" height="200"></canvas>
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
`;
