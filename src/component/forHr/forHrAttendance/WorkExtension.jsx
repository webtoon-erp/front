import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';
import axios from 'axios';

export default function WorkExtension() {
  const chartRef = useRef(null);
  const [overtimeData, setOvertimeData] = useState([]);

  useEffect(() => {
    const chartCanvas = chartRef.current;
    const currentMonth = new Date().getMonth() + 1;
    const months = [];
    for (let i = 0; i < 4; i++) {
      const monthIndex = (currentMonth - i + 12) % 12;
      months.push(monthIndex + 1);
    }
  
    axios
      .get('http://146.56.98.153:8080/attendance/total')
      .then((response) => {
        if (response.status === 200) {
          const monthlyOvertimeSummaryDto = response.data.monthlyOvertimeSummaryDto;
  
          const overtimeHoursArray = months.map((monthIndex) => ({
            id: monthIndex,
            value: parseTimeToMinutes(monthlyOvertimeSummaryDto[getMonthName(monthIndex)]),
          }));
  
          setOvertimeData(overtimeHoursArray);
  
          if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }
  
          const chart = new Chart(chartCanvas, {
            type: 'line',
            data: {
              labels: months.map((monthIndex) => getMonthName(monthIndex).substr(0, 3)),
              datasets: [
                {
                  label: '연장근무시간',
                  data: overtimeHoursArray.map((item) => item.value),
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                datalabels: {
                  formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}: ${minutesToHoursAndMinutes(value)}`;
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 500,
                  },
                },
              },
            },
          });
  
          chartCanvas.chart = chart;
  
          return () => {
            if (chartCanvas.chart) {
              chartCanvas.chart.destroy();
            }
          };
        }
      })
      .catch((error) => {
        console.error('WorkExtension Error fetching data:', error);
      });
  }, []);

  const parseTimeToMinutes = (timeString) => {
    if (typeof timeString === 'string') {
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + seconds / 60;
      return totalMinutes;
    } else {
      return 0;
    }
  };
  

  const minutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}시간 ${remainingMinutes}분`;
  };

  const getMonthName = (monthIndex) => {
    const monthNames = [
      'janOvertime', 'febOvertime', 'marOvertime', 'aprOvertime',
      'mayOvertime', 'junOvertime', 'julOvertime', 'augOvertime',
      'sepOvertime', 'octOvertime', 'novOvertime', 'decOvertime'
    ];
    return monthNames[monthIndex - 1];
  };

  return (
    <>
      <WorkExtensionContainer>
        <Title>월별 연장근무 시간 추이</Title>
        <HorizonLine />
        <WorkExtensionGrid
          className="ag-theme-alpine"
          style={{ height: '800px', width: '350px' }}
        >
          <canvas ref={chartRef} width="800px" height="500px" />
        </WorkExtensionGrid>
      </WorkExtensionContainer>
    </>
  );
}

const WorkExtensionContainer = styled.div`
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

const WorkExtensionGrid = styled.div`
  width: 900px;
  height: 110px;
`;
